import { Request } from 'express';

export enum UserRole {
  VIEWER = 'viewer',
  ANALYST = 'analyst',
  ADMIN = 'admin'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface FinancialRecord {
  id: number;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: UserRole;
    status: UserStatus;
  };
}
