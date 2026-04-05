import db from '../config/database';

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  categoryTotals: Array<{ category: string; total: number; type: string }>;
  recentActivity: Array<any>;
  monthlyTrends: Array<{ month: string; income: number; expense: number }>;
}

export class DashboardService {
  getSummary(filters: { startDate?: string; endDate?: string } = {}): DashboardSummary {
    let dateFilter = '';
    const params: any[] = [];

    if (filters.startDate) {
      dateFilter += ' AND date >= ?';
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      dateFilter += ' AND date <= ?';
      params.push(filters.endDate);
    }

    // Total income
    const incomeResult = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM financial_records 
      WHERE type = 'income'${dateFilter}
    `).get(...params) as { total: number } | undefined;

    // Total expense
    const expenseResult = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM financial_records 
      WHERE type = 'expense'${dateFilter}
    `).get(...params) as { total: number } | undefined;

    // Category totals
    const categoryTotals = db.prepare(`
      SELECT category, type, SUM(amount) as total
      FROM financial_records
      WHERE 1=1${dateFilter}
      GROUP BY category, type
      ORDER BY total DESC
    `).all(...params) as any as Array<{ category: string; type: string; total: number }>;

    // Recent activity (last 10 records)
    const recentActivity = db.prepare(`
      SELECT * FROM financial_records
      WHERE 1=1${dateFilter}
      ORDER BY date DESC, createdAt DESC
      LIMIT 10
    `).all(...params) as any;

    // Monthly trends (last 6 months)
    const monthlyTrends = db.prepare(`
      SELECT 
        strftime('%Y-%m', date) as month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
      FROM financial_records
      WHERE date >= date('now', '-6 months')${dateFilter.replace('AND date >=', 'AND date >=')}
      GROUP BY strftime('%Y-%m', date)
      ORDER BY month DESC
    `).all(...params) as any as Array<{ month: string; income: number; expense: number }>;

    return {
      totalIncome: incomeResult?.total || 0,
      totalExpense: expenseResult?.total || 0,
      netBalance: (incomeResult?.total || 0) - (expenseResult?.total || 0),
      categoryTotals,
      recentActivity,
      monthlyTrends
    };
  }
}
