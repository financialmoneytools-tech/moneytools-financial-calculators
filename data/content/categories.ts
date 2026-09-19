import type { CategoryContent } from '../registry';

/**
 * Editorial content for the six category landing pages.
 *
 * Each entry introduces the category, explains what every calculator in it does and when
 * that calculator is the right one, and answers questions specific to this group of tools.
 * Every slug in `calculatorGuide` must exist in the registry; a test enforces this.
 *
 * This content is informational. It explains how the calculations work and what they leave
 * out. It is not personalized financial advice.
 */
export const categoryContent: Record<string, CategoryContent> = {
  investment: {
    slug: 'investment',
    longIntro: [
      'Investment calculations fall into two families that are easy to confuse because they share the same underlying mathematics. The first looks forward: given an amount, a rate, and a number of years, what does the arithmetic produce at the end? The second looks backward: given what something cost and what it became, what rate does that imply? Projecting and measuring use the same compounding relationship, but they answer opposite questions, and picking the wrong one is the most common reason a result feels wrong.',
      'The forward tools in this category are the compound interest and investment calculators. Both grow a starting balance and an optional contribution stream at an assumed rate. The difference is emphasis: one lets you vary the compounding schedule and contribution timing, which makes it useful for understanding the mechanics of compounding itself, while the other fixes monthly compounding and adds an inflation adjustment, which makes it better suited to long-horizon planning where purchasing power matters more than nominal balance.',
      'The backward tools are the ROI and CAGR calculators. ROI expresses a gain or loss as a percentage of what was invested, which is the natural framing for a decision or a project with a clear cost. CAGR expresses the same relationship as a smoothed annual rate between two point-in-time values, which is the natural framing for a series that grew over a period. Their annualized outputs are mathematically identical, so the choice between them is about which question you are asking rather than which produces a better number.',
      'The simple interest calculator sits apart from both families, and it exists mainly as a point of contrast. It calculates interest on the original principal only, which produces linear rather than exponential growth. Running the same principal, rate, and term through it and through the compound interest calculator quantifies exactly what compounding is worth in a given situation, which is often more instructive than either result on its own.',
    ],
    calculatorGuide: [
      {
        slug: 'compound-interest-calculator',
        useWhen:
          'You want to see how a balance grows at a fixed rate over time, and you want control over the compounding schedule and whether contributions land at the start or end of each period.',
      },
      {
        slug: 'investment-calculator',
        useWhen:
          'You are projecting a long horizon and want the result expressed in today purchasing power as well as in nominal terms, so inflation does not quietly flatter the outcome.',
      },
      {
        slug: 'roi-calculator',
        useWhen:
          'You know what something cost and what it returned, and you want a percentage. Supply the holding period so the annualized figure can be compared against investments held for different lengths of time.',
      },
      {
        slug: 'cagr-calculator',
        useWhen:
          'You have a starting value, an ending value, and the years between them, and you want the constant annual rate that connects them — useful for smoothing a volatile series into one comparable number.',
      },
      {
        slug: 'simple-interest-calculator',
        useWhen:
          'Interest is genuinely charged on the original principal only, as in some short-term notes and bond coupons, or you want to measure the gap between simple and compound growth.',
      },
    ],
    methodology: [
      'Every forward-looking calculator in this category applies one constant rate for the entire term. Real returns arrive unevenly, so a projection should be read as the arithmetic consequence of the assumptions you entered rather than as a forecast. Running the same scenario across a range of rates and comparing the spread is usually more informative than any single result.',
      'The rate you enter is an input you choose, not a property of any particular investment. None of these calculators retrieve market data, and none of them estimate what a rate should be.',
      'All results are gross. Taxes, management fees, fund expenses, and trading costs are not deducted, and because their drag compounds in the same way growth does, their long-run effect is larger than a single year would suggest. Entering a rate already reduced by the annual cost you expect to pay is a rough way to approximate them.',
      'Only the investment calculator adjusts for inflation. Elsewhere, results are nominal, meaning they describe the number of currency units rather than what those units will buy.',
    ],
    whichCalculator: [
      'Start by deciding whether you are projecting or measuring. If the ending value is unknown and you are estimating it from a rate, you need a forward tool. If the ending value is already known and you are deriving a rate from it, you need a backward tool.',
      'Among the forward tools, choose the investment calculator when the horizon is long enough that inflation materially changes the interpretation, and the compound interest calculator when you want to examine compounding frequency or contribution timing directly.',
      'Among the backward tools, choose ROI when there is a clear cost and a clear return, and CAGR when you are describing how a value moved between two dates. If you need a per-year figure for comparison, both will give you one, and they will agree.',
      'Reach for simple interest only when the arrangement genuinely does not compound, or when you are deliberately measuring the difference that compounding makes.',
    ],
    faqs: [
      {
        question: 'Should I use the compound interest calculator or the investment calculator?',
        answer:
          'Both project growth from a starting balance plus contributions. Use the compound interest calculator when you want to choose the compounding frequency or set whether contributions arrive at the beginning or end of each period. Use the investment calculator for long horizons where you want the result shown in today purchasing power alongside the nominal figure.',
      },
      {
        question: 'Why do two calculators give different results for what looks like the same scenario?',
        answer:
          'Usually because of a difference in compounding frequency, contribution timing, or whether inflation is applied. The compound interest calculator lets you set the frequency; the investment calculator fixes it at monthly and deflates the result by an inflation factor. Matching those settings brings the two into line.',
      },
      {
        question: 'What return rate should I enter?',
        answer:
          'That is a judgement these calculators cannot make for you, and no single figure is correct. Rather than searching for one, enter a conservative rate, a moderate one, and an optimistic one, then look at the range of outcomes. The width of that range tells you how sensitive your plan is to an assumption you cannot control.',
      },
      {
        question: 'Do any of these calculators account for taxes or fees?',
        answer:
          'No. Every result is gross. Depending on the account and jurisdiction, tax may be due annually or deferred, and fees may be charged as a percentage of assets or per transaction. Reducing the rate you enter by the annual cost you expect approximates the drag without modelling it precisely.',
      },
      {
        question: 'What is the difference between ROI and CAGR?',
        answer:
          'Annualized ROI and CAGR are the same calculation with different framing. ROI starts from a cost and a return and suits decisions or projects; CAGR starts from two dated values and suits growth series. Enter equivalent numbers into both and the annualized results will match. Simple ROI, which ignores the holding period entirely, is the figure that differs.',
      },
    ],
  },

  loans: {
    slug: 'loans',
    longIntro: [
      'Borrowing has two costs, and only one of them is visible in the monthly payment. The payment tells you what leaves your account each month. The total interest tells you what the borrowing actually cost, and the two move in opposite directions as the term changes. A longer schedule always produces a more comfortable payment and a larger total, which is why comparing offers on the monthly figure alone reliably favours the more expensive loan.',
      'The calculators in this category all model amortizing debt, where each payment covers the interest that has accrued and reduces the balance by whatever remains. Because interest is charged on the outstanding balance, and that balance falls with every payment, the split inside a fixed payment shifts continuously. Early payments are mostly interest and late payments are almost entirely principal, even though the amount never changes.',
      'Where the three tools differ is in what complicates the basic picture. The loan calculator handles the clean case: one fixed-rate loan, a term in years, no fees. The personal loan calculator handles terms quoted in months and origination fees deducted from the proceeds, which is the structure that makes unsecured lending hard to compare. The debt payoff calculator handles the case where several balances compete for the same limited monthly amount.',
      'That last case is different in kind rather than degree. With one loan the arithmetic is fixed once the terms are agreed. With several, you have a genuine decision each month about where any spare money goes, and that decision changes both the total interest and the order in which individual balances disappear.',
      'One habit makes all three easier to use well: normalise before comparing. Convert every offer to the same term units, fold any fee into an effective rate, and read total interest rather than the monthly payment. Lenders are not obliged to present offers on a common basis, and frequently do not, so two products that appear a fraction of a percentage point apart can differ materially once fees and term length are accounted for. The calculators handle the arithmetic; deciding what to feed them is the part that determines whether a comparison is fair.',
    ],
    calculatorGuide: [
      {
        slug: 'loan-calculator',
        useWhen:
          'You have a single fixed-rate loan quoted in years with no separate fees, and you want the monthly payment plus the total interest over the term. This is the right starting point for car loans and general instalment borrowing.',
      },
      {
        slug: 'personal-loan-calculator',
        useWhen:
          'The term is quoted in months, or an origination fee is deducted before the money reaches you. It converts the stated rate into an effective APR based on what you actually received, which is the only basis on which fee-bearing offers can be compared.',
      },
      {
        slug: 'debt-payoff-calculator',
        useWhen:
          'You hold more than one balance and have some amount available beyond the minimum payments. It compares the avalanche and snowball orderings on your own numbers and shows what each costs in interest and time.',
      },
    ],
    methodology: [
      'All three calculators charge interest monthly on the outstanding balance at one twelfth of the annual rate. This matches how most consumer lending is actually administered, though some agreements use day-count conventions that produce small differences on partial periods.',
      'Rates are treated as fixed for the entire term. Variable-rate borrowing cannot be modelled directly, though running the calculation at several rates shows the range of outcomes a rate change would produce.',
      'The loan and debt payoff calculators work from the interest rate alone and do not model fees. Only the personal loan calculator incorporates a fee, and it does so by treating the origination charge as deducted from the proceeds while payments are still calculated on the full face amount.',
      'Every payment is assumed to be made on time and in full. Late fees, penalty rates, payment holidays, and prepayment penalties are outside what these calculators model, and any of them will move a real outcome away from the projection.',
    ],
    whichCalculator: [
      'Count your debts first. If there is more than one and you have spare capacity each month, the debt payoff calculator answers a question the other two cannot: where the extra money should go.',
      'For a single loan, the deciding factor is whether a fee is involved. If the lender deducts an origination charge, the stated rate understates the cost, and the personal loan calculator is the only one here that corrects for it.',
      'If there is no fee, the choice is simply how the term is quoted. Years point to the loan calculator; months point to the personal loan calculator with the fee set to zero, which makes the effective APR equal the stated rate.',
      'To model paying extra against a single loan, use the mortgage amortization calculator in the mortgage category. It applies to any amortizing balance, not only to property loans, and it reports the months and interest saved.',
    ],
    faqs: [
      {
        question: 'Why should I compare total interest rather than the monthly payment?',
        answer:
          'Because a longer term lowers the payment and raises the total, so the cheapest-looking monthly figure often belongs to the most expensive loan. The payment tells you what you can afford each month; total interest tells you what the borrowing cost. Both matter, but only the second answers whether one offer is better than another.',
      },
      {
        question: 'What is the difference between the interest rate and the APR?',
        answer:
          'The interest rate determines the payment. The APR is broader and incorporates certain fees, so it reflects the cost of borrowing more completely. When two lenders quote the same rate but different APRs, the gap is fees. The personal loan calculator shows this directly by deriving an effective APR from the amount you actually receive.',
      },
      {
        question: 'How much does an origination fee really change things?',
        answer:
          'More than the percentage suggests, because the fee is deducted from the proceeds while interest is charged on the full amount. The effect is largest on short terms, where fewer payments absorb it. A loan with a lower stated rate and a high fee can easily cost more than one with a higher rate and none.',
      },
      {
        question: 'Is the avalanche or the snowball method better?',
        answer:
          'Avalanche always costs less in interest, because it targets the highest-rate balance first. Snowball clears individual debts sooner, which some people find easier to sustain. Rather than choosing on principle, run both in the debt payoff calculator: the interest difference on your own balances is the actual price of the psychological benefit.',
      },
      {
        question: 'Can these calculators model extra payments?',
        answer:
          'The debt payoff calculator has an extra payment field for multiple debts. For a single loan, the loan and personal loan calculators model the scheduled term only. Use the mortgage amortization calculator instead, which applies extra payments directly to principal and reports the resulting time and interest saved.',
      },
    ],
  },

  mortgage: {
    slug: 'mortgage',
    longIntro: [
      'A mortgage differs from other borrowing in three ways that change how it should be analysed. The term is long enough that small rate differences compound into very large totals. The monthly obligation includes costs that have nothing to do with the loan. And the size of the deposit determines not just how much is borrowed but whether an additional insurance cost applies at all.',
      'The consequence of the first point is that a thirty-year horizon magnifies everything. Interest accrues on a substantial balance for 360 months, and because the balance falls slowly in the early years, the total interest on a long mortgage frequently exceeds the amount originally borrowed. Shortening the term or increasing the deposit both attack this, and the calculators here let you see by how much rather than guess.',
      'The second point is the one most often missed when budgeting. Property tax and home insurance are ongoing costs of owning the property, not of borrowing against it, and they continue after the loan is repaid. Mortgage insurance is different again: it protects the lender rather than the owner, applies only while equity is below a threshold, and builds nothing. Treating the principal and interest figure as the cost of ownership understates the monthly reality, usually by several hundred.',
      'The two calculators in this category address different moments. One is for before you buy, when the question is what a purchase would cost each month in total. The other is for a loan that already exists, when the question is how the balance is being retired and what paying extra would achieve. They share the same amortization mathematics but answer questions that arrive years apart.',
      'A fourth point is worth holding alongside the other three, and it concerns equity rather than cost. Because early payments are dominated by interest, ownership accumulates slowly at first: several years into a long mortgage, the share of the property owned outright can be considerably smaller than the share of payments already made. This is not a defect in the loan but a direct consequence of charging interest on an outstanding balance, and it is the clearest reason to read an amortization schedule rather than assume progress is linear.',
    ],
    calculatorGuide: [
      {
        slug: 'mortgage-calculator',
        useWhen:
          'You are evaluating a purchase and need the full monthly obligation — principal, interest, property tax, insurance, and mortgage insurance — rather than the loan payment alone. It is also the tool for testing how a different deposit percentage changes both the payment and the lifetime interest.',
      },
      {
        slug: 'mortgage-amortization-calculator',
        useWhen:
          'You already hold a loan and want to see how each payment splits between interest and principal, or you are considering paying extra and want the months and interest that would save quantified before committing.',
      },
    ],
    methodology: [
      'Both calculators use the standard amortization formula, converting the annual rate to monthly and the term to a number of months, then charging interest on the outstanding balance each month.',
      'The mortgage calculator treats property tax and insurance as annual figures divided evenly across twelve months, and applies any mortgage insurance you enter as a fixed monthly amount for the whole term. In practice tax and insurance usually rise over time, and mortgage insurance usually stops once sufficient equity has accumulated, so a long projection will drift from reality in both directions.',
      'Neither calculator includes closing costs, homeowners association dues, maintenance, or utilities. These are real and substantial, and a budget built from the calculated payment alone will fall short.',
      'The amortization calculator applies extra payments directly to principal and trims the final payment to clear exactly the balance that remains. Whether a real lender does the same is worth confirming, because some hold extra amounts against the next instalment instead, which produces no interest saving.',
    ],
    whichCalculator: [
      'The distinction here is simply whether the loan exists yet. Before a purchase, you are estimating a monthly obligation from a price and a deposit, which is what the mortgage calculator does.',
      'After a loan is in place, the price and deposit are settled and the open question is what to do with the balance. That is the amortization calculator, which shows the interest and principal split over time and prices the effect of prepayment.',
      'Use both together when comparing terms. The mortgage calculator shows what a fifteen-year and a thirty-year term do to the monthly payment; the amortization calculator shows what paying extra on the thirty-year term would achieve, which is sometimes a more flexible route to the same outcome.',
      'For borrowing not secured on property, the loan and personal loan calculators in the loans category are the appropriate tools, since neither tax, insurance, nor mortgage insurance applies.',
    ],
    faqs: [
      {
        question: 'What should I include when working out a monthly housing budget?',
        answer:
          'The mortgage calculator covers principal, interest, property tax, insurance, and mortgage insurance. To that you should add anything it does not model: homeowners association dues, maintenance, utilities, and a reserve for repairs. Closing costs are separate again and are paid at purchase rather than monthly.',
      },
      {
        question: 'Why does a larger deposit help more than the reduction in principal suggests?',
        answer:
          'Because it acts on three things at once. It lowers the amount borrowed, it lowers the interest charged on that amount across hundreds of months, and crossing the conventional twenty percent threshold typically removes mortgage insurance entirely. The combined effect is larger than the reduction in the loan balance alone.',
      },
      {
        question: 'Should I take a shorter term or make extra payments on a longer one?',
        answer:
          'A shorter term locks in a higher payment and lower total interest. Extra payments on a longer term achieve a similar result while leaving you free to stop in a difficult month. Running both through these two calculators shows the difference in cost, which is usually modest compared with the difference in flexibility.',
      },
      {
        question: 'Does mortgage insurance ever stop?',
        answer:
          'Generally once the balance falls to a sufficient share of the property value, though the rule depends on the loan type and lender. The mortgage calculator applies the monthly amount you enter for the entire term, so it will overstate the long-run cost if your policy ends earlier.',
      },
      {
        question: 'Why is total interest sometimes larger than the amount borrowed?',
        answer:
          'Because interest accrues every month on a balance that falls slowly at first. Over 360 months at a typical rate, the accumulated interest on a long mortgage can exceed the original loan. This is a property of the term length rather than a sign of an unusual rate, and it is the clearest argument for testing shorter terms and prepayment.',
      },
    ],
  },

  savings: {
    slug: 'savings',
    longIntro: [
      'Saving is arithmetically simpler than investing, and the calculators here reflect that. Rates on deposit accounts are known rather than assumed, terms are usually shorter, and the outcome depends far more on what you contribute than on what the account pays. Over most realistic savings horizons, the deposits do the overwhelming majority of the work, and interest is a modest addition rather than the engine.',
      'This is worth stating plainly because it is often experienced as disappointment. Someone saving diligently for five years at a competitive rate may find that interest accounts for a small fraction of the ending balance and conclude the account is underperforming. It is not. That ratio is simply what a short horizon produces, and recognising it redirects attention to the contribution, which is the input actually under your control.',
      'The four calculators in this category approach the same relationship from different directions. Two run forward from what you deposit to what you end up with, differing in how flexible the payment schedule is. One runs backward from a target to the monthly amount required to reach it. The fourth does not project balances at all; it converts between the two ways account rates are quoted, so that offers can be compared on a consistent basis before any projection is run.',
      'That last one is more useful than it sounds. Deposit accounts commonly advertise an annual percentage yield, which already includes compounding, while the projection calculators expect a nominal rate and apply compounding themselves. Entering the wrong one counts compounding twice, and while the error is small, it is systematic and easy to avoid.',
      'It is also worth being clear about how this category differs from the investment tools elsewhere on the site. A deposit rate is a published figure you can verify, even when it is variable, whereas an investment return is an assumption you supply and cannot confirm in advance. That difference changes how much confidence a projection deserves. A savings projection is largely arithmetic on known quantities; an investment projection is arithmetic on a judgement. Both are useful, but they should not be read with the same degree of certainty.',
    ],
    calculatorGuide: [
      {
        slug: 'savings-calculator',
        useWhen:
          'You know what you can deposit each month and want to see where that leaves you. It reports the balance alongside the split between what you deposited and what interest added, which is the more revealing of the two figures.',
      },
      {
        slug: 'savings-goal-calculator',
        useWhen:
          'You know the amount you need and the date you need it by, and you want the monthly contribution that gets you there. It accounts for existing savings compounding on their own toward the target.',
      },
      {
        slug: 'apy-calculator',
        useWhen:
          'You are comparing accounts quoted with different compounding frequencies, or you need to convert an advertised yield back into a nominal rate before entering it into another calculator.',
      },
      {
        slug: 'future-value-calculator',
        useWhen:
          'Your contributions are not monthly, or the timing within each period matters. It handles annual, quarterly, and other schedules, and lets you set whether payments land at the start or end of the period.',
      },
    ],
    methodology: [
      'The savings and savings goal calculators compound monthly and expect a nominal annual rate, which they divide by twelve. If your account advertises an annual percentage yield, convert it back to a nominal rate with the APY calculator first, or compounding is applied twice.',
      'The future value calculator ties the compounding schedule to the payment schedule you choose, so quarterly payments compound quarterly. This differs from the other two and is the reason to use it when contributions are not monthly.',
      'All projections assume the rate holds for the entire term. Most deposit account rates are variable and can change at any time, so a projection is best read as one scenario among several rather than as a commitment.',
      'Results are gross of tax. Interest on savings is taxable in many jurisdictions, and where it is taxed as earned, the effective growth is lower than shown. Entering a rate reduced by the expected tax drag approximates this.',
      'No calculator here models withdrawals. Taking money out removes both the amount and all the growth it would have produced for the rest of the term.',
    ],
    whichCalculator: [
      'The first question is which side of the relationship you already know. If you know the monthly deposit and want the ending balance, use the savings calculator. If you know the ending balance you need and want the monthly deposit, use the savings goal calculator. They are the same mathematics solved for different unknowns.',
      'If your contributions do not arrive monthly, neither of those fits cleanly, and the future value calculator is the general-purpose alternative that handles any common frequency.',
      'The APY calculator is a step you take before the others rather than an alternative to them. Use it to put competing account rates on a comparable footing, and to translate an advertised yield into the nominal rate the projection calculators expect.',
      'For horizons long enough that purchasing power matters, the investment calculator in the investment category adds an inflation adjustment that none of the savings tools apply.',
    ],
    faqs: [
      {
        question: 'Should I enter the APR or the APY?',
        answer:
          'The savings, savings goal, and future value calculators all apply compounding themselves, so they expect a nominal annual rate. An advertised annual percentage yield already includes compounding. Use the APY calculator to convert the yield back to a nominal rate first, otherwise the projection overstates the result slightly.',
      },
      {
        question: 'Why is my interest so small compared with what I deposited?',
        answer:
          'Because interest is a percentage of the balance, and the balance only reaches full size at the end. Over a five-year horizon at a typical deposit rate, interest commonly accounts for around a tenth of the ending total. This is normal, and the interest share rises substantially as the term lengthens.',
      },
      {
        question: 'How do I work out what to save for a specific target?',
        answer:
          'Use the savings goal calculator, which solves for the monthly amount directly. If the figure it returns is uncomfortable, extend the timeline before raising the assumed rate — extending reduces the requirement faster than proportionally, while a higher rate lowers it only by shifting risk to the deadline.',
      },
      {
        question: 'What if I contribute quarterly or every two weeks instead of monthly?',
        answer:
          'Use the future value calculator, which lets you set the payment frequency and applies compounding on the same schedule. When comparing frequencies, remember the payment amount is per period, so adjust it to keep the annual total constant or the comparison measures the wrong thing.',
      },
      {
        question: 'Do these calculators account for inflation?',
        answer:
          'No. Every result is nominal, describing currency units rather than what they will buy. For horizons where this matters, the investment calculator reports an inflation-adjusted figure alongside the nominal one, and the same adjustment can be applied manually by dividing by one plus the inflation rate raised to the number of years.',
      },
    ],
  },

  business: {
    slug: 'business',
    longIntro: [
      'The calculators in this category answer questions that sit at different points in a business, and the thread connecting them is that each one hinges on a denominator or a cost that is easy to get wrong. Pricing, profitability, volume planning, and marketing efficiency all produce percentages, and in every case the percentage is only meaningful once you know precisely what it was divided by.',
      'Pricing is where this bites first. Markup and margin describe the same profit on the same sale, but markup divides by cost while margin divides by selling price. Because the selling price is always larger, margin is always the smaller number, and applying a margin target as a markup underprices every unit sold. The error is invisible in daily figures and shows up only as a thinner year.',
      'Profitability and volume planning depend on classifying costs correctly rather than on any difficult arithmetic. Splitting costs into direct and indirect determines where a margin problem appears to originate, and splitting them into fixed and variable determines the volume at which a business stops losing money. Neither split changes the total cost; both change what the resulting numbers mean.',
      'Marketing efficiency is where the denominator problem is most expensive, because the standard metric excludes the cost of delivering what was sold. Return on ad spend compares revenue against spend and says nothing about margin, which means the same ratio can describe a strongly profitable campaign and a loss-making one. Lifetime value analysis extends the view across the whole customer relationship, where the equivalent trap is using revenue in place of gross profit.',
      'One limitation applies across all five. Each calculator works from figures you supply, and the usefulness of the output depends entirely on how carefully those figures were assembled. A cost of goods figure that omits freight, a marketing spend that excludes agency fees, or a churn rate averaged across channels that behave very differently will each produce a confident-looking number that misleads. The arithmetic is not the demanding part of any of these calculations; deciding what belongs in each input is where the judgement sits.',
    ],
    calculatorGuide: [
      {
        slug: 'profit-margin-calculator',
        useWhen:
          'You are looking at a completed period and want gross, operating, and net margin together. The gaps between the three localise where revenue is going, which a single profit figure cannot show.',
      },
      {
        slug: 'markup-calculator',
        useWhen:
          'You are setting a price from a unit cost, or reconciling a markup someone quoted against the margin your accounts report. It converts between the two in either direction.',
      },
      {
        slug: 'break-even-calculator',
        useWhen:
          'You need the sales volume at which revenue covers total cost, or the volume required to hit a profit target. It is the natural check before committing to a fixed cost such as a lease or a hire.',
      },
      {
        slug: 'roas-calculator',
        useWhen:
          'You are judging a campaign and need its return read against the break-even ratio your gross margin sets, rather than against a general benchmark that ignores your cost structure.',
      },
      {
        slug: 'ltv-cac-calculator',
        useWhen:
          'Customers buy more than once and a single campaign view understates acquisition. It compares gross profit over the whole relationship against the cost of winning the customer, and reports the payback period.',
      },
    ],
    methodology: [
      'Margins in the profit margin calculator all divide by revenue, which is what makes the three percentages comparable to each other. The markup calculator divides by cost instead, and this difference in denominator is the source of most pricing confusion rather than any disagreement about the underlying profit.',
      'The break-even calculator requires price to exceed variable cost per unit. Where it does not, each sale loses money and no volume produces break-even, so the calculation is rejected rather than returning a misleading figure.',
      'Break-even ROAS is derived as the reciprocal of gross margin. This makes it entirely dependent on a figure you supply, which is why the same ROAS can be profitable for one business and a loss for another.',
      'Lifetime value is built from gross profit rather than revenue, and divides by the annual churn rate because the reciprocal of churn is the expected relationship length in years. Substituting revenue for gross profit overstates the result by exactly the proportion that costs represent.',
      'Every calculator here works from figures you enter for a single period or a single product. None of them allocate shared overhead across product lines, which is a judgement call that different methods answer differently.',
    ],
    whichCalculator: [
      'Work from the decision rather than the metric. If you are setting a price, start with the markup calculator. If you are reviewing a period that has already happened, start with the profit margin calculator.',
      'If the question is about volume — whether a product can cover its fixed costs, or how many units a profit target requires — the break-even calculator is the only tool here that answers it.',
      'For marketing, the deciding factor is whether customers return. A single campaign judged on its first transaction belongs to the ROAS calculator. A business where the same customer buys repeatedly belongs to the LTV:CAC calculator, which will often justify acquisition spending that looks unprofitable on the first sale alone.',
      'These tools are complementary rather than alternatives. A gross margin taken from the profit margin calculator is the input that makes both the break-even and the ROAS calculations meaningful, so running that one first tends to improve the others.',
    ],
    faqs: [
      {
        question: 'What is the practical difference between markup and margin?',
        answer:
          'Both describe the same profit on the same sale, but markup divides it by cost and margin divides it by selling price. Markup is therefore always the larger number. The practical consequence is that applying a margin target as a markup underprices every unit, and the shortfall repeats on every transaction without appearing anywhere in the daily numbers.',
      },
      {
        question: 'What is a good profit margin?',
        answer:
          'There is no figure that holds across industries, and any quoted as universal should be treated carefully. Margins are structural: businesses with low direct costs usually carry high fixed costs, and the reverse. The informative comparisons are against your own earlier periods and against businesses with a similar cost structure.',
      },
      {
        question: 'Why can a campaign with a good ROAS still lose money?',
        answer:
          'Because ROAS compares revenue against spend and ignores what delivering that revenue cost. The threshold that matters is break-even ROAS, which is one divided by your gross margin. A business at a low margin can need a ratio several times higher than one at a high margin simply to avoid a loss, so the same ROAS means different things in each.',
      },
      {
        question: 'How do I use the break-even calculator when I sell several products?',
        answer:
          'Either analyse each product line separately with its own share of fixed costs, or use a weighted average contribution margin across your sales mix. The second is quicker but only holds while the mix stays roughly constant, so it is worth re-running when the mix shifts.',
      },
      {
        question: 'Should lifetime value be based on revenue or gross profit?',
        answer:
          'Gross profit, always. Revenue includes the cost of delivering the product, which is money the business never keeps. Using revenue inflates lifetime value by exactly the proportion those costs represent, which can make acquisition spending that destroys value appear sustainable.',
      },
    ],
  },

  salary: {
    slug: 'salary',
    longIntro: [
      'Compensation is quoted in whatever unit suits the arrangement. Shift and contract work is priced by the hour, professional roles are advertised as an annual figure, and payroll may run weekly, fortnightly, twice a month, or monthly. These are all descriptions of the same underlying rate, but they cannot be compared until they are expressed on a common basis, and the conversion depends on assumptions that are usually left unstated.',
      'Two assumptions do most of the work. How many hours constitute a working week, and how many weeks are actually paid in a year? A role at 37.5 hours is not equivalent to one at 40, and contract work with unpaid gaps is not equivalent to salaried employment where leave is paid. Changing either figure changes every hourly and daily equivalent derived from it, sometimes by several currency units an hour, without the headline salary moving at all.',
      'A third distinction causes recurring trouble at exactly the moment it matters, which is when someone builds a monthly budget. Being paid every two weeks produces 26 payments a year. Being paid twice a month produces 24. The annual total is identical, but each individual payment differs by roughly eight percent, and a bi-weekly schedule delivers two months each year containing three paydays rather than two. Budgeting from the wrong assumption leaves a predictable gap.',
      'This category contains a single calculator because one conversion engine answers all of these questions. Enter a figure in any pay period and it returns every other, holding your hours and weeks assumptions constant so the comparison stays internally consistent. Every figure it produces is gross, before tax and deductions, which is a deliberate limitation rather than an omission: take-home pay depends on jurisdiction and personal circumstances that a general converter cannot model.',
      'Because of that boundary, the converter is best treated as the first step in a comparison rather than the whole of it. Putting two offers on the same gross footing is necessary and often revealing. What it cannot do is account for the tax treatment of each arrangement, the value of benefits attached to one and not the other, or the difference in security between employment and contract work. Those belong to the same decision but require information the calculator does not hold.',
    ],
    calculatorGuide: [
      {
        slug: 'salary-calculator',
        useWhen:
          'You need to compare offers quoted in different units, translate a target annual income into the hourly rate a contract would need to reach it, or reconcile a bi-weekly payslip against a monthly budget. Set hours per week and weeks per year to match the actual arrangement before reading any derived figure.',
        details: [
          'Enter a figure in any one pay period and the calculator returns all seven: hourly, daily, weekly, bi-weekly, semi-monthly, monthly, and annual. Each is derived from a single annual equivalent rather than from the figure next to it, so you can enter a contract hourly rate and read a monthly number, or enter an advertised salary and read the hourly rate it implies, without converting anything by hand.',
          'Annual and monthly are the planning figures. Annual is how most roles are advertised and how offers are usually compared. Monthly is always the annual figure divided by twelve, whatever your actual pay schedule, which makes it the natural basis for budgeting against rent, subscriptions, and other monthly commitments. It also means the monthly figure may not match any deposit that ever reaches your account, which is a feature of the comparison rather than an error.',
          'Weekly, bi-weekly, and semi-monthly are the payroll figures, and they are where pay frequency becomes visible. Dividing the same annual compensation into more payments produces smaller individual payments, not a different total. On a 52-week setting, weekly pay arrives 52 times a year, bi-weekly 26 times, and semi-monthly 24 times. Bi-weekly and semi-monthly are the pair most often confused, because the names sound alike and the amounts land close together, yet those two extra payments a year make each bi-weekly amount noticeably smaller than a semi-monthly one drawn from the same salary.',
          'The hourly equivalent answers a different question: what is one hour of this role worth? It depends entirely on the hours per week and weeks per year you set, so it is only meaningful when both match the real arrangement. It is the figure to use when weighing a contract rate against a salaried offer, when a role is part-time, or when you want a baseline for judging whether regular unpaid extra hours are materially changing what you earn per hour.',
          'Every figure here is gross, meaning the amount before income tax, social contributions, pension deductions, and anything else withheld. What is deducted depends on jurisdiction, filing circumstances, and elections that differ between individuals, so no general converter can turn a gross figure into a dependable net one. Use these numbers to put arrangements on a consistent footing, and use an actual payslip or a jurisdiction-specific tool when you need the amount that will arrive in your account.',
          'In practice the conversions cover five recurring situations: comparing job offers quoted in different units, comparing what two pay frequencies do to the size of each payment, converting an advertised annual salary into the hourly rate it implies, building a monthly budget when pay does not arrive monthly, and working out how many payments a year a schedule produces so that months carrying an extra payday are planned for rather than discovered.',
        ],
      },
    ],
    methodology: [
      'Every conversion is routed through an annual equivalent. Whatever period you enter is converted to an annual figure first, and all other periods are derived from it, which keeps the outputs internally consistent regardless of which field you started from.',
      'Hours per year is hours per week multiplied by weeks per year, and this product links hourly rates to all period-based figures. Hourly, daily, weekly, and fortnightly figures all depend on it.',
      'Semi-monthly is always the annual figure divided by 24 and monthly is always divided by 12, because both are defined by calendar months. Neither is affected by the weeks-per-year setting, which is why they can diverge from the fortnightly figure.',
      'The daily rate assumes eight-hour days, deriving working days per week as hours per week divided by eight. At 40 hours this gives a clean five-day week; at other settings it produces a fractional number of days, which should be read as a mathematical equivalent rather than a real schedule.',
      'All output is gross. No income tax, social contribution, pension deduction, overtime, bonus, or benefit value is included, and the gap between gross and net varies too widely by jurisdiction to generalise.',
    ],
    whichCalculator: [
      'This category has one calculator, so the question is not which tool to use but how to set it up for the question you are asking. The two assumption fields change the answer more than anything else.',
      'When comparing a contract rate against a salaried offer, set weeks per year to the number you realistically expect to bill rather than 52. Unpaid gaps between contracts are part of the economics, and using 52 systematically flatters the contract.',
      'When converting a salary to an hourly equivalent, use the hours actually worked rather than a nominal figure. The same annual salary produces meaningfully different hourly rates at 1,875 hours and 2,080, and that difference is often the real distinction between two roles.',
      'When reconciling a payslip, check whether the schedule is fortnightly or semi-monthly before comparing against a monthly budget. The two produce different payment amounts from the same annual salary, and the difference is large enough to matter.',
      'A salary figure is not a complete comparison. Health coverage, retirement contributions, paid leave, and equity can be worth a substantial share of total compensation and appear nowhere in these conversions.',
    ],
    faqs: [
      {
        question: 'What is the difference between fortnightly and semi-monthly pay?',
        answer:
          'Fortnightly means every two weeks, producing 26 payments a year. Semi-monthly means twice a month, producing 24. The annual total is the same but each payment differs by roughly eight percent, and a fortnightly schedule delivers two months each year with three paydays. Budgeting monthly on a fortnightly schedule needs to account for that.',
      },
      {
        question: 'Should I use 52 weeks or fewer?',
        answer:
          'Use 52 for salaried employment where leave is paid, since you are paid for every week regardless of whether you work it. For contract or freelance work, enter the number of weeks you realistically expect to bill. Unpaid gaps materially change the hourly equivalent, and ignoring them overstates what the arrangement is worth.',
      },
      {
        question: 'Does this show my take-home pay?',
        answer:
          'No. Every figure is gross, before income tax, social contributions, and any other deductions. Take-home depends on jurisdiction, filing circumstances, and benefit elections, none of which a general conversion tool can model. Treat the output as the basis for comparison, not as what will arrive in your account.',
      },
      {
        question: 'How do I compare a contract rate against a salaried offer fairly?',
        answer:
          'Convert the contract rate using the weeks you expect to actually bill, then add an allowance for what the salaried role provides and the contract does not — health coverage, retirement contributions, and paid leave. Comparing headline rates alone consistently favours the contract, because it ignores both unpaid time and benefits.',
      },
      {
        question: 'Why does changing hours per week change the hourly rate so much?',
        answer:
          'Because the annual figure is divided by hours per year, and that total shifts proportionally. A given salary spread across 1,875 hours produces a noticeably higher hourly rate than the same salary across 2,080. Nothing about the compensation changed; only the number of hours it is spread across did.',
      },
    ],
  },
};
