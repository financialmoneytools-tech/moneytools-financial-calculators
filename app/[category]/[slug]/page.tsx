import { notFound } from 'next/navigation';
import { calculators, getCalculatorBySlug, getCategoryBySlug } from '@/data/registry';
import type { Metadata } from 'next';

// Import all calculator page components
import { CompoundInterestPage } from './calculators/compound-interest-page';
import { InvestmentPage } from './calculators/investment-page';
import { RoiPage } from './calculators/roi-page';
import { CagrPage } from './calculators/cagr-page';
import { SimpleInterestPage } from './calculators/simple-interest-page';
import { LoanPage } from './calculators/loan-page';
import { PersonalLoanPage } from './calculators/personal-loan-page';
import { DebtPayoffPage } from './calculators/debt-payoff-page';
import { MortgagePage } from './calculators/mortgage-page';
import { MortgageAmortizationPage } from './calculators/mortgage-amortization-page';
import { SavingsPage } from './calculators/savings-page';
import { SavingsGoalPage } from './calculators/savings-goal-page';
import { ApyPage } from './calculators/apy-page';
import { FutureValuePage } from './calculators/future-value-page';
import { ProfitMarginPage } from './calculators/profit-margin-page';
import { MarkupPage } from './calculators/markup-page';
import { BreakEvenPage } from './calculators/break-even-page';
import { RoasPage } from './calculators/roas-page';
import { LtvCacPage } from './calculators/ltv-cac-page';
import { SalaryPage } from './calculators/salary-page';

const pageComponents: Record<string, React.ComponentType> = {
  'compound-interest-calculator': CompoundInterestPage,
  'investment-calculator': InvestmentPage,
  'roi-calculator': RoiPage,
  'cagr-calculator': CagrPage,
  'simple-interest-calculator': SimpleInterestPage,
  'loan-calculator': LoanPage,
  'personal-loan-calculator': PersonalLoanPage,
  'debt-payoff-calculator': DebtPayoffPage,
  'mortgage-calculator': MortgagePage,
  'mortgage-amortization-calculator': MortgageAmortizationPage,
  'savings-calculator': SavingsPage,
  'savings-goal-calculator': SavingsGoalPage,
  'apy-calculator': ApyPage,
  'future-value-calculator': FutureValuePage,
  'profit-margin-calculator': ProfitMarginPage,
  'markup-calculator': MarkupPage,
  'break-even-calculator': BreakEvenPage,
  'roas-calculator': RoasPage,
  'ltv-cac-calculator': LtvCacPage,
  'salary-calculator': SalaryPage,
};

export function generateStaticParams() {
  return (calculators ?? []).map((c) => ({
    category: c.categorySlug,
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: { category: string; slug: string } }): Promise<Metadata> {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) return {};
  return {
    title: calc.seo?.title ?? calc.name,
    description: calc.seo?.description ?? calc.description,
    keywords: calc.seo?.keywords,
  };
}

export default function CalculatorPage({ params }: { params: { category: string; slug: string } }) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc || calc.categorySlug !== params.category) return notFound();

  const PageComponent = pageComponents[params.slug];
  if (!PageComponent) return notFound();

  return <PageComponent />;
}
