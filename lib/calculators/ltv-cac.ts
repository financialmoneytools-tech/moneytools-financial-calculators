/**
 * LTV:CAC Calculator Engine
 * LTV = (AOV × Frequency × Gross Margin%) / Churn Rate
 * CAC = Marketing Spend / New Customers
 */

export interface LtvCacInput {
  averageOrderValue: number;
  purchaseFrequency: number; // per year
  grossMarginPercent: number;
  churnRate: number; // annual percentage
  marketingSpend: number;
  newCustomers: number;
}

export interface LtvCacResult {
  ltv: number;
  cac: number;
  ltvCacRatio: number;
  paybackPeriodMonths: number;
  interpretation: string;
}

export function calculateLtvCac(input: LtvCacInput): LtvCacResult {
  const { averageOrderValue, purchaseFrequency, grossMarginPercent, churnRate, marketingSpend, newCustomers } = input;

  if (newCustomers <= 0) throw new Error('New customers must be positive');
  if (churnRate <= 0 || churnRate > 100) throw new Error('Churn rate must be between 0 and 100');
  if (averageOrderValue <= 0) throw new Error('Average order value must be positive');
  if (grossMarginPercent <= 0 || grossMarginPercent > 100) throw new Error('Gross margin must be between 0 and 100');

  const annualRevPerCustomer = averageOrderValue * purchaseFrequency;
  const annualGrossProfit = annualRevPerCustomer * (grossMarginPercent / 100);
  const ltv = annualGrossProfit / (churnRate / 100);
  const cac = marketingSpend / newCustomers;
  const ltvCacRatio = cac > 0 ? ltv / cac : Infinity;

  const monthlyGrossProfit = annualGrossProfit / 12;
  const paybackPeriodMonths = monthlyGrossProfit > 0 ? cac / monthlyGrossProfit : Infinity;

  let interpretation: string;
  if (ltvCacRatio >= 3) {
    interpretation = 'Healthy — LTV:CAC ratio of 3:1 or higher suggests efficient customer acquisition.';
  } else if (ltvCacRatio >= 1) {
    interpretation = 'Moderate — you are recouping acquisition costs, but there may be room to improve efficiency.';
  } else {
    interpretation = 'Warning — acquisition costs exceed customer lifetime value. Review your marketing spend or improve retention.';
  }

  return { ltv, cac, ltvCacRatio, paybackPeriodMonths, interpretation };
}
