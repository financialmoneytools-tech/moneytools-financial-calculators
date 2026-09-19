import type { CalculatorContent } from '../registry';

/**
 * Educational content for the savings calculators.
 * See data/calculator-content.ts for how these modules are assembled.
 */
export const savingsContent: Record<string, CalculatorContent> = {
  'savings-calculator': {
    slug: 'savings-calculator',
    longIntro: [
      'A savings projection answers a question with three moving parts: what you start with, what you add each month, and what the account pays. The ending balance depends on all three, but not equally, and the balance between them shifts as the time horizon lengthens.',
      'Over short periods, the arithmetic is dominated by deposits. An account earning 4% on a few thousand dollars generates a modest amount of interest, and most of the ending balance is simply money you put there. This is not a shortcoming of the account; it is what short horizons look like, and expecting otherwise leads to disappointment with perfectly reasonable savings vehicles.',
      'The value of running the projection is in separating those two contributions explicitly. The calculator reports total deposited alongside total interest, which makes it immediately clear whether a given plan is working because of the rate or because of the discipline. For most realistic savings horizons, the answer is the discipline, and knowing that redirects attention to the input you actually control.',
    ],
    howItWorks: [
      'The calculator advances one month at a time across the full term. Each month it multiplies the running balance by the monthly rate factor, then adds the monthly contribution.',
      'The monthly rate is the annual rate divided by twelve, so a 4.25% annual rate applies approximately 0.354% each month. Because the balance grows before the deposit is added, each contribution begins earning from the following month.',
      'Total deposited accumulates the initial deposit plus every monthly contribution, and total interest is the ending balance minus that figure. This split is the most informative output for most savings plans.',
      'A year-by-year breakdown records the balance, the running total deposited, and the cumulative interest at each anniversary, which shows how slowly the interest share grows in the early years.',
      'A zero rate is handled directly by simply accumulating the deposits, so the calculator can also be used to project pure saving with no return at all.',
    ],
    formula: 'FV = PV(1+r)^n + PMT × [(1+r)^n - 1] / r',
    formulaExplanation:
      'PV is the initial deposit, PMT is the monthly contribution, r is the monthly rate (annual rate ÷ 12), and n is the number of months. The first term grows the opening deposit for the full term. The second term is the future value of an ordinary annuity: each contribution compounds only for the months remaining after it arrives, which is why the earliest deposits contribute disproportionately to the ending balance.',
    workedExamples: [
      {
        title: 'Example 1 — Regular monthly saving over five years',
        scenario: 'Initial deposit $2,000 · $400 per month · 4.25% annual rate · 5 years',
        steps: [
          'Monthly rate = 4.25% ÷ 12 ≈ 0.3542%',
          'Months = 5 × 12 = 60',
          'Total deposited = 2,000 + (400 × 60) = $26,000',
          'Opening deposit grows to 2,000 × (1.003542)^60 ≈ $2,473',
          'Contribution stream grows to approximately $26,688',
          'Ending balance ≈ $29,160.82',
        ],
        result: 'Final balance $29,160.82, total deposited $26,000, total interest $3,160.82.',
        takeaway:
          'Interest represents about 12% of the ending balance. Nearly 89% of what is in the account is money that was deposited into it. Over a five-year horizon at this rate, the contribution is doing the overwhelming majority of the work.',
      },
      {
        title: 'Example 2 — A lump sum with no further deposits',
        scenario: 'Initial deposit $10,000 · No monthly contribution · 4.5% annual rate · 3 years',
        steps: [
          'Monthly rate = 4.5% ÷ 12 = 0.375%',
          'Months = 3 × 12 = 36',
          '(1.00375)^36 ≈ 1.144248',
          'Ending balance = 10,000 × 1.144248 ≈ $11,442.48',
          'Total deposited = $10,000',
          'Total interest = 11,442.48 − 10,000 = $1,442.48',
        ],
        result: 'Final balance $11,442.48, total deposited $10,000, total interest $1,442.48.',
        takeaway:
          'A 4.5% annual rate compounded monthly produces about 14.4% total growth over three years, not 13.5%. The extra comes from compounding. Note too that the entire gain here is interest, since nothing was added — a useful contrast with the first example.',
      },
    ],
    whenToUse: [
      'Use this calculator for deposit accounts with a reasonably stable rate — savings accounts, money market accounts, and similar vehicles where you contribute regularly.',
      'It is well suited to answering whether a given monthly amount reaches a target in a given time, and to seeing how much of a projected balance is your own money rather than growth.',
      'If you already know the target and want to solve for the monthly amount required, use the savings goal calculator, which inverts this calculation. If the rate is quoted as an APY with a specific compounding frequency, the APY calculator converts between the two.',
    ],
    factors: [
      {
        title: 'The monthly contribution',
        detail:
          'For most realistic savings horizons this matters more than the rate. Raising a monthly deposit by a modest amount usually changes the ending balance more than finding an account paying half a point more.',
      },
      {
        title: 'The rate, and how it is quoted',
        detail:
          'Deposit rates are often advertised as APY, which already includes compounding. Entering an APY here, where the calculator applies monthly compounding to the figure you give, slightly overstates the result.',
      },
      {
        title: 'Rate variability',
        detail:
          'Most savings account rates are variable and can change at any time. The projection applies one fixed rate for the whole term, so it should be read as a scenario rather than a commitment.',
      },
      {
        title: 'Inflation',
        detail:
          'A balance that grows in nominal terms may lose purchasing power if prices rise faster than the rate paid. The investment calculator includes an inflation adjustment if you want to see that effect explicitly.',
      },
      {
        title: 'Access and withdrawals',
        detail:
          'The projection assumes nothing is withdrawn. Every withdrawal removes both the money and all the growth it would have generated for the rest of the term.',
      },
    ],
    assumptions: [
      'The rate is constant and compounds monthly.',
      'Deposits are made consistently at the end of each month.',
      'No withdrawals, taxes, or fees are applied.',
      'The initial deposit is available from the first month.',
      'The annual rate entered is a nominal rate, not an already-compounded APY.',
    ],
    commonMistakes: [
      'Overestimating the savings rate — use the actual rate your account pays rather than an advertised promotional figure.',
      'Not accounting for the effect of inflation on purchasing power over longer horizons.',
      'Entering an APY as though it were a nominal annual rate, which double-counts compounding.',
      'Expecting interest to dominate the ending balance over a short term, when contributions almost always do.',
      'Assuming a variable rate will hold for the entire projected period.',
    ],
    faqs: [
      {
        question: 'Why is my interest so small compared with what I deposited?',
        answer:
          'Because interest is a percentage of the balance, and the balance only reaches its full size at the end. In the five-year example above, interest is $3,160.82 against $26,000 deposited — about 12% of the ending total. This is normal for short horizons, and the interest share grows substantially as the term lengthens.',
      },
      {
        question: 'Should I enter the APR or the APY?',
        answer:
          'This calculator compounds monthly, so it expects a nominal annual rate. If your account advertises an APY, that figure already includes compounding, and entering it directly will overstate the result slightly. The APY calculator can convert an APY back to the equivalent nominal rate.',
      },
      {
        question: 'What happens if the rate changes partway through?',
        answer:
          'The projection cannot model that directly, since it applies a single rate for the whole term. A reasonable approach is to run it once at the current rate and again at a lower one to see the range. For variable-rate accounts the spread between those two results is more informative than either number alone.',
      },
      {
        question: 'How is this different from the compound interest calculator?',
        answer:
          'The compound interest calculator lets you choose the compounding frequency and the contribution timing, which makes it better for exploring the mechanics of compounding. This one fixes monthly compounding and end-of-month deposits, matching how most deposit accounts actually work.',
      },
      {
        question: 'Does the calculator account for tax on interest?',
        answer:
          'No. Interest on savings is taxable in many jurisdictions, and the projection shows the gross figure. If interest is taxed annually at a known rate, entering a reduced annual rate approximates the after-tax outcome.',
      },
      {
        question: 'Is it better to deposit a lump sum or contribute monthly?',
        answer:
          'For the same total amount, earlier money always earns more, so a lump sum at the start beats the same total spread across the term. In practice the choice is rarely available — most people save from income as it arrives, which is what the monthly contribution field models.',
      },
    ],
  },

  'savings-goal-calculator': {
    slug: 'savings-goal-calculator',
    longIntro: [
      'Most savings calculators run forward: given what you deposit, what will you end up with? This one runs backward. You specify the amount you need and the date you need it by, and it solves for the monthly contribution that gets you there. That inversion is what makes it useful for planning rather than projecting.',
      'The calculation has to account for two sources of money working toward the target simultaneously. Anything you have already saved keeps growing on its own for the whole period, so it covers part of the goal without further effort. The required monthly contribution only has to close whatever gap remains after that existing balance has compounded.',
      'This is why current savings reduce the required monthly amount by more than their face value. A balance of $5,000 sitting for four years at 4% does not offset $5,000 of the goal — it offsets roughly $5,867, because it grows while it waits. The calculator handles this by first projecting existing savings forward, then solving for the contribution needed to cover only the remainder.',
      'The result is a concrete monthly number, which is the most actionable output a savings plan can produce. If that number is uncomfortable, the response is not to abandon the goal but to adjust one of the three levers: the target, the timeline, or the assumed rate. Running the calculator a few times makes the trade-offs between them explicit.',
    ],
    howItWorks: [
      'The calculator converts the annual rate to a monthly rate and the number of years into a number of months, so the entire calculation operates on a monthly schedule.',
      'It first projects your current savings forward to the target date by compounding them for the full number of months. This gives the portion of the goal that existing money will cover on its own.',
      'It subtracts that projected amount from the goal to find the remaining shortfall. If existing savings alone already reach or exceed the target, the required contribution is reported as zero.',
      'It then solves the future value of an annuity formula in reverse: given the shortfall as a target, the monthly rate, and the number of months, what payment produces exactly that amount? This is the required monthly contribution.',
      'Total contributions are reported as current savings plus all the required monthly payments, and total interest is the goal minus that figure — the portion of the target that growth supplies rather than you.',
      'A zero rate is handled separately by dividing the shortfall evenly across the months, since the annuity formula divides by the rate.',
    ],
    formula: 'PMT = (FV - PV(1+r)^n) × r / [(1+r)^n - 1]',
    formulaExplanation:
      'FV is the goal amount, PV is your current savings, r is the monthly rate (annual ÷ 12), and n is the number of months. The term PV(1+r)^n is what your existing savings grow into by the target date, so FV minus that term is the shortfall the contributions must cover. The remaining fraction converts that shortfall into the level monthly payment that produces it, accounting for the fact that each payment compounds for only the months remaining after it is made.',
    workedExamples: [
      {
        title: 'Example 1 — A four-year goal with money already saved',
        scenario: 'Goal $30,000 · Current savings $5,000 · Annual rate 4% · 4 years',
        steps: [
          'Monthly rate = 4% ÷ 12 ≈ 0.3333% · Months = 4 × 12 = 48',
          'Current savings grow: 5,000 × (1.003333)^48 ≈ $5,867',
          'Shortfall to cover = 30,000 − 5,867 ≈ $24,133',
          'Annuity factor = [(1.003333)^48 − 1] ÷ 0.003333 ≈ 51.9',
          'Required monthly = 24,133 ÷ 51.9 ≈ $464.48',
          'Total contributions = 5,000 + (464.48 × 48) ≈ $27,294.87',
        ],
        result:
          'Required monthly saving $464.48, total contributions $27,294.87, and $2,705.13 of the goal supplied by interest.',
        takeaway:
          'The $5,000 already saved offsets about $5,867 of the goal, not $5,000, because it compounds for the full four years. Interest covers roughly 9% of the target overall — meaningful, but the monthly discipline is still doing most of the work over a horizon this short.',
      },
      {
        title: 'Example 2 — A ten-year goal starting from nothing',
        scenario: 'Goal $60,000 · Current savings $0 · Annual rate 3.5% · 10 years',
        steps: [
          'Monthly rate = 3.5% ÷ 12 ≈ 0.2917% · Months = 10 × 12 = 120',
          'No existing savings, so the full $60,000 must come from contributions plus growth',
          'Annuity factor = [(1.002917)^120 − 1] ÷ 0.002917 ≈ 143.4',
          'Required monthly = 60,000 ÷ 143.4 ≈ $418.32',
          'Total contributions = 418.32 × 120 ≈ $50,197.82',
          'Interest supplied = 60,000 − 50,197.82 = $9,802.18',
        ],
        result:
          'Required monthly saving $418.32, total contributions $50,197.82, and $9,802.18 of the goal supplied by interest.',
        takeaway:
          'Compare the two examples. The second goal is twice the size of the first, yet the required monthly amount is lower, because the timeline is more than twice as long. Interest also carries a much larger share here — about 16% against 9% — since contributions have far longer to compound.',
      },
    ],
    whenToUse: [
      'Use this calculator when you know the amount you need and the date you need it by, and you want to translate that into a monthly figure you can act on.',
      'It is well suited to testing how sensitive a plan is to its timeline. Extending a goal by a year or two often reduces the required monthly amount considerably, and seeing by how much makes the choice concrete.',
      'If instead you know what you can save and want to see where you end up, use the savings calculator, which runs the same relationship in the opposite direction.',
    ],
    factors: [
      {
        title: 'The length of the timeline',
        detail:
          'This is the most powerful lever. The required monthly amount falls faster than proportionally as the timeline extends, because each contribution has longer to compound and there are more of them. Doubling the timeline more than halves the monthly figure.',
      },
      {
        title: 'How much is already saved',
        detail:
          'Existing savings reduce the required contribution by more than their face value, since they compound for the entire period. The longer the horizon, the more pronounced this effect.',
      },
      {
        title: 'The assumed rate',
        detail:
          'A higher assumed rate lowers the required monthly contribution, which makes optimistic assumptions tempting. If the rate does not materialise, the shortfall appears at the end when there is no time left to correct it. A conservative rate produces a plan with slack in it.',
      },
      {
        title: 'Inflation on the target itself',
        detail:
          'For goals several years out, the thing you are saving for may cost more by the time you get there. Setting the target in today prices can leave the plan short even when it succeeds exactly as calculated.',
      },
      {
        title: 'Consistency of contributions',
        detail:
          'The calculation assumes every monthly payment is made. Missed months have to be recovered by larger payments later, and the later the recovery, the less time it has to compound.',
      },
    ],
    assumptions: [
      'The rate is constant for the entire period and compounds monthly.',
      'Contributions are made consistently every month without interruption.',
      'No withdrawals are made from the balance before the target date.',
      'Existing savings remain invested for the full period and compound at the same rate.',
      'The goal amount is expressed in today currency and is not adjusted for inflation.',
    ],
    commonMistakes: [
      'Setting an unrealistically high rate assumption, which understates the required contribution and hides the shortfall until the end.',
      'Not adjusting the goal for inflation when the target date is many years away.',
      'Forgetting that missed contributions must be replaced by larger ones later, with less time to compound.',
      'Overlooking how much an existing balance contributes, and therefore saving more than necessary.',
      'Treating the required amount as fixed rather than testing what a longer timeline would do to it.',
    ],
    faqs: [
      {
        question: 'What if the required monthly amount is more than I can afford?',
        answer:
          'You have three levers and can adjust any of them. Extending the timeline is usually the most effective, because the required amount falls faster than proportionally. Lowering the target works directly. Assuming a higher rate also lowers the figure, but it does so by shifting risk to the end of the plan rather than by changing anything real.',
      },
      {
        question: 'Why does the required amount fall so much when I extend the timeline?',
        answer:
          'Two effects combine. There are more contributions, and each one compounds for longer. In the examples above, a $60,000 goal over ten years requires less per month than a $30,000 goal over four, despite being twice the size. Time does a disproportionate share of the work.',
      },
      {
        question: 'Why does the calculator sometimes say I need to save nothing?',
        answer:
          'Because your current savings, compounded at the rate you entered for the full period, already reach or exceed the goal on their own. When the projected value of existing savings covers the target, the required contribution is reported as zero.',
      },
      {
        question: 'Should I include money I have in other accounts?',
        answer:
          'Include it only if it will genuinely remain untouched until the target date and earn approximately the rate you entered. Money you may need for something else, or that sits in an account paying much less, will not behave the way the projection assumes.',
      },
      {
        question: 'What rate should I assume for a goal a few years out?',
        answer:
          'For short horizons, a rate close to what a deposit account currently pays is the more defensible assumption, because there is little time to recover from a shortfall. The consequence of assuming too much is discovered at the deadline, which is the worst moment to find out.',
      },
      {
        question: 'Does this account for taxes on the interest earned?',
        answer:
          'No. It calculates the gross amount needed. If interest is taxed as it is earned, the effective growth is lower than the projection shows and the required contribution would be slightly higher. Entering a rate reduced by the expected tax drag approximates this.',
      },
    ],
  },

  'apy-calculator': {
    slug: 'apy-calculator',
    longIntro: [
      'APR and APY both describe the rate on an account, but they are not the same measurement, and the difference between them is compounding. APR is the nominal annual rate before compounding is applied. APY is the effective annual yield after it is. Two accounts advertising identical APRs can pay different amounts over a year if they compound at different frequencies.',
      'This matters because financial products are not quoted consistently. Deposit accounts commonly advertise APY, which flatters them slightly because it is the larger number. Loans commonly quote APR. Comparing a rate expressed one way against a rate expressed the other is not a valid comparison, and the gap, while small in percentage terms, is real.',
      'The calculator resolves this by converting between the two in both directions. Given an APR and a compounding frequency it produces the APY, and given an APY it recovers the APR that would produce it. It also shows the same APR expressed as an APY across every common compounding frequency, which makes the actual size of the effect immediately visible.',
      'That comparison table is the most instructive part, because it tends to correct an intuition rather than confirm one. The step from annual to monthly compounding is meaningful. The step from monthly to daily is nearly invisible. Compounding frequency is real but bounded, and the stated rate matters far more than the schedule attached to it.',
    ],
    howItWorks: [
      'To convert APR to APY, the calculator divides the APR by the number of compounding periods per year to get the periodic rate, adds one, raises the result to the power of the number of periods, and subtracts one.',
      'The intuition is that each period multiplies the balance by a small factor, and compounding those factors across the year produces a total growth factor slightly greater than one plus the APR. The excess is the compounding benefit.',
      'The reverse conversion inverts the same arithmetic. Given an APY, it takes the nth root of one plus the APY, subtracts one to recover the periodic rate, then multiplies by the number of periods to return the nominal annual rate.',
      'The comparison table applies the forward conversion five times, at annual, semi-annual, quarterly, monthly, and daily frequencies, so the effect of each schedule on the same APR can be read directly.',
      'The mathematical limit of this process, as frequency increases without bound, is continuous compounding. Daily compounding is already very close to that limit, which is why further increases produce almost nothing.',
    ],
    formula: 'APY = (1 + APR/n)^n - 1',
    formulaExplanation:
      'APR is the nominal annual rate as a decimal and n is the number of compounding periods per year. Dividing by n gives the rate applied each period; raising to the power of n compounds it across the year. The reverse form is APR = n × ((1 + APY)^(1/n) − 1). When n equals 1, both formulas reduce to APY = APR, because compounding once a year is the same as not compounding at all.',
    workedExamples: [
      {
        title: 'Example 1 — 5% APR across every compounding frequency',
        scenario: 'APR 5% · Compounded monthly, with all frequencies shown for comparison',
        steps: [
          'Monthly: periodic rate = 5% ÷ 12 ≈ 0.4167%',
          'APY = (1 + 0.0041667)^12 − 1 ≈ 5.116%',
          'Annually (n=1): 5.000% — identical to the APR',
          'Semi-annually (n=2): 5.062%',
          'Quarterly (n=4): 5.095%',
          'Daily (n=365): 5.127%',
        ],
        result: 'A 5% APR compounded monthly produces an APY of approximately 5.116%.',
        takeaway:
          'The entire range from annual to daily compounding spans only 0.127 percentage points. Moving from annual to monthly captures 0.116 of that; moving from monthly all the way to daily adds just 0.011 more. On a $10,000 balance, that final step is about $1.10 a year.',
      },
      {
        title: 'Example 2 — A daily-compounding account',
        scenario: 'APR 4.35% · Compounded daily (365 periods per year)',
        steps: [
          'Periodic rate = 4.35% ÷ 365 ≈ 0.011918% per day',
          'APY = (1 + 0.00011918)^365 − 1',
          '(1.00011918)^365 ≈ 1.044460',
          'APY ≈ 4.446%',
          'Difference from the stated APR = 4.446 − 4.35 ≈ 0.096 percentage points',
        ],
        result: 'A 4.35% APR compounded daily produces an APY of approximately 4.446%.',
        takeaway:
          'Daily compounding adds about 0.096 percentage points here. If a competing account advertised a 4.40% APY, it would pay less than this one despite quoting a higher-looking number than the 4.35% APR — which is precisely why the two figures must be converted before being compared.',
      },
    ],
    whenToUse: [
      'Use this calculator whenever you are comparing deposit accounts, certificates, or any products quoted with different compounding frequencies.',
      'Use the reverse conversion when a product advertises an APY but you need the nominal rate — for instance, to enter it into the savings or compound interest calculators, which apply compounding themselves.',
      'It is also useful simply for calibration: the comparison table shows how little compounding frequency changes the outcome, which helps keep attention on the stated rate where it belongs.',
    ],
    factors: [
      {
        title: 'The stated rate',
        detail:
          'This dominates. A difference of half a percentage point in the stated rate outweighs any possible difference in compounding frequency, by a wide margin and at every realistic rate level.',
      },
      {
        title: 'Compounding frequency',
        detail:
          'Real but strictly bounded. The benefit rises steeply from annual to monthly and then flattens almost completely. Beyond daily, additional frequency is effectively worthless.',
      },
      {
        title: 'Which measure is being advertised',
        detail:
          'Deposit products usually advertise APY because it is the larger figure; borrowing products usually quote APR. Always confirm which one you are looking at before comparing two offers.',
      },
      {
        title: 'Fees that reduce the effective yield',
        detail:
          'Monthly maintenance charges, minimum balance penalties, and withdrawal fees all reduce what you actually earn. None of them appear in either APR or APY, and on small balances they can easily exceed the interest.',
      },
      {
        title: 'Whether the rate is promotional',
        detail:
          'An introductory rate that applies for a few months and then reverts produces a blended yield well below the headline figure. The APY quoted describes the rate while it lasts, not the average over the time you hold the account.',
      },
    ],
    assumptions: [
      'The rate is fixed for the full year.',
      'No fees, minimum balance requirements, or early withdrawal penalties are applied.',
      'Interest is credited and compounds exactly at the stated frequency.',
      'The balance remains untouched for the year, with no deposits or withdrawals.',
      'A year is treated as 365 days for daily compounding.',
    ],
    commonMistakes: [
      'Comparing APR across accounts without converting to APY first.',
      'Assuming APR and APY are the same — they differ whenever compounding occurs more than once per year.',
      'Overvaluing daily compounding, which adds very little over monthly.',
      'Entering an APY into a calculator that applies its own compounding, which counts the effect twice.',
      'Ignoring account fees, which are not reflected in either figure and can outweigh the interest on small balances.',
    ],
    faqs: [
      {
        question: 'Is APY always higher than APR?',
        answer:
          'Whenever interest compounds more than once per year, yes. With annual compounding the two are identical, because compounding once a year produces no additional growth. The more frequently interest compounds, the wider the gap, though it approaches a ceiling rather than growing indefinitely.',
      },
      {
        question: 'Which compounding frequency should I look for?',
        answer:
          'More frequent is better, but the difference is small enough that it should rarely decide anything. At 5% APR, monthly compounding yields 5.116% and daily yields 5.127% — a gap of about one hundredth of a percentage point. An account paying 5.25% with annual compounding beats both.',
      },
      {
        question: 'How do I compare an account quoting APY against one quoting APR?',
        answer:
          'Convert one to the other before comparing. Either convert the APR to an APY using that account compounding frequency, or use the reverse conversion to turn the APY back into a nominal rate. Comparing the two figures as quoted will favour whichever account happens to advertise the APY.',
      },
      {
        question: 'Why does the benefit of more frequent compounding flatten out?',
        answer:
          'Because compounding converges toward a mathematical limit called continuous compounding. As the periods get shorter, each one applies a proportionally smaller rate, and the gains from subdividing further shrink rapidly. Daily compounding is already within a rounding error of the theoretical maximum.',
      },
      {
        question: 'Does this calculator account for fees?',
        answer:
          'No. Both APR and APY describe interest only. A monthly maintenance fee, a minimum balance penalty, or a withdrawal charge reduces the effective yield, and on a small balance such fees can easily exceed the interest earned. Always check the fee schedule alongside the rate.',
      },
      {
        question: 'Which rate should I enter into the savings calculator?',
        answer:
          'The nominal APR, because that calculator applies monthly compounding itself. If your account advertises an APY, use the reverse conversion here first to recover the nominal rate. Entering the APY directly counts compounding twice and overstates the projection.',
      },
    ],
  },

  'future-value-calculator': {
    slug: 'future-value-calculator',
    longIntro: [
      'Future value is the general form of every forward-looking calculation in finance. It asks what a sum available today, together with any payments made along the way, will be worth at a specified date given an assumed rate. Nearly every projection tool is a specialised version of this one calculation.',
      'What makes this calculator general is that it does not fix the payment schedule. Contributions can be annual, semi-annual, quarterly, monthly, or weekly, and the rate is applied on the same schedule. That flexibility matters because real payment patterns vary: pension contributions may be annual, business reserves quarterly, and personal saving monthly.',
      'It also exposes payment timing as an explicit choice. A payment made at the start of each period earns for that entire period; a payment made at the end does not. Over a long horizon this single switch produces a visible difference in the result, and it is one of the few genuinely free improvements available in a savings plan.',
      'The output separates total contributions from total growth, which is the distinction that gives the ending number meaning. A future value of $348,352.63 says little on its own; knowing that $150,000 of it was contributed and $198,352.63 was growth says a great deal about what the projection is actually claiming.',
    ],
    howItWorks: [
      'The calculator derives the periodic rate by dividing the annual rate by the payment frequency. At 6% annually with quarterly payments, each quarter applies 1.5%.',
      'It then loops through every period of every year. For end-of-period timing it grows the balance first and adds the payment afterward; for beginning-of-period timing it adds the payment first and then grows the combined amount.',
      'That ordering is the entire mechanical difference between the two timing options, and it gives each beginning-of-period payment exactly one extra period of growth relative to the end-of-period case.',
      'Total contributions accumulate the present value plus every periodic payment, and total growth is the ending balance minus that sum.',
      'Yearly data is recorded at each anniversary, showing the balance, cumulative contributions, and cumulative growth, which makes the widening gap between deposits and growth visible over time.',
      'A zero rate is handled directly by accumulating payments without growth.',
    ],
    formula: 'FV = PV × (1+r)^n + PMT × [(1+r)^n - 1] / r',
    formulaExplanation:
      'PV is the present value, PMT is the payment per period, r is the periodic rate (annual rate ÷ payments per year), and n is the total number of periods. The first term compounds the opening lump sum across every period. The second is the future value of a level payment stream. For beginning-of-period payments, that second term is multiplied by an additional (1 + r), which is the mathematical expression of each payment earning one extra period of growth.',
    workedExamples: [
      {
        title: 'Example 1 — Monthly payments at the end of each period',
        scenario:
          'Present value $10,000 · 5% annual rate · 15 years · $200 per period · 12 payments per year · End of period',
        steps: [
          'Periodic rate = 5% ÷ 12 ≈ 0.4167% · Periods = 15 × 12 = 180',
          'Lump sum component: 10,000 × (1.0041667)^180 ≈ $21,137',
          'Payment component: 200 × [(1.0041667)^180 − 1] ÷ 0.0041667 ≈ $53,458',
          'Total contributions = 10,000 + (200 × 180) = $46,000',
          'Future value ≈ $74,594.83',
          'Total growth = 74,594.83 − 46,000 = $28,594.83',
        ],
        result: 'Future value $74,594.83, total contributions $46,000, total growth $28,594.83.',
        takeaway:
          'Growth accounts for about 38% of the ending balance. The opening $10,000 roughly doubles over fifteen years, while the payment stream contributes the larger share of both the deposits and the final total.',
      },
      {
        title: 'Example 2 — Quarterly payments at the beginning of each period',
        scenario:
          'Present value $0 · 6% annual rate · 25 years · $1,500 per period · 4 payments per year · Beginning of period',
        steps: [
          'Periodic rate = 6% ÷ 4 = 1.5% · Periods = 25 × 4 = 100',
          'Total contributions = 1,500 × 100 = $150,000',
          'End-of-period future value would be approximately $343,204',
          'Beginning-of-period multiplies by an additional (1.015)',
          'Future value ≈ $348,352.63',
          'Total growth = 348,352.63 − 150,000 = $198,352.63',
        ],
        result: 'Future value $348,352.63, total contributions $150,000, total growth $198,352.63.',
        takeaway:
          'Growth exceeds contributions here, supplying about 57% of the ending balance — the opposite balance from the first example, because the horizon is longer and the rate higher. The timing choice alone is worth roughly $5,100 of that total, purely from each payment arriving one quarter earlier.',
      },
    ],
    whenToUse: [
      'Use this calculator when your contributions do not follow a monthly schedule, or when payment timing within the period matters to the result.',
      'It is the right general-purpose tool when you want a single projection that handles a lump sum, a payment stream, or both together at any common frequency.',
      'For a deposit account with monthly contributions, the savings calculator is more direct. For projections where purchasing power matters, the investment calculator adds an inflation adjustment.',
    ],
    factors: [
      {
        title: 'Payment frequency',
        detail:
          'More frequent payments of the same annual total produce a slightly higher future value, because money arrives earlier on average and therefore compounds for longer. The effect is modest but consistent.',
      },
      {
        title: 'Payment timing',
        detail:
          'Beginning-of-period payments each earn one additional period of growth. Across a long horizon with many periods, this accumulates into a visible difference at no additional cost.',
      },
      {
        title: 'Length of the horizon',
        detail:
          'Because time enters as an exponent, extending the term raises the result disproportionately. The share of the ending balance attributable to growth rather than contributions rises steadily with the horizon.',
      },
      {
        title: 'The assumed rate',
        detail:
          'This is an input you choose, not a property of any actual instrument. Small changes compound into large differences over long terms, so testing a range is more informative than relying on a single figure.',
      },
      {
        title: 'Matching the rate to the frequency',
        detail:
          'The calculator expects a nominal annual rate and divides it by the payment frequency. Entering a rate that is already periodic, or one that already includes compounding, produces a result that does not mean what it appears to.',
      },
    ],
    assumptions: [
      'The rate is constant for the entire term.',
      'Payments are made every period without interruption and are equal in size.',
      'The payment frequency and the compounding frequency are the same.',
      'No taxes, fees, or withdrawals are applied.',
      'The annual rate entered is nominal and is divided by the payment frequency to get the periodic rate.',
    ],
    commonMistakes: [
      'Confusing payment frequency with compounding frequency — this calculator ties them together.',
      'Not matching payment timing (beginning versus end of period) to your actual situation.',
      'Entering a periodic rate where an annual rate is expected, which divides it a second time.',
      'Comparing a future value against a present-day cost without adjusting for inflation.',
      'Reading a single projection as a forecast rather than as the consequence of the assumptions entered.',
    ],
    faqs: [
      {
        question: 'What is the difference between beginning and end of period?',
        answer:
          'End of period means the payment arrives after that period growth has been applied, so it earns nothing until the next period. Beginning of period means it arrives first and is included in that period growth immediately. Each beginning-of-period payment therefore earns exactly one extra period of growth, which in the quarterly example above is worth around $5,100 over 25 years.',
      },
      {
        question: 'How is this different from the compound interest calculator?',
        answer:
          'The compound interest calculator takes a monthly contribution and lets you choose a separate compounding frequency. This one ties the payment and compounding schedules together and lets you set that shared frequency directly, which fits instruments where contributions and crediting happen on the same cycle.',
      },
      {
        question: 'Does payment frequency change how much I contribute?',
        answer:
          'Yes, in this calculator. The payment amount is per period, so $1,500 quarterly is $6,000 a year while $1,500 monthly is $18,000. When comparing frequencies, adjust the payment amount so the annual total stays the same, or the comparison measures the wrong thing.',
      },
      {
        question: 'What rate should I use?',
        answer:
          'Enter the nominal annual rate; the calculator divides it by the payment frequency for you. For a deposit account with a quoted APY, convert back to a nominal rate first using the APY calculator, otherwise compounding is counted twice.',
      },
      {
        question: 'Is the future value adjusted for inflation?',
        answer:
          'No. The result is a nominal figure in future currency units. To see what it represents in today purchasing power, either use the investment calculator, which includes an inflation adjustment, or divide the result by (1 + inflation rate) raised to the number of years.',
      },
      {
        question: 'Can I use this to value an annuity?',
        answer:
          'It computes the future value of a level payment stream, which is the accumulation side of an annuity. It does not compute present value, and it does not handle payments that change over time or stop partway through. Those require a different calculation.',
      },
    ],
  },
};
