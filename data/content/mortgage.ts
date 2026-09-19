import type { CalculatorContent } from '../registry';

/**
 * Educational content for the mortgage calculators.
 * See data/calculator-content.ts for how these modules are assembled.
 */
export const mortgageContent: Record<string, CalculatorContent> = {
  'mortgage-calculator': {
    slug: 'mortgage-calculator',
    longIntro: [
      'The monthly cost of owning a home is not the loan payment. It is the loan payment plus property tax, plus insurance, plus mortgage insurance if the down payment fell below the threshold that removes it. Budgeting from the principal and interest figure alone understates the real obligation, often by several hundred a month.',
      'This calculator reports the full monthly payment and separates it into its components, making clear which parts service the debt and which are ongoing costs of ownership. That distinction matters, because property tax and insurance do not end when the loan is repaid.',
      'The down payment percentage carries particular weight, because it does three things simultaneously. It sets how much you borrow, it determines the interest charged on that amount across the whole term, and it decides whether mortgage insurance applies. Moving from just below the conventional 20% threshold to just above it changes the monthly payment by more than the reduction in principal alone would suggest.',
    ],
    howItWorks: [
      'The calculator derives the down payment amount from the home price and the percentage you enter, then subtracts it to get the loan amount.',
      'It computes the principal and interest portion using the standard amortization formula, converting the annual rate to monthly and the term to a number of months.',
      'Annual property tax and annual home insurance are each divided by twelve to produce their monthly equivalents, and the monthly mortgage insurance figure is added as entered.',
      'The total monthly payment is the sum of all four components. Total payment over the term multiplies that figure by the number of months, so it includes tax and insurance, while total interest counts only the interest on the loan itself.',
      'Amortization governs how that principal and interest portion divides over the term. Each payment first covers the interest accrued on the outstanding balance, and the remainder reduces the principal, which is the part that builds your equity in the property. Because the balance is largest at the outset, early payments are dominated by interest and equity accumulates slowly; as the balance falls, a greater share of each payment reaches the principal and equity builds faster.',
    ],
    formula: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]',
    formulaExplanation:
      'This produces only the principal and interest component, where P is the loan amount after the down payment, r is the monthly rate, and n is the number of months. The full monthly obligation is that figure plus annual property tax ÷ 12, plus annual insurance ÷ 12, plus monthly mortgage insurance. The formula governs the first component; the rest are simple monthly allocations of annual costs.',
    workedExamples: [
      {
        title: 'Example 1 — Twenty percent down, no mortgage insurance',
        scenario:
          'Home price $400,000 · Down payment 20% · Rate 6.5% · Term 30 years · Property tax $4,800/yr · Insurance $1,500/yr · No PMI',
        steps: [
          'Down payment = 400,000 × 20% = $80,000',
          'Loan amount = 400,000 − 80,000 = $320,000',
          'Monthly rate = 6.5% ÷ 12 ≈ 0.5417%, payments = 360',
          'Principal and interest ≈ $2,022.62',
          'Property tax = 4,800 ÷ 12 = $400 · Insurance = 1,500 ÷ 12 = $125',
          'Total monthly = 2,022.62 + 400 + 125 + 0 = $2,547.62',
        ],
        result:
          'Total monthly payment $2,547.62, total paid over the term $917,142.36, total interest $408,142.36.',
        takeaway:
          'Principal and interest account for only about 79% of the monthly obligation. The remaining $525 is tax and insurance, which continue after the loan is repaid. Total interest of $408,142.36 exceeds the down payment more than fivefold.',
      },
      {
        title: 'Example 2 — Ten percent down, with mortgage insurance',
        scenario:
          'Home price $320,000 · Down payment 10% · Rate 6.75% · Term 30 years · Property tax $3,840/yr · Insurance $1,320/yr · PMI $120/month',
        steps: [
          'Down payment = 320,000 × 10% = $32,000',
          'Loan amount = 320,000 − 32,000 = $288,000',
          'Principal and interest ≈ $1,867.96',
          'Property tax = 3,840 ÷ 12 = $320 · Insurance = 1,320 ÷ 12 = $110',
          'PMI = $120 per month',
          'Total monthly = 1,867.96 + 320 + 110 + 120 = $2,417.96',
        ],
        result:
          'Total monthly payment $2,417.96, total paid over the term $827,266.51, total interest $384,466.51.',
        takeaway:
          'Mortgage insurance adds $120 a month, or $1,440 a year, and builds no equity. It is a cost of borrowing above the conventional threshold rather than a cost of the house itself, and it typically ends once sufficient equity has accumulated.',
      },
    ],
    whenToUse: [
      'Use this calculator when estimating the full monthly cost of a home purchase rather than just the loan repayment.',
      'It is useful for testing how the down payment percentage changes both the monthly figure and the total interest, particularly around the point where mortgage insurance stops applying.',
      'For analysing an existing loan, especially the effect of paying extra each month, the mortgage amortization calculator is the better fit. For non-property borrowing, use the loan calculator.',
    ],
    factors: [
      {
        title: 'The down payment percentage',
        detail:
          'A larger down payment reduces the amount borrowed, the interest charged across the term, and often removes mortgage insurance entirely. Its effect on the monthly payment is therefore larger than the reduction in principal alone.',
      },
      {
        title: 'The interest rate',
        detail:
          'Over a thirty-year term, small rate differences translate into very large differences in total interest, because the rate applies to a substantial balance for hundreds of months.',
      },
      {
        title: 'Property tax',
        detail:
          'Tax is based on assessed value and local rates, and it tends to rise over time. It is an ongoing cost of ownership that continues indefinitely, regardless of whether the loan is still outstanding.',
      },
      {
        title: 'Mortgage insurance',
        detail:
          'This protects the lender rather than the borrower and applies when the down payment falls below the conventional threshold. It adds to the monthly payment without building equity, and generally ends once enough equity has accumulated.',
      },
      {
        title: 'Costs the calculator does not include',
        detail:
          'Closing costs, homeowners association dues, maintenance, and utilities are real and substantial. Budgeting from the calculated payment alone will understate the full cost of ownership.',
      },
    ],
    assumptions: [
      'The interest rate is fixed for the entire term.',
      'Property tax and insurance are entered as estimated annual amounts and divided evenly across twelve months.',
      'Mortgage insurance applies as a fixed monthly amount for the full term if one is entered.',
      'The down payment is between 0% and 99% of the home price.',
      'No closing costs, HOA fees, maintenance, or utilities are included.',
    ],
    commonMistakes: [
      'Looking only at principal and interest — taxes and insurance add significant monthly cost.',
      'Forgetting mortgage insurance when putting less than 20% down.',
      'Not factoring in maintenance, HOA fees, and other ongoing homeownership costs.',
      'Assuming property tax and insurance stay fixed for thirty years; both typically rise.',
      'Treating total interest as unavoidable without testing what a shorter term or a larger down payment would change.',
    ],
    faqs: [
      {
        question: 'What is included in the monthly payment this calculator shows?',
        answer:
          'Four components: principal and interest on the loan, one twelfth of the annual property tax, one twelfth of the annual home insurance, and monthly mortgage insurance if you enter one. It does not include HOA dues, maintenance, utilities, or closing costs.',
      },
      {
        question: 'Why does a larger down payment help more than expected?',
        answer:
          'Because it acts on three things at once. It lowers the balance, it lowers the interest charged on that balance across hundreds of months, and crossing the conventional 20% threshold typically removes mortgage insurance. The combined effect exceeds the reduction in principal alone.',
      },
      {
        question: 'When does mortgage insurance stop?',
        answer:
          'Generally once the loan balance falls to a sufficient share of the property value, though the exact rule depends on the loan type and the lender. This calculator applies the monthly amount you enter for the whole term, so it will overstate the long-run cost if your policy ends earlier.',
      },
      {
        question: 'Why is total interest so large on a 30-year mortgage?',
        answer:
          'Because interest accrues on the outstanding balance every month for 360 months, and that balance falls slowly in the early years. At 6.5% on $320,000, total interest reaches $408,142.36. A shorter term reduces this substantially, at the cost of a higher monthly payment.',
      },
      {
        question: 'Does this account for property tax increases?',
        answer:
          'No. It applies the annual figure you enter evenly across every month of the term. Since assessed values and local rates usually rise, the later years of a long projection will tend to understate the actual monthly cost.',
      },
      {
        question: 'Should I choose a 15-year or a 30-year term?',
        answer:
          'A 15-year term carries a higher monthly payment and dramatically lower total interest, because the balance is retired in half the time. Running both through the calculator with the same price and down payment shows the exact trade-off between monthly affordability and lifetime cost.',
      },
    ],
  },

  'mortgage-amortization-calculator': {
    slug: 'mortgage-amortization-calculator',
    longIntro: [
      'Amortization is the schedule that governs how a loan balance is retired. Each payment is split between interest on the current balance and principal that reduces it, and because the balance falls every month, that split shifts continuously. The payment amount stays the same while its effect changes entirely across the term.',
      'The consequence is that progress feels slow at the beginning and rapid at the end. On a thirty-year mortgage, the early years are dominated by interest and the balance barely moves. Only in the later years does the principal portion grow large enough for the balance to fall quickly.',
      'This structure is also why extra payments are so effective, and why their effectiveness is easy to underestimate. An extra amount applied to principal is removed from every subsequent interest calculation for the remaining life of the loan. A small monthly addition made early compounds into a large reduction in both total interest and payoff time.',
    ],
    howItWorks: [
      'The calculator first computes the regular monthly payment from the loan amount, rate, and term using the standard amortization formula. This payment does not change when extra payments are added.',
      'It then simulates each month in turn. Interest for the month is the current balance multiplied by the monthly rate. The regular payment covers that interest, and the remainder reduces the principal.',
      'Any extra monthly payment is applied entirely to principal on top of the regular allocation, so it reduces the balance directly without passing through the interest calculation.',
      'When the remaining balance falls below the scheduled payment, the final payment is trimmed to clear exactly what remains, avoiding an overpayment.',
      'To report savings, the calculator also runs the same loan on its original schedule and compares the two: months saved is the difference in payoff length, and interest saved is the difference in total interest.',
    ],
    formula: 'Standard amortization with any extra payment applied directly to principal each month.',
    formulaExplanation:
      'The regular payment comes from M = P × [r(1+r)^n] / [(1+r)^n − 1]. Each month, interest is balance × r, the principal portion is M − interest, and the balance becomes balance − (M − interest) − extra. Because the extra amount bypasses interest entirely and reduces the balance directly, every subsequent month accrues interest on a smaller figure, which is why the effect accumulates rather than staying constant.',
    workedExamples: [
      {
        title: 'Example 1 — The standard schedule with no extra payment',
        scenario: 'Loan amount $300,000 · Rate 6.25% · Term 30 years · No extra payment',
        steps: [
          'Monthly rate = 6.25% ÷ 12 ≈ 0.5208%',
          'Payments = 30 × 12 = 360',
          'Regular monthly payment ≈ $1,847.15',
          'First month interest = 300,000 × 0.005208 ≈ $1,562.50',
          'First month principal = 1,847.15 − 1,562.50 ≈ $284.65',
          'Total paid = 1,847.15 × 360 = $664,974.58',
        ],
        result: 'Payoff in 360 months, total paid $664,974.58, total interest $364,974.58.',
        takeaway:
          'In the very first month, only $284.65 of an $1,847.15 payment reduces the balance — about 15% of it. Total interest over the term reaches $364,974.58, which is more than the original amount borrowed.',
      },
      {
        title: 'Example 2 — The same loan with $200 extra per month',
        scenario: 'Loan amount $300,000 · Rate 6.25% · Term 30 years · Extra payment $200/month',
        steps: [
          'Regular payment is unchanged at $1,847.15; total monthly outlay becomes $2,047.15',
          'The extra $200 reduces principal directly each month',
          'Payoff occurs in month 278 instead of month 360',
          'Total paid = $567,775.51',
          'Total interest = $267,775.51',
          'Interest saved = 364,974.58 − 267,775.51 = $97,199.07',
        ],
        result: 'Payoff in 278 months, 82 months earlier, with $97,199.07 less interest paid.',
        takeaway:
          'The extra payments total $200 × 278 = $55,600, yet they save $97,199.07 in interest. Every dollar directed at principal saves roughly $1.75 here, because it is removed from the balance for all remaining months. This is why small, consistent extra payments matter far more than their size suggests.',
      },
    ],
    whenToUse: [
      'Use this calculator to understand the structure of an existing loan — how each payment is divided, and how that division changes across the term.',
      'It is the right tool for quantifying what extra payments achieve, in both months saved and interest saved, before committing to them.',
      'For estimating the full monthly cost of a new purchase including tax, insurance, and mortgage insurance, use the mortgage calculator instead. This one focuses on the loan itself.',
    ],
    factors: [
      {
        title: 'When the extra payments start',
        detail:
          'Extra payments made early save far more than identical payments made late, because they remove principal from a larger number of remaining interest calculations. The same total amount has a very different effect depending on timing.',
      },
      {
        title: 'The interest rate',
        detail:
          'Higher rates make extra payments more valuable, since each dollar of principal removed avoids a larger monthly interest charge. At low rates the saving from prepayment is correspondingly smaller.',
      },
      {
        title: 'Consistency rather than size',
        detail:
          'A modest amount paid every month usually outperforms an occasional lump sum of similar total value, because the reduction applies from an earlier date and persists across more months.',
      },
      {
        title: 'How the lender applies extra payments',
        detail:
          'The saving only materialises if the extra amount is applied to principal. Some lenders hold it against the next scheduled instalment instead, which produces no interest saving at all.',
      },
      {
        title: 'Prepayment penalties',
        detail:
          'Some agreements charge a fee for early repayment or for exceeding a prepayment allowance. The calculator does not model these, so check the terms before relying on the projected saving.',
      },
    ],
    assumptions: [
      'The interest rate is fixed for the entire term.',
      'Extra payments are made every month without interruption and applied directly to principal.',
      'No prepayment penalties apply.',
      'The final payment is reduced to clear exactly the remaining balance.',
      'Property tax, insurance, and mortgage insurance are not included — this models the loan only.',
    ],
    commonMistakes: [
      'Assuming extra payments must be large — even small consistent amounts save significant interest over time.',
      'Not verifying that your lender applies extra payments to principal rather than holding them against the next instalment.',
      'Waiting until late in the term to start paying extra, once most of the interest has already accrued.',
      'Comparing only the months saved and overlooking the interest saved, which is usually the larger benefit.',
      'Confusing the total monthly outlay with the regular payment — the regular payment does not change when you add extra.',
    ],
    faqs: [
      {
        question: 'Why does so little of my early payment reduce the balance?',
        answer:
          'Because interest is charged on the outstanding balance, which is at its maximum at the start. On a $300,000 loan at 6.25%, the first month accrues $1,562.50 in interest, leaving only $284.65 of the $1,847.15 payment to reduce principal. The proportion improves every month as the balance falls.',
      },
      {
        question: 'How much can an extra $200 a month really save?',
        answer:
          'On the example above, $200 a month retires a 30-year loan 82 months early and saves $97,199.07 in interest. The extra payments themselves total $55,600, so each dollar of prepayment avoids roughly $1.75 of interest. The exact ratio depends on the rate and on how early you start.',
      },
      {
        question: 'Is it better to pay extra monthly or make one lump sum a year?',
        answer:
          'Monthly is generally more effective for the same annual total, because the principal reduction begins earlier and therefore applies to more months of interest. The difference is not dramatic, but it consistently favours the earlier payment.',
      },
      {
        question: 'Should I make extra payments or invest the money instead?',
        answer:
          'That comparison depends on your mortgage rate against the return you expect elsewhere, and on how you weigh a certain saving against an uncertain return. This calculator quantifies only one side: the guaranteed interest saving from prepayment.',
      },
      {
        question: 'Does paying extra reduce my monthly payment?',
        answer:
          'No. The regular payment is fixed by the original agreement. Extra payments shorten the term rather than lowering the instalment, so you pay the same amount each month but for fewer months. Some lenders offer recasting, which recalculates the payment after a large prepayment, but that is a separate arrangement.',
      },
      {
        question: 'Why does the total differ from payment multiplied by months?',
        answer:
          'Because the final payment is trimmed to clear exactly the balance that remains rather than overshooting it. When extra payments are involved, the last month usually requires less than a full instalment, so the total comes in slightly below a simple multiplication.',
      },
    ],
  },
};
