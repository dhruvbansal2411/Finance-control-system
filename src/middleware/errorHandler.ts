import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === 'SQLITE_CONSTRAINT' || err.message?.includes('UNIQUE constraint failed')) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  if (err.message === 'Email already registered') {
    return res.status(409).json({ error: err.message });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};
