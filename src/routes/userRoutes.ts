import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { UserService } from '../services/userService';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole, UserStatus, AuthRequest } from '../types';

const router = Router();
const userService = new UserService();

// Get all users (Admin only)
router.get('/', authenticate, authorize(UserRole.ADMIN), async (req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = userService.getUserById(req.user!.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update user status (Admin only)
router.patch('/:id/status',
  authenticate,
  authorize(UserRole.ADMIN),
  body('status').isIn(['active', 'inactive']),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = userService.updateUserStatus(parseInt(req.params.id), req.body.status as UserStatus);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Update user role (Admin only)
router.patch('/:id/role',
  authenticate,
  authorize(UserRole.ADMIN),
  body('role').isIn(['viewer', 'analyst', 'admin']),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = userService.updateUserRole(parseInt(req.params.id), req.body.role as UserRole);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Delete user (Admin only)
router.delete('/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  async (req: AuthRequest, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      
      // Prevent admin from deleting themselves
      if (req.user!.id === userId) {
        return res.status(400).json({ error: 'Cannot delete your own account' });
      }

      userService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
