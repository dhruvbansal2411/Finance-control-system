import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { UserService } from '../services/userService';
import { UserRole } from '../types';

const router = Router();
const userService = new UserService();

// Register
router.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty(),
  body('role').isIn(['viewer', 'analyst', 'admin']),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name, role } = req.body;
      const user = await userService.createUser(email, password, name, role as UserRole);
      
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error: any) {
      next(error);
    }
  }
);

// Login
router.post('/login',
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const result = await userService.login(email, password);
      
      res.json(result);
    } catch (error: any) {
      if (error.message === 'Invalid credentials' || error.message === 'Account is inactive') {
        return res.status(401).json({ error: error.message });
      }
      next(error);
    }
  }
);

export default router;
