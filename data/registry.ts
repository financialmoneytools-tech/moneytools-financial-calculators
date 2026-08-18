export interface CalculatorSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface CalculatorEntry {
  slug: string;
  categorySlug: string;
  name: string;
  description: string;
  route: string;
  relatedTools: string[];
  seo: CalculatorSeo;
  featured: boolean;
  icon: string; // lucide icon name
}

export interface CategoryEntry {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: CategoryEntry[] = [
  { slug: 'investment', name: 'Investment', description: 'Calculate returns, growth rates, and investment performance.', icon: 'TrendingUp' },
  { slug: 'loans', name: 'Loans', description: 'Estimate payments, compare loan options, and plan debt repayment.', icon: 'Landmark' },
  { slug: 'mortgage', name: 'Mortgage', description: 'Plan home purchases with payment and amortization calculations.', icon: 'Home' },
  { slug: 'savings', name: 'Savings', description: 'Grow your savings with goal planning, APY comparison, and projections.', icon: 'PiggyBank' },
  { slug: 'business', name: 'Business', description: 'Analyze margins, break-even points, and marketing ROI for your business.', icon: 'Briefcase' },
  { slug: 'salary', name: 'Salary', description: 'Convert and compare compensation across different pay periods.', icon: 'DollarSign' },
];

export const calculators: CalculatorEntry[] = [
  // INVESTMENT
  {
    slug: 'compound-interest-calculator',
    categorySlug: 'investment',
    name: 'Compound Interest Calculator',
    description: 'See how your money grows over time with compound interest and regular contributions.',
    route: '/investment/compound-interest-calculator',
    relatedTools: ['investment-calculator', 'simple-interest-calculator', 'apy-calculator'],
    seo: { title: 'Compound Interest Calculator', description: 'Calculate compound interest with monthly contributions. See how your investments grow over time with our free compound interest calculator.', keywords: ['compound interest', 'interest calculator', 'investment growth', 'compound growth'] },
    featured: true,
    icon: 'TrendingUp',
  },
  {
    slug: 'investment-calculator',
    categorySlug: 'investment',
    name: 'Investment Calculator',
    description: 'Project the future value of investments with inflation-adjusted returns.',
    route: '/investment/investment-calculator',
    relatedTools: ['compound-interest-calculator', 'roi-calculator', 'future-value-calculator'],
    seo: { title: 'Investment Calculator', description: 'Calculate investment growth with inflation adjustment. Free investment return calculator with yearly projections.', keywords: ['investment calculator', 'investment growth', 'inflation adjusted returns'] },
    featured: true,
    icon: 'LineChart',
  },
  {
    slug: 'roi-calculator',
    categorySlug: 'investment',
    name: 'ROI Calculator',
    description: 'Calculate the return on investment and annualized ROI for any investment.',
    route: '/investment/roi-calculator',
    relatedTools: ['cagr-calculator', 'investment-calculator', 'roas-calculator'],
    seo: { title: 'ROI Calculator', description: 'Calculate return on investment (ROI) and annualized ROI. Free ROI calculator for investments, projects, and business decisions.', keywords: ['ROI calculator', 'return on investment', 'annualized ROI'] },
    featured: false,
    icon: 'Percent',
  },
  {
    slug: 'cagr-calculator',
    categorySlug: 'investment',
    name: 'CAGR Calculator',
    description: 'Find the compound annual growth rate between two values over a time period.',
    route: '/investment/cagr-calculator',
    relatedTools: ['roi-calculator', 'compound-interest-calculator', 'investment-calculator'],
    seo: { title: 'CAGR Calculator', description: 'Calculate the Compound Annual Growth Rate (CAGR) for investments. Free CAGR calculator with growth analysis.', keywords: ['CAGR calculator', 'compound annual growth rate', 'growth rate calculator'] },
    featured: false,
    icon: 'BarChart3',
  },
  {
    slug: 'simple-interest-calculator',
    categorySlug: 'investment',
    name: 'Simple Interest Calculator',
    description: 'Calculate interest earned using the simple interest formula.',
    route: '/investment/simple-interest-calculator',
    relatedTools: ['compound-interest-calculator', 'apy-calculator', 'savings-calculator'],
    seo: { title: 'Simple Interest Calculator', description: 'Calculate simple interest on deposits and loans. Compare simple vs compound interest with our free calculator.', keywords: ['simple interest calculator', 'interest formula', 'simple interest formula'] },
    featured: false,
    icon: 'Calculator',
  },
  // LOANS
  {
    slug: 'loan-calculator',
    categorySlug: 'loans',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments and total interest for any fixed-rate loan.',
    route: '/loans/loan-calculator',
    relatedTools: ['personal-loan-calculator', 'mortgage-calculator', 'debt-payoff-calculator'],
    seo: { title: 'Loan Calculator', description: 'Calculate monthly loan payments, total interest, and view a full amortization schedule. Free loan calculator for any fixed-rate loan.', keywords: ['loan calculator', 'loan payment calculator', 'amortization calculator'] },
    featured: true,
    icon: 'Landmark',
  },
  {
    slug: 'personal-loan-calculator',
    categorySlug: 'loans',
    name: 'Personal Loan Calculator',
    description: 'Estimate personal loan payments including origination fees and effective APR.',
    route: '/loans/personal-loan-calculator',
    relatedTools: ['loan-calculator', 'debt-payoff-calculator', 'roi-calculator'],
    seo: { title: 'Personal Loan Calculator', description: 'Calculate personal loan payments with origination fee and effective APR. Compare loan offers accurately.', keywords: ['personal loan calculator', 'personal loan APR', 'origination fee calculator'] },
    featured: false,
    icon: 'User',
  },
  {
    slug: 'debt-payoff-calculator',
    categorySlug: 'loans',
    name: 'Debt Payoff Calculator',
    description: 'Compare avalanche and snowball methods to find the fastest debt payoff strategy.',
    route: '/loans/debt-payoff-calculator',
    relatedTools: ['loan-calculator', 'personal-loan-calculator', 'savings-goal-calculator'],
    seo: { title: 'Debt Payoff Calculator', description: 'Compare debt avalanche vs snowball payoff strategies. Find the fastest way to become debt-free with our free calculator.', keywords: ['debt payoff calculator', 'debt snowball', 'debt avalanche', 'debt free calculator'] },
    featured: true,
    icon: 'Target',
  },
  // MORTGAGE
  {
    slug: 'mortgage-calculator',
    categorySlug: 'mortgage',
    name: 'Mortgage Calculator',
    description: 'Estimate monthly mortgage payments including taxes, insurance, and PMI.',
    route: '/mortgage/mortgage-calculator',
    relatedTools: ['mortgage-amortization-calculator', 'loan-calculator', 'savings-goal-calculator'],
    seo: { title: 'Mortgage Calculator', description: 'Calculate monthly mortgage payments with taxes, insurance, and PMI. Free mortgage payment calculator with full cost breakdown.', keywords: ['mortgage calculator', 'mortgage payment calculator', 'home loan calculator'] },
    featured: true,
    icon: 'Home',
  },
  {
    slug: 'mortgage-amortization-calculator',
    categorySlug: 'mortgage',
    name: 'Mortgage Amortization Calculator',
    description: 'View a complete amortization schedule and see how extra payments reduce your loan.',
    route: '/mortgage/mortgage-amortization-calculator',
    relatedTools: ['mortgage-calculator', 'loan-calculator', 'debt-payoff-calculator'],
    seo: { title: 'Mortgage Amortization Calculator', description: 'Generate a full mortgage amortization schedule with extra payment analysis. See how additional payments save money.', keywords: ['mortgage amortization', 'amortization schedule', 'extra mortgage payment calculator'] },
    featured: false,
    icon: 'Table',
  },
  // SAVINGS
  {
    slug: 'savings-calculator',
    categorySlug: 'savings',
    name: 'Savings Calculator',
    description: 'Calculate how your savings grow with regular deposits and compound interest.',
    route: '/savings/savings-calculator',
    relatedTools: ['savings-goal-calculator', 'compound-interest-calculator', 'apy-calculator'],
    seo: { title: 'Savings Calculator', description: 'Calculate savings growth with monthly deposits and compound interest. Free savings account growth calculator.', keywords: ['savings calculator', 'savings growth calculator', 'compound savings'] },
    featured: true,
    icon: 'PiggyBank',
  },
  {
    slug: 'savings-goal-calculator',
    categorySlug: 'savings',
    name: 'Savings Goal Calculator',
    description: 'Find out how much to save each month to reach your financial goal.',
    route: '/savings/savings-goal-calculator',
    relatedTools: ['savings-calculator', 'future-value-calculator', 'investment-calculator'],
    seo: { title: 'Savings Goal Calculator', description: 'Calculate the monthly savings needed to reach your financial goal. Free savings goal planner with interest projections.', keywords: ['savings goal calculator', 'savings planner', 'how much to save'] },
    featured: false,
    icon: 'Target',
  },
  {
    slug: 'apy-calculator',
    categorySlug: 'savings',
    name: 'APY Calculator',
    description: 'Convert between APR and APY, and compare compounding frequencies.',
    route: '/savings/apy-calculator',
    relatedTools: ['savings-calculator', 'compound-interest-calculator', 'simple-interest-calculator'],
    seo: { title: 'APY Calculator', description: 'Convert APR to APY and compare compounding frequencies. Understand the true annual yield on savings accounts.', keywords: ['APY calculator', 'APR to APY', 'annual percentage yield', 'compounding frequency'] },
    featured: false,
    icon: 'RefreshCw',
  },
  {
    slug: 'future-value-calculator',
    categorySlug: 'savings',
    name: 'Future Value Calculator',
    description: 'Calculate the future value of an investment or savings plan with periodic payments.',
    route: '/savings/future-value-calculator',
    relatedTools: ['savings-calculator', 'compound-interest-calculator', 'investment-calculator'],
    seo: { title: 'Future Value Calculator', description: 'Calculate the future value of investments with periodic contributions. Free FV calculator with beginning and end-of-period options.', keywords: ['future value calculator', 'FV calculator', 'time value of money'] },
    featured: false,
    icon: 'Clock',
  },
  // BUSINESS
  {
    slug: 'profit-margin-calculator',
    categorySlug: 'business',
    name: 'Profit Margin Calculator',
    description: 'Calculate gross, operating, and net profit margins from your revenue data.',
    route: '/business/profit-margin-calculator',
    relatedTools: ['markup-calculator', 'break-even-calculator', 'roas-calculator'],
    seo: { title: 'Profit Margin Calculator', description: 'Calculate gross profit margin, operating margin, and net profit margin. Free margin calculator for businesses.', keywords: ['profit margin calculator', 'gross margin', 'net margin', 'operating margin'] },
    featured: true,
    icon: 'BarChart3',
  },
  {
    slug: 'markup-calculator',
    categorySlug: 'business',
    name: 'Markup Calculator',
    description: 'Calculate markup percentage, profit margin, and selling price from cost.',
    route: '/business/markup-calculator',
    relatedTools: ['profit-margin-calculator', 'break-even-calculator', 'roi-calculator'],
    seo: { title: 'Markup Calculator', description: 'Calculate markup percentage and profit margin from cost and selling price. Convert between markup and margin.', keywords: ['markup calculator', 'markup vs margin', 'selling price calculator'] },
    featured: false,
    icon: 'Tag',
  },
  {
    slug: 'break-even-calculator',
    categorySlug: 'business',
    name: 'Break-Even Calculator',
    description: 'Find the sales volume needed to cover costs and start earning profit.',
    route: '/business/break-even-calculator',
    relatedTools: ['profit-margin-calculator', 'markup-calculator', 'roas-calculator'],
    seo: { title: 'Break-Even Calculator', description: 'Calculate your break-even point in units and revenue. Understand contribution margin and plan for profitability.', keywords: ['break even calculator', 'break even point', 'contribution margin', 'break even analysis'] },
    featured: false,
    icon: 'Scale',
  },
  {
    slug: 'roas-calculator',
    categorySlug: 'business',
    name: 'ROAS Calculator',
    description: 'Calculate return on ad spend and determine if your advertising is profitable.',
    route: '/business/roas-calculator',
    relatedTools: ['roi-calculator', 'ltv-cac-calculator', 'profit-margin-calculator'],
    seo: { title: 'ROAS Calculator', description: 'Calculate Return on Ad Spend (ROAS), break-even ROAS, and advertising ROI. Free ROAS calculator for marketers.', keywords: ['ROAS calculator', 'return on ad spend', 'advertising ROI', 'ad spend calculator'] },
    featured: false,
    icon: 'Megaphone',
  },
  {
    slug: 'ltv-cac-calculator',
    categorySlug: 'business',
    name: 'LTV:CAC Calculator',
    description: 'Calculate customer lifetime value, acquisition cost, and the LTV:CAC ratio.',
    route: '/business/ltv-cac-calculator',
    relatedTools: ['roas-calculator', 'roi-calculator', 'break-even-calculator'],
    seo: { title: 'LTV:CAC Calculator', description: 'Calculate Customer Lifetime Value (LTV), Customer Acquisition Cost (CAC), and the LTV:CAC ratio. Free SaaS metrics calculator.', keywords: ['LTV calculator', 'CAC calculator', 'LTV CAC ratio', 'customer lifetime value'] },
    featured: false,
    icon: 'Users',
  },
  // SALARY
  {
    slug: 'salary-calculator',
    categorySlug: 'salary',
    name: 'Salary Calculator',
    description: 'Convert salary between hourly, weekly, monthly, and annual pay periods.',
    route: '/salary/salary-calculator',
    relatedTools: ['roi-calculator', 'savings-goal-calculator', 'savings-calculator'],
    seo: { title: 'Salary Calculator', description: 'Convert salary between hourly, weekly, bi-weekly, monthly, and annual rates. Free salary conversion calculator.', keywords: ['salary calculator', 'hourly to annual', 'salary converter', 'wage calculator'] },
    featured: true,
    icon: 'DollarSign',
  },
];

export function getCalculatorBySlug(slug: string): CalculatorEntry | undefined {
  return calculators.find((c: CalculatorEntry) => c.slug === slug);
}

export function getCalculatorsByCategory(categorySlug: string): CalculatorEntry[] {
  return calculators.filter((c: CalculatorEntry) => c.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): CategoryEntry | undefined {
  return categories.find((c: CategoryEntry) => c.slug === slug);
}

export function getFeaturedCalculators(): CalculatorEntry[] {
  return calculators.filter((c: CalculatorEntry) => c.featured);
}

export function getRelatedCalculators(slug: string): CalculatorEntry[] {
  const calc = getCalculatorBySlug(slug);
  if (!calc) return [];
  return (calc.relatedTools ?? []).map((s: string) => getCalculatorBySlug(s)).filter(Boolean) as CalculatorEntry[];
}
