import type { CalculatorContent } from './registry';
import { investmentContent } from './content/investment';
import { loansContent } from './content/loans';
import { mortgageContent } from './content/mortgage';
import { savingsContent } from './content/savings';
import { businessContent } from './content/business';
import { salaryContent } from './content/salary';

/**
 * Long-form educational content for every calculator in the registry, assembled from
 * one module per category.
 *
 * Every worked example was produced by running the matching engine in lib/calculators
 * with the inputs listed in its `scenario` field, so the figures shown on the page match
 * what the calculator returns for the same inputs.
 *
 * This content is educational: it explains how each calculation works and what drives the
 * result. It is not financial advice, and it contains no market forecasts.
 */
export const calculatorContent: Record<string, CalculatorContent> = {
  ...investmentContent,
  ...loansContent,
  ...mortgageContent,
  ...savingsContent,
  ...businessContent,
  ...salaryContent,
};
