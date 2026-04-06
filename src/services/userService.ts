import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db, { saveDatabase } from '../config/database';
import { User, UserRole, UserStatus } from '../types';

export class UserService {
  async createUser(email: string, password: string, name: string, role: UserRole): Promise<Omit<User, 'password'>> {
    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      const result = db.prepare(`
        INSERT INTO users (email, password, name, role)
        VALUES (?, ?, ?, ?)
      `).run(email, hashedPassword, name, role);
      
      console.log('Insert result:', result);
      
      if (!result.lastInsertRowid || result.lastInsertRowid === 0) {
        // Fallback: get user by email
        const user = db.prepare('SELECT id, email, name, role, status, createdAt FROM users WHERE email = ?').get(email);
        if (user) {
          return user as any as Omit<User, 'password'>;
        }
        throw new Error('Failed to create user');
      }
      
      return this.getUserById(result.lastInsertRowid as number);
    } catch (error: any) {
      if (error.message?.includes('UNIQUE constraint failed')) {
        throw new Error('Email already registered');
      }
      throw error;
    }
  }

  async login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'password'> }> {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new Error('Account is inactive');
    }

    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, status: user.status },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  getUserById(id: number): Omit<User, 'password'> {
    const user = db.prepare('SELECT id, email, name, role, status, createdAt FROM users WHERE id = ?').get(id);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user as any as Omit<User, 'password'>;
  }

  getAllUsers(): Omit<User, 'password'>[] {
    return db.prepare('SELECT id, email, name, role, status, createdAt FROM users').all() as any as Omit<User, 'password'>[];
  }

  updateUserStatus(id: number, status: UserStatus): Omit<User, 'password'> {
    db.prepare('UPDATE users SET status = ? WHERE id = ?').run(status, id);
    saveDatabase();
    return this.getUserById(id);
  }

  updateUserRole(id: number, role: UserRole): Omit<User, 'password'> {
    db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, id);
    saveDatabase();
    return this.getUserById(id);
  }

  deleteUser(id: number): void {
    const result = db.prepare('DELETE FROM users WHERE id = ?').run(id);
    
    if (result.changes === 0) {
      throw new Error('User not found');
    }
    
    saveDatabase();
  }
}
