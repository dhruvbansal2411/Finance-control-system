import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import { DashboardService } from '../services/dashboardService';
import { authenticate } from '../middleware/auth';

const router = Router();
const dashboardService = new DashboardService();

// Get dashboard summary (All authenticated users)
router.get('/summary',
  authenticate,
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const filters = {
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string
      };

      const summary = dashboardService.getSummary(filters);
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
