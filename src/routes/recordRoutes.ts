import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { RecordService } from '../services/recordService';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole, TransactionType, AuthRequest } from '../types';

const router = Router();
const recordService = new RecordService();

// Get all records with filters (All authenticated users)
router.get('/',
  authenticate,
  query('type').optional().isIn(['income', 'expense']),
  query('category').optional().trim(),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const filters = {
        type: req.query.type as TransactionType,
        category: req.query.category as string,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string
      };

      const records = recordService.getRecords(filters);
      res.json(records);
    } catch (error) {
      next(error);
    }
  }
);

// Get single record (All authenticated users)
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const record = recordService.getRecordById(parseInt(req.params.id));
    res.json(record);
  } catch (error) {
    next(error);
  }
});

// Create record (Admin only)
router.post('/',
  authenticate,
  authorize(UserRole.ADMIN),
  body('amount').isFloat({ min: 0.01 }),
  body('type').isIn(['income', 'expense']),
  body('category').trim().notEmpty(),
  body('date').isISO8601(),
  body('description').optional().trim(),
  async (req: AuthRequest, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { amount, type, category, date, description } = req.body;
      const record = recordService.createRecord(
        amount,
        type as TransactionType,
        category,
        date,
        description || '',
        req.user!.id
      );
      
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  }
);

// Update record (Admin only)
router.put('/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  body('amount').isFloat({ min: 0.01 }),
  body('type').isIn(['income', 'expense']),
  body('category').trim().notEmpty(),
  body('date').isISO8601(),
  body('description').optional().trim(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { amount, type, category, date, description } = req.body;
      const record = recordService.updateRecord(
        parseInt(req.params.id),
        amount,
        type as TransactionType,
        category,
        date,
        description || ''
      );
      
      res.json(record);
    } catch (error) {
      next(error);
    }
  }
);

// Delete record (Admin only)
router.delete('/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  async (req, res, next) => {
    try {
      recordService.deleteRecord(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
