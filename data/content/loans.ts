import type { CalculatorContent } from '../registry';

/**
 * Educational content for the loan calculators.
 * See data/calculator-content.ts for how these modules are assembled.
 */
export const loansContent: Record<string, CalculatorContent> = {
  'loan-calculator': {
    slug: 'loan-calculator',
    longIntro: [
      'An amortizing loan replaces an unpredictable debt with a fixed monthly obligation. The lender computes a single payment amount that, repeated for the full term, covers all the interest that accrues and reduces the balance to exactly zero on the final payment. Every amortizing car loan, instalment loan, and mortgage works this way.',
      'What the fixed payment conceals is that its composition changes every single month. Interest is charged on the outstanding balance, and that balance falls with each payment, so the interest portion shrinks while the principal portion grows. Early payments are mostly interest; late payments are almost entirely principal. The amount never moves, but what it buys you changes continuously.',
      'This has a direct practical consequence. Comparing loans by monthly payment alone compares the wrong number, because a longer term always produces a smaller payment and a larger total cost. The figure that describes what borrowing actually costs is total interest, and it can differ substantially between two loans whose monthly payments look almost identical.',
    ],
    howItWorks: [
      'The calculator converts the annual rate to a monthly rate by dividing by twelve, and the term in years to a number of months by multiplying by twelve. All the arithmetic then happens on a monthly basis.',
      'It solves the standard amortization formula for the payment that exactly retires the balance over that number of months. This payment is fixed for the life of the loan.',
      'It then works through the term one payment period at a time, determining the interest, the principal, and the remaining balance for each. For each month it computes interest as the current balance multiplied by the monthly rate, treats the remainder of the payment as principal, and subtracts that principal from the balance before moving on.',
      'Total payment is the monthly payment multiplied by the number of months, and total interest is that total minus the amount borrowed. A zero interest rate is handled separately by dividing the principal evenly across the term.',
    ],
    formula: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]',
    formulaExplanation:
      'M is the monthly payment, P is the amount borrowed, r is the monthly interest rate (the annual rate divided by twelve), and n is the total number of monthly payments. The formula finds the payment at which the present value of all future payments equals the amount borrowed today. Because r and n both appear inside exponents, the payment does not scale proportionally with either the rate or the term.',
    workedExamples: [
      {
        title: 'Example 1 — A five-year loan',
        scenario: 'Loan amount $20,000 · Annual rate 7.5% · Term 5 years',
        steps: [
          'Monthly rate = 7.5% ÷ 12 = 0.625% (0.00625)',
          'Number of payments = 5 × 12 = 60',
          'M = 20,000 × [0.00625 × (1.00625)^60] ÷ [(1.00625)^60 − 1]',
          '(1.00625)^60 ≈ 1.45329',
          'M ≈ $400.76 per month',
          'Total paid = 400.76 × 60 = $24,045.54',
        ],
        result: 'Monthly payment $400.76, total paid $24,045.54, of which $4,045.54 is interest.',
        takeaway:
          'Interest adds about 20% to the cost of the loan. In the first month, interest is 20,000 × 0.00625 = $125, so only $275.76 of that first payment reduces the balance. By the final month, almost the entire payment is principal.',
      },
      {
        title: 'Example 2 — A larger loan over a longer term',
        scenario: 'Loan amount $35,000 · Annual rate 9% · Term 7 years',
        steps: [
          'Monthly rate = 9% ÷ 12 = 0.75% (0.0075)',
          'Number of payments = 7 × 12 = 84',
          '(1.0075)^84 ≈ 1.87320',
          'M ≈ $563.12 per month',
          'Total paid = 563.12 × 84 = $47,301.89',
          'Total interest = 47,301.89 − 35,000 = $12,301.89',
        ],
        result: 'Monthly payment $563.12, total paid $47,301.89, of which $12,301.89 is interest.',
        takeaway:
          'Interest here is about 35% of the amount borrowed, against 20% in the first example. The higher rate and the longer term both contribute, but the term does much of the work: a longer schedule keeps the balance high for longer, and interest is charged on that balance every month it remains outstanding.',
      },
    ],
    whenToUse: [
      'Use this calculator for any fixed-rate loan repaid in equal monthly instalments over a set number of years — car loans, instalment loans, and general-purpose borrowing.',
      'It is well suited to comparing the same loan across different terms, which is the clearest way to see the trade-off between a comfortable monthly payment and a lower total cost.',
      'For a loan quoted in months or one that carries an origination fee, use the personal loan calculator. For home loans with tax, insurance, and mortgage insurance, use the mortgage calculator.',
    ],
    factors: [
      {
        title: 'The term',
        detail:
          'Extending the term reduces the monthly payment and increases total interest, and the two move in opposite directions by more than most people expect. The balance simply stays outstanding for longer, and every additional month is another month of interest charged on it.',
      },
      {
        title: 'The interest rate',
        detail:
          'The rate determines how much of each payment is absorbed by interest rather than reducing the balance. Because interest is charged on the remaining balance, a higher rate slows the pace at which that balance falls, which magnifies the effect across the full term.',
      },
      {
        title: 'The amount borrowed',
        detail:
          'For a given rate and term, the payment scales proportionally with the principal. Doubling the amount borrowed exactly doubles both the monthly payment and the total interest.',
      },
      {
        title: 'Fees outside the quoted rate',
        detail:
          'Origination charges, documentation fees, and bundled insurance products add to the real cost of borrowing without appearing in the interest rate. Two loans with identical rates can cost noticeably different amounts once fees are counted.',
      },
      {
        title: 'Prepayment terms',
        detail:
          'Whether extra payments are permitted, and whether they reduce principal or are held against future instalments, determines how much you can shorten the loan. Some agreements attach penalties to early repayment.',
      },
    ],
    assumptions: [
      'The interest rate is fixed for the entire term.',
      'Payments are equal and monthly, and the loan fully amortizes to a zero balance.',
      'No extra payments, fees, or prepayment penalties are applied.',
      'Every payment is made on time and in full.',
      'Interest is calculated on the outstanding balance each month.',
    ],
    commonMistakes: [
      'Forgetting that a longer term means lower payments but more total interest.',
      'Comparing loans by monthly payment alone instead of total cost (principal plus interest).',
      'Ignoring fees that affect the true cost of borrowing but are absent from the quoted rate.',
      'Assuming the interest portion of the payment stays constant — it falls every month as the balance declines.',
      'Entering the term in months where the calculator expects years, which produces a payment twelve times too small.',
    ],
    faqs: [
      {
        question: 'Why is so much of my early payment going to interest?',
        answer:
          'Because interest is charged on the outstanding balance, and that balance is at its highest at the start. On a $20,000 loan at 7.5%, the first month accrues $125 in interest, so only the remainder of the $400.76 payment reduces principal. As the balance falls, the interest portion falls with it and the principal portion grows.',
      },
      {
        question: 'Should I take the longer term for a lower payment?',
        answer:
          'That depends on which constraint binds. A longer term lowers the monthly obligation and raises the total cost; a shorter term does the reverse. Running both through the calculator shows exactly what the lower payment costs in total interest, which turns a vague preference into a specific number.',
      },
      {
        question: 'How much do extra payments help?',
        answer:
          'Considerably, because every extra dollar applied to principal is removed from all future interest calculations. This calculator models the standard schedule only. To quantify extra payments, the mortgage amortization calculator includes an extra payment input and reports both the interest and the time saved.',
      },
      {
        question: 'What is the difference between the interest rate and the APR?',
        answer:
          'The interest rate determines the payment. The APR is a broader measure that also incorporates certain fees, so it reflects the total cost of borrowing more completely. When two lenders quote the same rate but different APRs, the difference lies in the fees. The personal loan calculator shows this effect directly.',
      },
      {
        question: 'Does this calculator work for an interest-only loan?',
        answer:
          'No. It assumes a fully amortizing loan in which every payment includes principal and the balance reaches zero at the end of the term. An interest-only loan pays no principal during its interest-only period, leaving the full balance outstanding, which is a different structure altogether.',
      },
      {
        question: 'What happens if I enter a zero interest rate?',
        answer:
          'The calculator divides the amount borrowed evenly across the number of months and reports zero total interest. This is handled as a distinct case because the standard formula divides by the rate, which is undefined at zero.',
      },
    ],
  },

  'personal-loan-calculator': {
    slug: 'personal-loan-calculator',
    longIntro: [
      'A personal loan is usually unsecured, meaning no asset backs it. Lenders price that additional risk into the interest rate, and they frequently add an origination fee on top. That fee is what makes personal loans harder to compare than their headline rates suggest.',
      'An origination fee is typically deducted from the loan before the money reaches you, yet you repay and pay interest on the full face amount. Borrow $15,000 with a 3% origination fee and $14,550 arrives in your account, but every calculation the lender performs uses $15,000. You are paying interest on money you never received.',
      'This is why the effective APR matters more than the stated rate. It reworks the arithmetic around what you actually received rather than what was nominally borrowed, producing a figure that is directly comparable across offers with different fee structures. A loan with a lower rate and a high fee can easily cost more than one with a higher rate and no fee.',
    ],
    howItWorks: [
      'The calculator takes the term in months rather than years, since personal loans are commonly quoted as 24, 36, 48, or 60 months.',
      'It computes the monthly payment using the standard amortization formula applied to the full loan amount, because the fee does not reduce what you repay.',
      'The origination fee is calculated as a percentage of the loan amount and treated as deducted from the proceeds, so the net amount you receive is the loan amount minus the fee.',
      'The effective APR is then derived by solving for the rate that equates the same stream of monthly payments to the reduced amount actually received. Because the payments are unchanged while the sum received is smaller, this rate is always higher than the stated rate whenever a fee applies.',
      'Amortization describes how the balance is retired across the term. Each monthly payment first covers the interest that has accrued on the outstanding balance, and whatever remains reduces the principal. Because the balance falls every month, the interest portion shrinks and the principal portion grows, even though the payment itself never changes. On a short personal loan term that shift happens faster than it would on a longer loan, which is why more of your money reaches the principal early on.',
    ],
    formula: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]',
    formulaExplanation:
      'P is the full loan amount, r is the monthly rate, and n is the term in months. The payment is calculated on P, not on the net proceeds. The effective APR is then found by solving the same equation in reverse, holding the payment M and the term n fixed while replacing P with the net amount received. That rate is the true annual cost of the borrowing.',
    workedExamples: [
      {
        title: 'Example 1 — A four-year loan with a 3% fee',
        scenario: 'Loan amount $15,000 · Annual rate 11% · Term 48 months · Origination fee 3%',
        steps: [
          'Origination fee = 15,000 × 3% = $450',
          'Net proceeds received = 15,000 − 450 = $14,550',
          'Monthly rate = 11% ÷ 12 ≈ 0.9167%',
          'Monthly payment on the full $15,000 ≈ $387.68',
          'Total repaid = 387.68 × 48 = $18,608.78',
          'Effective APR, solved against $14,550 received ≈ 12.63%',
        ],
        result:
          'Monthly payment $387.68, total interest $3,608.78, origination fee $450, and an effective APR of 12.63% against a stated rate of 11%.',
        takeaway:
          'The 3% fee raises the true annual cost by roughly 1.63 percentage points. A competing offer at 12% with no fee would be cheaper despite advertising a higher rate — exactly the comparison the stated rate hides.',
      },
      {
        title: 'Example 2 — A shorter term with a larger fee',
        scenario: 'Loan amount $8,000 · Annual rate 14.5% · Term 36 months · Origination fee 5%',
        steps: [
          'Origination fee = 8,000 × 5% = $400',
          'Net proceeds received = 8,000 − 400 = $7,600',
          'Monthly rate = 14.5% ÷ 12 ≈ 1.2083%',
          'Monthly payment on the full $8,000 ≈ $275.37',
          'Total repaid = 275.37 × 36 = $9,913.24',
          'Effective APR, solved against $7,600 received ≈ 18.16%',
        ],
        result:
          'Monthly payment $275.37, total interest $1,913.24, origination fee $400, and an effective APR of 18.16% against a stated rate of 14.5%.',
        takeaway:
          'The gap between stated and effective rate is 3.66 percentage points here, more than double the gap in the first example. Two forces compound: the fee is larger, and the shorter term gives it fewer months to be spread across. Fees hurt most on short loans.',
      },
    ],
    whenToUse: [
      'Use this calculator when comparing unsecured personal loan offers, especially where lenders quote different combinations of interest rate and origination fee.',
      'It is the right tool whenever a term is expressed in months and a fee is deducted from the proceeds, since both are handled directly rather than approximated.',
      'For a loan with no fee and a term in years, the general loan calculator is simpler. For secured home borrowing, use the mortgage calculator, which adds tax, insurance, and mortgage insurance.',
    ],
    factors: [
      {
        title: 'The origination fee',
        detail:
          'A fee deducted upfront raises the effective cost disproportionately, because you pay interest on the full amount while receiving less. Always convert competing offers to an effective APR before comparing them.',
      },
      {
        title: 'Term length relative to the fee',
        detail:
          'The same fee spread over 36 months costs more in effective APR terms than over 60 months, because there are fewer payments to absorb it. Short loans with high fees show the widest gap between stated and effective rates.',
      },
      {
        title: 'Credit profile',
        detail:
          'Because personal loans are unsecured, the rate offered depends heavily on the lender assessment of the borrower. The same request can be priced very differently across lenders.',
      },
      {
        title: 'How much you actually need',
        detail:
          'Since the fee is a percentage of the face amount, borrowing more than necessary increases it proportionally. Requesting an amount that accounts for the deduction is more efficient than borrowing a round number.',
      },
      {
        title: 'Prepayment terms',
        detail:
          'An origination fee is paid regardless of how quickly the loan is repaid, so early repayment does not recover any part of it. Repaying early saves interest, never the fee.',
      },
    ],
    assumptions: [
      'The interest rate is fixed for the entire term.',
      'The origination fee is deducted from the proceeds upfront rather than added to the balance.',
      'The monthly payment is calculated on the full loan amount, not on the net proceeds.',
      'No prepayment penalties or late fees apply.',
      'The effective APR reflects the origination fee only, not any other charges a lender may impose.',
    ],
    commonMistakes: [
      'Comparing loans by interest rate alone — always check the effective APR including fees.',
      'Not accounting for the origination fee reducing your actual proceeds, which can leave you short of the amount you needed.',
      'Assuming a fee added to the balance and a fee deducted from proceeds cost the same; they do not.',
      'Entering the term in years when the calculator expects months.',
      'Believing that repaying the loan early recovers part of the origination fee.',
    ],
    faqs: [
      {
        question: 'What exactly is an origination fee?',
        answer:
          'It is a charge for processing the loan, usually expressed as a percentage of the amount borrowed. In most cases it is deducted from the funds before disbursement, so a $15,000 loan with a 3% fee delivers $14,550. You still repay and pay interest on the full $15,000.',
      },
      {
        question: 'Why is the effective APR higher than the stated rate?',
        answer:
          'Because the payments are calculated on the full loan amount but you only received the amount net of the fee. The effective APR asks what rate would produce those same payments from the smaller sum you actually got. Whenever a fee is charged, that rate exceeds the quoted one.',
      },
      {
        question: 'How do I compare two offers with different fees?',
        answer:
          'Run each through the calculator with its own rate, term, and fee, then compare the effective APR figures rather than the stated rates. A loan at 11% with a 3% fee carries an effective APR of 12.63%, which makes a competing offer at 12% with no fee the cheaper choice.',
      },
      {
        question: 'Should I borrow extra to cover the origination fee?',
        answer:
          'If you need a specific sum in hand, you have to account for the deduction. Note that increasing the face amount also increases the fee, since it is a percentage, so the adjustment needs to be slightly larger than the shortfall itself.',
      },
      {
        question: 'Do all personal loans charge an origination fee?',
        answer:
          'No. Some lenders charge none and price the cost into the interest rate instead. Setting the fee to zero makes the effective APR equal the stated rate, which is a useful way to isolate how much of a given offer cost comes from the fee.',
      },
      {
        question: 'Is a personal loan cheaper than credit card debt?',
        answer:
          'Often it is, because personal loans usually carry lower rates and a fixed payoff date, while revolving credit can persist indefinitely at higher rates. Whether it holds in a specific case depends on the effective APR of the loan against the actual rate on the existing balance, which the debt payoff calculator can help you examine.',
      },
    ],
  },

  'debt-payoff-calculator': {
    slug: 'debt-payoff-calculator',
    longIntro: [
      'When several debts are outstanding at once, the minimum payments are fixed but any additional money is yours to direct. Where you send that extra amount each month determines both how much interest you pay in total and how quickly individual balances disappear. This calculator compares the two standard approaches to that decision.',
      'The avalanche method sends every spare dollar to the debt with the highest interest rate, regardless of its size. Because interest accrues fastest on the highest-rate balance, attacking it first minimises total interest. Arithmetically, avalanche is always at least as cheap as any other ordering.',
      'The snowball method sends the extra payment to the smallest balance first, regardless of rate. This clears individual debts sooner, shortening the list and producing visible progress early. It usually costs somewhat more in interest, and the calculator shows exactly how much more for your own numbers rather than in the abstract.',
      'Both methods share a mechanism that does most of the real work: when a debt is cleared, its minimum payment is not reclaimed for other spending. It is added to the amount attacking the next debt. The payment directed at the remaining balances therefore grows each time one is retired, which is what accelerates the later stages of either strategy.',
    ],
    howItWorks: [
      'The calculator simulates repayment month by month rather than applying a formula, because the allocation of money changes as debts are cleared.',
      'Each month it charges interest on every outstanding balance at one twelfth of that debt annual rate, then applies the minimum payment to each debt.',
      'The extra payment, plus any freed-up minimums from debts already cleared, is directed entirely at the current target. Which debt is the target depends on the strategy: highest rate for avalanche, lowest balance for snowball.',
      'When a balance reaches zero, the calculator records the month it was cleared and the total interest that debt accumulated, then moves to the next target.',
      'It validates the inputs first, rejecting any debt whose minimum payment is smaller than its monthly interest charge, since such a balance would grow rather than shrink and could never be repaid.',
    ],
    formula:
      'Avalanche: Pay minimums on all debts, apply extra to the highest-rate debt first.\nSnowball: Pay minimums on all debts, apply extra to the lowest-balance debt first.',
    formulaExplanation:
      'Neither method has a closed-form solution, because the allocation changes each time a debt is retired. Both are therefore simulated month by month. Monthly interest for each debt is balance × (annual rate ÷ 12). The defining feature of both strategies is that freed-up minimum payments roll forward into the attack on the next debt, so pressure on the remaining balances increases over time.',
    workedExamples: [
      {
        title: 'Example 1 — Avalanche across three debts',
        scenario:
          'Card A $6,500 at 22.99% (min $165) · Card B $2,200 at 17.5% (min $55) · Car loan $9,800 at 6.5% (min $310) · Extra payment $200/month',
        steps: [
          'Total owed = 6,500 + 2,200 + 9,800 = $18,500',
          'Total monthly outlay = 165 + 55 + 310 + 200 = $730',
          'Target order by rate: Card A (22.99%), then Card B (17.5%), then the car loan (6.5%)',
          'Card A cleared in month 22 after $1,526.22 of interest',
          'Card B cleared in month 26 after $679.27 of interest',
          'Car loan cleared in month 30 after $941.37 of interest',
        ],
        result: 'Debt-free in 30 months, total interest $3,146.86, total paid $21,646.86.',
        takeaway:
          'The car loan is the largest balance but carries the lowest rate, so it is addressed last despite being the biggest number on the list. Attacking the 22.99% card first is what keeps the total interest down.',
      },
      {
        title: 'Example 2 — Snowball across the identical debts',
        scenario: 'The same three debts and the same $200 extra payment, ordered by balance instead of rate',
        steps: [
          'Target order by balance: Card B ($2,200), then Card A ($6,500), then the car loan ($9,800)',
          'Card B cleared in month 10 after only $168.71 of interest',
          'Card A cleared in month 27 after $2,239.65 of interest',
          'Car loan cleared in month 30 after $944.76 of interest',
          'Total interest = $3,353.12',
          'Difference against avalanche = 3,353.12 − 3,146.86 = $206.26',
        ],
        result: 'Debt-free in 30 months, total interest $3,353.12, total paid $21,853.12.',
        takeaway:
          'Both strategies finish in the same 30 months here, because the car loan is retired last either way. Snowball costs $206.26 more in interest but clears the first debt in month 10 instead of month 22. That is the trade-off stated concretely: about $206 for sixteen months of having one fewer debt outstanding.',
      },
    ],
    whenToUse: [
      'Use this calculator when you hold more than one debt and have some amount available each month beyond the required minimums.',
      'It is most informative when balances and rates point in different directions — when the largest debt is not the most expensive one, the choice of strategy genuinely matters.',
      'Run both strategies on the same inputs. The interest difference is the price of the psychological benefit, and seeing that number is more useful than any general argument about which method is better.',
    ],
    factors: [
      {
        title: 'The spread between interest rates',
        detail:
          'When rates are similar, the two strategies produce nearly identical results and the ordering barely matters. When one debt carries a much higher rate than the rest, avalanche saves considerably more.',
      },
      {
        title: 'The size of the extra payment',
        detail:
          'This is the most powerful input. Increasing it shortens the timeline disproportionately, because it brings forward the point at which minimum payments begin rolling into the next debt.',
      },
      {
        title: 'Rolling freed-up minimums forward',
        detail:
          'Both strategies depend on redirecting the minimum payment of each cleared debt to the next target. Reclaiming that money for other spending removes most of the advantage of either method.',
      },
      {
        title: 'Whether the debts are revolving',
        detail:
          'The simulation assumes no new charges. Adding to a credit card balance while paying it down extends the timeline in ways the projection cannot capture.',
      },
      {
        title: 'Minimum payments that barely cover interest',
        detail:
          'A minimum close to the monthly interest charge makes almost no progress against principal. The calculator rejects any case where the minimum is below the interest, because that balance never reaches zero.',
      },
    ],
    assumptions: [
      'Minimum payments and interest rates remain constant throughout.',
      'The extra payment is applied consistently every month without interruption.',
      'Freed-up minimum payments from cleared debts are redirected to the next target debt.',
      'No new charges or borrowing are added to any balance.',
      'Interest is charged monthly at one twelfth of the annual rate on the outstanding balance.',
    ],
    commonMistakes: [
      'Stopping extra payments after clearing one debt — redirect the freed payment to the next debt instead.',
      'Not accounting for minimum payments that fail to cover interest on high-rate debts, which leaves the balance growing.',
      'Continuing to spend on a credit card while paying it down, which invalidates the projection.',
      'Choosing a strategy on principle without comparing the actual interest difference for your own balances.',
      'Ranking debts by balance when the rates differ sharply, which can leave the most expensive debt accruing for far longer.',
    ],
    faqs: [
      {
        question: 'Which is better, avalanche or snowball?',
        answer:
          'Avalanche always costs less in interest, because it targets the fastest-accruing balance first. Snowball clears individual debts sooner, which some people find easier to sustain. The calculator quantifies the gap for your specific debts — in the example above it is $206.26 — so you can judge whether the difference outweighs the motivational benefit.',
      },
      {
        question: 'Why do both methods sometimes finish in the same number of months?',
        answer:
          'Because the total monthly outlay is identical under either strategy, and the final debt to be cleared is often the same one regardless of ordering. What changes is how much interest accrues along the way and when each individual debt disappears.',
      },
      {
        question: 'What happens if I miss the extra payment some months?',
        answer:
          'The timeline lengthens and total interest rises. The calculator assumes an uninterrupted extra payment, so an irregular schedule finishes later than projected. Running it with a smaller amount you can reliably sustain often gives a more realistic picture than a larger one you cannot.',
      },
      {
        question: 'Should I pay off debt or save at the same time?',
        answer:
          'That comparison depends on the rate on the debt against the return available on savings, and on how much of a cash buffer you need. This calculator answers only the debt side: it shows what a given extra payment achieves in time and interest saved.',
      },
      {
        question: 'Why does the calculator reject some of my inputs?',
        answer:
          'It checks that each minimum payment exceeds that debt monthly interest charge. If the minimum is smaller, the balance grows every month and can never be repaid, so no valid payoff schedule exists. It also requires every balance and minimum payment to be positive.',
      },
      {
        question: 'Does consolidating the debts change the answer?',
        answer:
          'It can, by replacing several rates with a single one. Whether it helps depends on the consolidated rate and any fees involved. The personal loan calculator shows the effective APR of a consolidation offer, which is the figure to compare against the total interest reported here.',
      },
    ],
  },
};
