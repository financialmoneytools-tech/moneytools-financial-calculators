import type { CalculatorContent } from '../registry';

/**
 * Educational content for the investment calculators.
 * See data/calculator-content.ts for how these modules are assembled.
 */
export const investmentContent: Record<string, CalculatorContent> = {
  'compound-interest-calculator': {
    slug: 'compound-interest-calculator',
    longIntro: [
      'Compound interest is what happens when the interest you earn starts earning interest of its own. In the first period the calculation is unremarkable: a balance earns a percentage of itself. From the second period onward the base has grown, so the same percentage produces a slightly larger amount, and that larger amount becomes part of the base for the period after it. Repeated over many periods, this feedback loop separates compound growth from ordinary linear growth by a wide margin.',
      'The practical consequence is that time matters more than most people expect, and it matters in a non-obvious way. Doubling the number of years does not double the ending balance; it does considerably more than that, because the final years of a long horizon operate on the largest balances the account will ever hold. This is why the same monthly contribution started earlier produces an ending balance that a later start cannot easily match, even with larger deposits.',
      'This calculator models both parts of that process: a lump sum that compounds on its own, and a stream of regular contributions that each compound for whatever time remains after they are deposited. Separating the two is useful, because the ending balance tells you very little by itself. What tells you something is the split between money you put in and growth the account generated, which is why the results break out total contributions and total interest alongside the final amount.',
    ],
    howItWorks: [
      'The calculator steps through the full term one compounding period at a time rather than applying a single closed-form formula. For each period it multiplies the running balance by the periodic rate factor, then adds the contribution for that period. This loop-based approach is what allows the year-by-year breakdown to be exact rather than interpolated.',
      'The annual rate you enter is divided by the compounding frequency to get the periodic rate. At 6% compounded monthly, each month applies 0.5%, not 6%. The number of periods is the frequency multiplied by the number of years, so twenty years of monthly compounding is 240 separate applications of the periodic rate.',
      'Contributions are entered as a monthly figure, but they are applied on the compounding schedule you select. The calculator converts the monthly amount to an annual total and divides it across the periods in the year, so switching the compounding frequency never silently changes how much money you are contributing over the term. Only the timing and the compounding change.',
      'Contribution timing determines the order of the two operations within each period. With end-of-period timing the balance grows first and the deposit lands afterward, so that deposit earns nothing in the period it arrives. With beginning-of-period timing the deposit lands first and is included in the growth calculation immediately, which produces a modestly higher ending balance across a long term.',
    ],
    formula: 'A = P(1 + r/n)^(nt) + PMT × [(1 + r/n)^(nt) - 1] / (r/n)',
    formulaExplanation:
      'P is the starting principal, r is the annual rate as a decimal, n is the number of compounding periods per year, t is the term in years, and PMT is the contribution per period. The first term grows the initial lump sum. The second term is the future value of the contribution stream, in which each deposit compounds only for the periods remaining after it was made. With beginning-of-period timing, the second term is multiplied by an additional (1 + r/n).',
    workedExamples: [
      {
        title: 'Example 1 — A lump sum left alone',
        scenario: 'Principal $10,000 · Annual rate 6% · Compounded monthly · No contributions · 20 years',
        steps: [
          'Periodic rate = 6% ÷ 12 = 0.5% per month',
          'Number of periods = 12 × 20 = 240',
          'A = 10,000 × (1 + 0.005)^240',
          '(1.005)^240 ≈ 3.310204',
          'A = 10,000 × 3.310204 = $33,102.04',
        ],
        result:
          'Final balance $33,102.04, of which $10,000 is the original principal and $23,102.04 is compound interest.',
        takeaway:
          'No money was added after day one, yet the account more than tripled. Roughly 70% of the ending balance is growth rather than principal, and the majority of that growth was generated in the second half of the term, when the balance being compounded was at its largest.',
      },
      {
        title: 'Example 2 — A smaller start with steady contributions',
        scenario: 'Principal $5,000 · Annual rate 7% · Compounded monthly · $300 per month · 30 years',
        steps: [
          'Periodic rate = 7% ÷ 12 ≈ 0.5833% per month',
          'Number of periods = 12 × 30 = 360',
          'Lump sum component: 5,000 × (1.0058333)^360 ≈ $40,613',
          'Contribution component: 300 × [(1.0058333)^360 − 1] ÷ 0.0058333 ≈ $365,961',
          'Total contributed over the term = 5,000 + (300 × 360) = $113,000',
        ],
        result:
          'Final balance $406,573.79, made up of $113,000 in total contributions and $293,573.79 in compound interest.',
        takeaway:
          'Compare this with the first example. The starting principal here is half as large, but consistent contributions over a longer term produce an ending balance more than twelve times greater. Interest accounts for about 72% of the final figure, which illustrates that for long contribution schedules the growth on contributions, not the opening deposit, does most of the work.',
      },
    ],
    whenToUse: [
      'Use this calculator when you want to see the long-run effect of a fixed rate applied repeatedly to a growing balance, either on a single deposit or on a deposit plus a regular contribution schedule.',
      'It is well suited to comparing scenarios against each other: the same contribution starting five years earlier, a longer term at a lower rate against a shorter term at a higher one, or the difference that beginning-of-period contributions make over decades.',
      'It is less suited to accounts where the rate changes frequently, where withdrawals interrupt the balance, or where contributions are irregular. Those situations break the constant-rate assumption the projection depends on.',
    ],
    factors: [
      {
        title: 'Length of the term',
        detail:
          'This is the single most influential input. Because growth is exponential rather than linear, each additional year contributes more to the ending balance than the year before it. Extending a term by a few years near the end of a long horizon changes the result far more than the same extension at the start.',
      },
      {
        title: 'The annual rate',
        detail:
          'Small differences compound into large ones. Over multi-decade terms, a rate difference of one percentage point can change the ending balance by a substantial fraction, because the gap widens every period rather than staying constant.',
      },
      {
        title: 'Compounding frequency',
        detail:
          'Moving from annual to monthly compounding raises the effective yield, but the effect is much smaller than most people expect and it diminishes rapidly. The step from monthly to daily is nearly negligible compared with the step from a lower rate to a higher one.',
      },
      {
        title: 'Contribution size and consistency',
        detail:
          'Over long terms the contribution stream usually dominates the opening principal. A modest monthly amount sustained for thirty years typically produces more ending value than a much larger one-time deposit made at the start.',
      },
      {
        title: 'Contribution timing',
        detail:
          'Beginning-of-period deposits earn one extra period of growth each, which produces a small but persistent advantage that accumulates across the full term.',
      },
    ],
    assumptions: [
      'The interest rate remains constant for the entire period.',
      'Contributions are made at regular intervals and are converted to match the selected compounding frequency.',
      'Interest is reinvested and compounds at the specified frequency.',
      'No withdrawals, taxes, or fees are accounted for.',
      'The result is a projection based on the inputs you supply, not a prediction of any particular account.',
    ],
    commonMistakes: [
      'Confusing APR with APY — this calculator uses the stated annual rate and applies compounding to it, so entering an already-compounded APY overstates the result.',
      'Forgetting that more frequent compounding (daily versus annually) produces slightly higher returns, but far less than a higher stated rate would.',
      'Not accounting for inflation when projecting long-term growth, which overstates what the ending balance will actually buy.',
      'Treating the projection as a forecast rather than as the arithmetic consequence of the assumptions entered.',
      'Assuming contributions can be paused without consequence — a gap of several years removes both the deposits and all the growth they would have generated.',
    ],
    faqs: [
      {
        question: 'What is the difference between simple and compound interest?',
        answer:
          'Simple interest is always calculated on the original principal, so it produces the same amount every period and grows in a straight line. Compound interest is calculated on the current balance, which includes previously earned interest, so each period produces slightly more than the one before it. Over short periods the two are close; over long ones the difference becomes very large.',
      },
      {
        question: 'How much difference does compounding frequency actually make?',
        answer:
          'Less than most people assume. At a 5% annual rate, annual compounding yields exactly 5%, monthly yields about 5.116%, and daily yields about 5.127%. The gap between monthly and daily is roughly one hundredth of a percentage point. The stated rate matters far more than the frequency attached to it.',
      },
      {
        question: 'Should I choose beginning or end of period for contributions?',
        answer:
          'Choose whichever matches your actual situation. If your deposit arrives at the start of the month, select beginning. If it arrives at the end, select end. Beginning-of-period timing produces a slightly higher balance because every deposit earns one additional period of growth.',
      },
      {
        question: 'Why does the interest figure grow faster in later years?',
        answer:
          'Because interest is a percentage of the balance, and the balance is largest at the end. The same rate applied to a larger number produces a larger result, so the final years of a long term generate far more interest than the first years, even though nothing about the rate has changed.',
      },
      {
        question: 'Does this calculator account for taxes or fees?',
        answer:
          'No. It models gross growth only. Account fees, fund expense ratios, and taxes on interest all reduce the real outcome, and over long horizons their effect compounds in the same way growth does. To approximate their impact, enter a rate reduced by the annual cost you expect to pay.',
      },
      {
        question: 'Can I use this to model an account with a variable rate?',
        answer:
          'Only as an approximation. The calculation applies one fixed rate for the whole term. For a variable-rate account you can run the calculator several times across a range of plausible rates to see how wide the spread of outcomes is, which is usually more informative than a single figure.',
      },
    ],
  },

  'investment-calculator': {
    slug: 'investment-calculator',
    longIntro: [
      'An investment projection answers a narrow question: given a starting amount, a contribution schedule, an assumed rate of return, and a number of years, what balance does the arithmetic produce? The value of running it is not the precision of the ending number, which no projection can guarantee, but the shape of the relationship it reveals between the inputs you control and the outcome you care about.',
      'What distinguishes this calculator from a plain compound growth tool is that it tracks a second figure alongside the nominal balance: the same balance expressed in the purchasing power of today. Prices generally rise over time, so a given sum of money buys less at the end of a long horizon than it does at the start. A projection that ignores this reports a number that looks larger than it will feel.',
      'Seeing both figures side by side changes how the result reads. A nominal balance that appears to have grown dramatically may represent a much more modest gain once the erosion of purchasing power is removed. Separating nominal growth from real growth is the difference between knowing how many currency units you will hold and knowing what those units will be worth.',
    ],
    howItWorks: [
      'The calculator advances month by month for the full term. Each month it applies one twelfth of the annual return to the running balance and then adds the monthly contribution, accumulating the total invested as it goes.',
      'At the end of each year it records four values: the nominal balance, the cumulative amount invested, the growth (nominal balance minus amount invested), and the inflation-adjusted balance. That last figure is the nominal balance divided by an inflation factor of (1 + inflation rate) raised to the number of years elapsed.',
      'Deflating by a compounding inflation factor rather than subtracting inflation from the return is the more accurate approach, because inflation compounds in exactly the same way returns do. The two methods give similar answers at low rates and diverge as rates rise.',
      'Total growth is reported as the nominal balance minus everything you contributed, including the initial investment. This keeps the distinction clear between capital you supplied and value the projection generated.',
    ],
    formula: 'FV = PV(1+r)^n + PMT × [(1+r)^n - 1] / r',
    formulaExplanation:
      'PV is the initial investment, PMT is the monthly contribution, r is the monthly rate (the annual return divided by twelve), and n is the total number of months. The inflation-adjusted value is then FV ÷ (1 + i)^t, where i is the annual inflation rate and t is the term in years. That second step converts a future sum into the purchasing power it represents today.',
    workedExamples: [
      {
        title: 'Example 1 — A twenty-year horizon with inflation applied',
        scenario:
          'Initial investment $25,000 · $500 per month · 7% annual return · 3% annual inflation · 20 years',
        steps: [
          'Monthly rate = 7% ÷ 12 ≈ 0.5833%',
          'Months = 20 × 12 = 240',
          'Total invested = 25,000 + (500 × 240) = $145,000',
          'Nominal future value after 240 months ≈ $361,431.80',
          'Inflation factor = (1.03)^20 ≈ 1.8061',
          'Real value = 361,431.80 ÷ 1.8061 ≈ $200,116.03',
        ],
        result:
          'Nominal balance $361,431.80, total invested $145,000, total growth $216,431.80, and an inflation-adjusted value of $200,116.03.',
        takeaway:
          'The nominal balance is roughly 2.5 times the amount invested, which looks impressive. Adjusted for 3% inflation it is closer to 1.4 times. Both numbers are correct; they answer different questions. The first is how much money the account holds, the second is what that money would buy in today terms.',
      },
      {
        title: 'Example 2 — Starting from zero over ten years',
        scenario: 'Initial investment $0 · $250 per month · 6% annual return · 2.5% annual inflation · 10 years',
        steps: [
          'Monthly rate = 6% ÷ 12 = 0.5%',
          'Months = 10 × 12 = 120',
          'Total invested = 250 × 120 = $30,000',
          'Nominal future value ≈ $40,969.84',
          'Inflation factor = (1.025)^10 ≈ 1.2801',
          'Real value = 40,969.84 ÷ 1.2801 ≈ $32,005.57',
        ],
        result:
          'Nominal balance $40,969.84, total invested $30,000, total growth $10,969.84, and an inflation-adjusted value of $32,005.57.',
        takeaway:
          'Over a ten-year term with no opening deposit, growth is about 37% of what was contributed in nominal terms but only about 7% once inflation is removed. Shorter horizons give compounding much less room to work, and inflation consumes a larger share of what it does produce.',
      },
    ],
    whenToUse: [
      'Use this calculator when you want a projection that separates nominal growth from purchasing power, particularly over horizons of ten years or more where the gap between the two becomes significant.',
      'It is useful for comparing the sensitivity of an outcome to its inputs: what changes more, the result of adding fifty dollars a month, or the result of assuming one percentage point more in annual return?',
      'It is not designed for portfolios with irregular contributions, mid-term withdrawals, or returns that vary sharply year to year. For a single deposit with no contributions, the compound interest calculator is a more direct fit.',
    ],
    factors: [
      {
        title: 'The assumed rate of return',
        detail:
          'This is an assumption you supply, not a property of any actual investment. Because it compounds, the ending balance is highly sensitive to it. Running the projection across a range of rates rather than a single one gives a more honest picture of the spread of possible outcomes.',
      },
      {
        title: 'The inflation rate you enter',
        detail:
          'This governs the entire gap between the nominal and real figures. A higher assumed inflation rate does not change how much money the account holds; it changes how much that money is projected to be worth.',
      },
      {
        title: 'Contribution size relative to the opening balance',
        detail:
          'Over long terms, regular contributions usually contribute more to the ending balance than the initial investment does. The longer the horizon, the more this holds true.',
      },
      {
        title: 'Costs that are not modelled',
        detail:
          'Management fees, fund expenses, trading costs, and taxes all reduce the realised return. Because the projection applies a gross rate, results will be optimistic unless you enter a rate already net of these costs.',
      },
      {
        title: 'Sequence of returns',
        detail:
          'The projection applies one steady rate. Real returns arrive unevenly, and while the order does not change the outcome for a single untouched lump sum, it does affect accounts with ongoing contributions or withdrawals.',
      },
    ],
    assumptions: [
      'Returns are constant and compounded monthly.',
      'Contributions are made at the same time each month and never pause.',
      'The inflation rate is constant over the entire period.',
      'No taxes, fees, or withdrawals are applied.',
      'The inflation adjustment deflates the nominal balance by a compounding annual factor.',
    ],
    commonMistakes: [
      'Using nominal returns without considering inflation, which overstates future purchasing power.',
      'Treating a past average return as a rate that will certainly repeat — past returns do not guarantee future performance.',
      'Ignoring investment fees, which can significantly reduce long-term results because their drag compounds too.',
      'Reading the ending balance as a single expected value rather than as one point in a wide range of possible outcomes.',
      'Comparing a nominal figure from one projection against a real figure from another, which makes the two look far more different than they are.',
    ],
    faqs: [
      {
        question: 'What is the difference between the nominal and inflation-adjusted values?',
        answer:
          'The nominal value is the number of currency units the account is projected to hold. The inflation-adjusted value expresses that same balance in today purchasing power, by dividing it by a compounding inflation factor. If the projection shows $361,431.80 nominal and $200,116.03 adjusted, the account holds the larger sum but buys roughly what the smaller sum buys today.',
      },
      {
        question: 'What return rate should I enter?',
        answer:
          'That is a judgement you have to make, and this calculator cannot make it for you. Rather than searching for a single correct figure, enter several — a conservative one, a moderate one, and an optimistic one — and look at the range of results. The width of that range is usually the most useful output.',
      },
      {
        question: 'Why does this differ from the compound interest calculator?',
        answer:
          'The compound interest calculator lets you choose a compounding frequency and focuses on the mechanics of compounding itself. This one fixes compounding at monthly and adds an inflation adjustment, so it is oriented toward long-horizon planning in real terms rather than toward comparing compounding schedules.',
      },
      {
        question: 'Does the calculator account for taxes on gains?',
        answer:
          'No. It projects gross growth. Depending on the account type and jurisdiction, tax may be due annually on gains or deferred until withdrawal, and the two produce materially different outcomes over long periods. Entering a lower rate is a rough way to approximate an ongoing tax drag.',
      },
      {
        question: 'What happens if I stop contributing partway through?',
        answer:
          'The projection assumes contributions continue uninterrupted for the full term, so it cannot model a pause directly. A reasonable approximation is to run it twice: once for the contributing years, then again using that ending balance as the initial investment with the contribution set to zero for the remaining years.',
      },
      {
        question: 'Is a higher return always better than a longer term?',
        answer:
          'Not necessarily, and the calculator is a good way to test this. Because time appears in the exponent, extending the horizon often outweighs a modest increase in the assumed rate. Running both variations against the same baseline shows which lever is doing more work in your particular case.',
      },
    ],
  },

  'roi-calculator': {
    slug: 'roi-calculator',
    longIntro: [
      'Return on investment is the most widely used measure of whether something was worth doing, and its appeal is its simplicity: compare what you got back against what you put in, and express the difference as a percentage of the cost. That single number can be applied to a stock position, a piece of equipment, a marketing campaign, or a renovation, which is precisely why it travels so well between contexts.',
      'The same simplicity is its main limitation. A plain ROI figure contains no information about how long the money was committed. A 40% return is excellent over three years and unremarkable over fifteen, yet both produce the identical percentage. Comparing two investments on total ROI alone quietly rewards whichever one was held longer.',
      'This is why the calculator reports an annualized figure alongside the simple one whenever you supply a holding period. Annualized ROI restates the total return as the constant yearly rate that would have produced it, which puts investments of different durations on a common footing. When you are ranking options rather than just measuring one, the annualized figure is almost always the one to compare.',
    ],
    howItWorks: [
      'The calculator first computes net profit as the final value minus the initial investment. This figure can be negative, and the calculator handles losses as ordinary results rather than errors.',
      'Simple ROI is that net profit divided by the initial investment, expressed as a percentage. The denominator is always the amount invested, never the final value, which is what distinguishes ROI from a margin calculation.',
      'If you supply a number of years greater than zero, the calculator also annualizes. It raises the ratio of final value to initial investment to the power of one divided by the number of years, subtracts one, and converts to a percentage. This is the same mathematics as a compound annual growth rate.',
      'A total loss is handled as a special case: if the final value is zero or below, the annualized return is reported as -100%, since the entire investment was lost regardless of how long it took.',
    ],
    formula: 'ROI = (Net Profit / Cost of Investment) × 100',
    formulaExplanation:
      'Net profit is the final value minus the initial investment, and the denominator is the initial investment. The annualized form is ((Final Value / Initial Investment)^(1/years) − 1) × 100, which converts a cumulative return into the constant yearly rate that would compound to the same total. Note that the two answers are only equal when the holding period is exactly one year.',
    workedExamples: [
      {
        title: 'Example 1 — A gain held for three years',
        scenario: 'Initial investment $15,000 · Final value $21,000 · Held 3 years',
        steps: [
          'Net profit = 21,000 − 15,000 = $6,000',
          'ROI = 6,000 ÷ 15,000 × 100 = 40%',
          'Annualized = ((21,000 ÷ 15,000)^(1/3) − 1) × 100',
          '(1.4)^(1/3) ≈ 1.1187',
          'Annualized ROI ≈ 11.87%',
        ],
        result: 'Total ROI 40%, net profit $6,000, and an annualized ROI of 11.87%.',
        takeaway:
          'Notice that 40% over three years is not roughly 13.3% per year. Dividing by the number of years ignores compounding and overstates the annual rate. The correct annualized figure is 11.87%, because each year growth applies to a balance that already includes the previous years gains.',
      },
      {
        title: 'Example 2 — A loss, and why the sign matters',
        scenario: 'Initial investment $8,000 · Final value $7,200 · Held 2 years',
        steps: [
          'Net profit = 7,200 − 8,000 = −$800',
          'ROI = −800 ÷ 8,000 × 100 = −10%',
          'Annualized = ((7,200 ÷ 8,000)^(1/2) − 1) × 100',
          '(0.9)^(1/2) ≈ 0.9487',
          'Annualized ROI ≈ −5.13%',
        ],
        result: 'Total ROI −10%, net profit −$800, and an annualized ROI of −5.13%.',
        takeaway:
          'Losses annualize in the same way gains do. A 10% loss spread over two years is about −5.13% per year, not −5%, because the second year percentage applies to an already reduced balance. The asymmetry of percentages is easy to miss: recovering from a 10% loss requires an 11.1% gain, not a 10% one.',
      },
    ],
    whenToUse: [
      'Use this calculator when you have a clear starting cost and a clear ending value, and you want a single percentage that describes the outcome.',
      'Supply the holding period whenever you intend to compare results. Without annualizing, an investment held twice as long gets unearned credit for the extra time.',
      'It is not the right tool for investments with irregular contributions or withdrawals during the holding period. Money flowing in and out at different times requires an internal rate of return calculation, which weights each cash flow by when it occurred.',
    ],
    factors: [
      {
        title: 'The holding period',
        detail:
          'Time is the most commonly omitted variable in ROI comparisons. Two investments with identical total returns are not equivalent if one took two years and the other took ten. Always annualize before ranking.',
      },
      {
        title: 'What you include in the cost',
        detail:
          'The denominator should capture everything the investment required: purchase price, fees, commissions, setup costs, and any subsequent capital added. Understating the cost inflates the return.',
      },
      {
        title: 'Whether the return is realised',
        detail:
          'An ROI calculated on a current market value is a paper figure that will change tomorrow. An ROI calculated on an actual sale price is settled. Treating the first as though it were the second is a frequent source of overstatement.',
      },
      {
        title: 'Taxes and transaction costs',
        detail:
          'Gross ROI ignores the tax due on a gain and the costs of entering and exiting. Both reduce what you actually keep, and for short holding periods transaction costs can consume a large share of the return.',
      },
      {
        title: 'Opportunity cost',
        detail:
          'A positive ROI is not automatically a good outcome. The relevant comparison is against what the same capital would have produced elsewhere over the same period, not against zero.',
      },
    ],
    assumptions: [
      'Returns are treated as realised rather than as unrealised paper gains.',
      'No additional costs or fees beyond the initial investment are included.',
      'The time period is measured in whole or fractional years for annualization.',
      'No cash flows enter or leave the investment during the holding period.',
      'A final value of zero or less is reported as an annualized return of −100%.',
    ],
    commonMistakes: [
      'Comparing the ROI of investments with different time horizons without annualizing first.',
      'Dividing total ROI by the number of years instead of annualizing — this ignores compounding and overstates the yearly rate.',
      'Ignoring fees, taxes, or opportunity costs, all of which reduce the return you actually keep.',
      'Using ROI for investments with irregular cash flows, where an internal rate of return is the appropriate measure.',
      'Dividing profit by the final value instead of the initial investment, which produces a margin rather than a return.',
    ],
    faqs: [
      {
        question: 'What is the difference between ROI and annualized ROI?',
        answer:
          'Simple ROI measures the total percentage gain or loss over the entire holding period, with no reference to how long that period was. Annualized ROI converts that total into the constant yearly rate that would compound to the same result. They are equal only when the holding period is exactly one year.',
      },
      {
        question: 'Why can I not just divide total ROI by the number of years?',
        answer:
          'Because returns compound. A 40% total return over three years divided by three gives 13.3%, but compounding 13.3% for three years produces about 45.4%, not 40%. The correct annualized rate is 11.87%. Dividing always overstates the annual figure for positive returns.',
      },
      {
        question: 'How is ROI different from CAGR?',
        answer:
          'Annualized ROI and CAGR are the same calculation applied with different framing. ROI starts from a cost and a return and is usually applied to a decision or a project, while CAGR starts from two point-in-time values and is usually applied to a growth series. If you enter the same numbers into both calculators, the annualized figures will match.',
      },
      {
        question: 'How does ROI differ from ROAS?',
        answer:
          'ROAS divides revenue by advertising spend and produces a ratio, ignoring the cost of delivering that revenue. ROI divides profit by total cost and produces a percentage. A campaign can show a strong ROAS and still deliver a negative ROI once the cost of goods is subtracted.',
      },
      {
        question: 'Can ROI be greater than 100%?',
        answer:
          'Yes. An ROI above 100% simply means the profit exceeded the original cost — an investment that grows from $10,000 to $25,000 returns 150%. There is no upper bound. The lower bound is −100%, which represents losing the entire investment.',
      },
      {
        question: 'Should I use the purchase price or the total cost as the denominator?',
        answer:
          'Use the total cost. Fees, commissions, improvements, and any capital added later are all part of what the investment required. Using only the headline purchase price understates the denominator and therefore overstates the return.',
      },
    ],
  },

  'cagr-calculator': {
    slug: 'cagr-calculator',
    longIntro: [
      'Compound annual growth rate describes how a value changed between two points in time by asking a specific question: what single, constant annual rate, compounded each year, would take the starting value to the ending value over exactly this many years? The answer is a smoothed rate that almost certainly never occurred in any individual year, and that is deliberate. The purpose is comparability, not description.',
      'This smoothing is what makes CAGR useful and what makes it easy to misread. A business whose revenue moved 50,000 to 90,000 over six years has a CAGR of 10.29% whether it climbed steadily, surged early and stalled, or fell for three years before recovering. The figure captures the endpoints and the elapsed time. Everything that happened in between is compressed out of it.',
      'Because it accounts for compounding, CAGR is a much better basis for comparison than total growth. Total growth rewards longer measurement windows automatically. CAGR normalises for time, which is what lets you meaningfully compare a four-year series against a six-year one, or one investment against another that was held for a different duration.',
    ],
    howItWorks: [
      'The calculator divides the ending value by the starting value to get the total growth multiple. A value that grew from 50,000 to 90,000 has a multiple of 1.8.',
      'It then takes the nth root of that multiple, where n is the number of years. Taking a root is the inverse of raising to a power, so this unwinds the compounding and recovers the per-year factor.',
      'Subtracting one converts that per-year factor into a growth rate, and multiplying by 100 expresses it as a percentage. A per-year factor of 1.1029 becomes a CAGR of 10.29%.',
      'Alongside the rate, the calculator reports absolute growth (the raw difference between the two values) and total growth as a percentage of the starting value. Showing both prevents the smoothed rate from being mistaken for the cumulative change.',
      'The calculator requires a positive starting value and a positive number of years, since neither a zero base nor a zero duration produces a meaningful rate. An ending value of exactly zero is reported as −100%.',
    ],
    formula: 'CAGR = (End Value / Start Value)^(1/Years) - 1',
    formulaExplanation:
      'The ratio of end value to start value is the total growth multiple over the whole period. Raising it to the power of 1/Years takes the nth root, converting that cumulative multiple into the equivalent per-year multiple. Subtracting one turns a multiple into a rate: a factor of 1.1029 becomes a growth rate of 0.1029, or 10.29%.',
    workedExamples: [
      {
        title: 'Example 1 — Strong growth over six years',
        scenario: 'Start value $50,000 · End value $90,000 · 6 years',
        steps: [
          'Growth multiple = 90,000 ÷ 50,000 = 1.8',
          'Per-year factor = 1.8^(1/6) ≈ 1.10292',
          'CAGR = (1.10292 − 1) × 100 ≈ 10.29%',
          'Absolute growth = 90,000 − 50,000 = $40,000',
          'Total growth = 40,000 ÷ 50,000 × 100 = 80%',
        ],
        result:
          'CAGR 10.29%, absolute growth $40,000, total growth 80% across the full six-year period.',
        takeaway:
          'The value grew 80% in total, but the annual rate is 10.29%, not 80 divided by 6, which would be 13.3%. The difference exists because each year growth compounds on the previous years result. Dividing total growth by the number of years always produces a figure that is too high.',
      },
      {
        title: 'Example 2 — Modest growth over four years',
        scenario: 'Start value $120,000 · End value $145,000 · 4 years',
        steps: [
          'Growth multiple = 145,000 ÷ 120,000 ≈ 1.20833',
          'Per-year factor = 1.20833^(1/4) ≈ 1.04841',
          'CAGR = (1.04841 − 1) × 100 ≈ 4.84%',
          'Absolute growth = 145,000 − 120,000 = $25,000',
          'Total growth = 25,000 ÷ 120,000 × 100 ≈ 20.83%',
        ],
        result: 'CAGR 4.84%, absolute growth $25,000, total growth 20.83% over four years.',
        takeaway:
          'Compare this against the first example. The absolute gain here is $25,000 against $40,000, but the more telling difference is the rate: 4.84% against 10.29%. CAGR is what allows the two to be compared at all, since the periods and the starting bases are different.',
      },
    ],
    whenToUse: [
      'Use CAGR when you have a starting value, an ending value, and the time between them, and you want a rate that can be compared against other periods or other investments.',
      'It works well for smoothing out volatile series — revenue, subscriber counts, portfolio values — where year-to-year swings obscure the underlying trend.',
      'Avoid it for periods shorter than a year, where annualizing a brief result implies a durability the data does not support, and for series with contributions or withdrawals, since those distort the relationship between the two endpoints.',
    ],
    factors: [
      {
        title: 'Choice of starting point',
        detail:
          'CAGR depends entirely on two values, so the start date has enormous influence. Beginning a measurement at an unusually low point produces a flattering rate, and beginning at a peak produces a poor one, without anything about the underlying performance changing.',
      },
      {
        title: 'Length of the period',
        detail:
          'Longer periods produce more stable rates because individual anomalies carry less weight. Very short periods can yield rates that look dramatic but rest on a single unusual movement.',
      },
      {
        title: 'Volatility that the smoothing hides',
        detail:
          'Two series with the same CAGR can have entirely different risk profiles. One may have moved gradually, the other may have halved and then quadrupled. The rate cannot distinguish between them.',
      },
      {
        title: 'Cash flows during the period',
        detail:
          'CAGR assumes nothing was added or withdrawn. If money entered or left the account, the ending value reflects those flows as well as growth, and the resulting rate will be misleading.',
      },
      {
        title: 'The base effect',
        detail:
          'Growth from a small starting value produces large percentage rates easily. A rise from 1,000 to 2,000 is a 100% gain; the same absolute gain from 100,000 is 1%. Always read a rate alongside the absolute figures.',
      },
    ],
    assumptions: [
      'Growth is smoothed to a constant rate — actual year-to-year changes may vary significantly.',
      'No cash flows, contributions, or withdrawals occurred during the period.',
      'The start value is positive and the number of years is greater than zero.',
      'The period is measured in years, and fractional years are permitted.',
      'An ending value of zero is reported as a growth rate of −100%.',
    ],
    commonMistakes: [
      'Assuming CAGR means the value grew by that percentage every year — it is a smoothed average that accounts for compounding, not a description of any actual year.',
      'Using CAGR for periods under one year, where the annualized figure implies a consistency the data cannot support.',
      'Dividing total growth by the number of years instead of taking the nth root, which overstates the rate.',
      'Cherry-picking start and end dates to produce a favourable figure.',
      'Applying CAGR to an account that received deposits during the period, which attributes contributed capital to growth.',
    ],
    faqs: [
      {
        question: 'What counts as a good CAGR?',
        answer:
          'There is no universal threshold, and any figure quoted as one should be treated sceptically. A rate is only meaningful against a specific comparison: another investment over the same period, an index, inflation, or the cost of the capital involved. In isolation a CAGR describes an outcome without evaluating it.',
      },
      {
        question: 'What is the difference between CAGR and average annual return?',
        answer:
          'A simple average adds the yearly returns and divides by the count, ignoring compounding. CAGR accounts for it. A series that gains 50% then loses 50% has a simple average of 0% but a CAGR of about −13.4%, because the ending value is 75% of the start. CAGR reflects what actually happened to the balance.',
      },
      {
        question: 'Can CAGR be negative?',
        answer:
          'Yes. If the ending value is below the starting value, the rate is negative and describes the constant annual rate of decline. The calculator handles this normally. The floor is −100%, which corresponds to the value falling to zero.',
      },
      {
        question: 'Why does CAGR give a lower number than total growth divided by years?',
        answer:
          'Because compounding means later years operate on a larger base. To reach 80% total growth over six years, the rate only needs to be 10.29% per year, since each year builds on the last. Simple division assumes every year grows from the original base, which requires a higher rate to reach the same endpoint.',
      },
      {
        question: 'Should I use CAGR or ROI?',
        answer:
          'Use CAGR when you want a per-year rate for comparing periods of different lengths. Use ROI when you want the total return on a specific cost. The annualized ROI figure is mathematically identical to CAGR, so the choice is mostly about which framing fits the question.',
      },
      {
        question: 'Does CAGR work with fractional years?',
        answer:
          'Yes. The exponent accepts any positive number, so a period of 2.5 years is handled correctly. Be cautious with very short fractions, however, since annualizing a few months of movement projects a short-term result across a full year.',
      },
    ],
  },

  'simple-interest-calculator': {
    slug: 'simple-interest-calculator',
    longIntro: [
      'Simple interest is calculated on the original principal and nothing else. The interest earned or owed in the tenth year is identical to the interest in the first, because the base never changes. This produces growth in a straight line rather than a curve, which makes simple interest both easy to compute mentally and meaningfully different in outcome from compound interest over long periods.',
      'It is not merely a teaching device. Simple interest governs real arrangements: many short-term instruments, certain fixed-term notes, some car and personal loans, most bond coupon payments, and a variety of informal or contractual agreements where the parties want the amount owed to be predictable rather than accelerating.',
      'Understanding it matters most as a point of contrast. The gap between simple and compound interest is small over a year and substantial over decades, and knowing which one applies to a given arrangement is often more consequential than a difference of a percentage point in the stated rate.',
    ],
    howItWorks: [
      'The calculator multiplies three values: the principal, the annual rate expressed as a decimal, and the number of years. The product is the total interest for the entire term.',
      'The total amount is then the principal plus that interest. Because interest is never added to the base, the principal used in the calculation is the same at the end of the term as it was at the start.',
      'The year-by-year breakdown is generated by computing the cumulative interest at each year mark: principal multiplied by rate multiplied by the year number. Each year adds exactly the same increment, which is why the schedule increases in equal steps.',
      'Fractional years are handled directly by the same multiplication, so a term of six months is entered as 0.5 and produces half of one years interest.',
    ],
    formula: 'A = P(1 + rt)  |  Interest = P × r × t',
    formulaExplanation:
      'P is the principal, r is the annual interest rate as a decimal, and t is the time in years. Interest is the straightforward product of the three. Note what is absent compared with the compound interest formula: there is no exponent anywhere. Time enters as a multiplier rather than as a power, which is precisely why the growth is linear.',
    workedExamples: [
      {
        title: 'Example 1 — A three-year term',
        scenario: 'Principal $12,000 · Annual rate 4.5% · 3 years',
        steps: [
          'Rate as a decimal = 4.5 ÷ 100 = 0.045',
          'Interest = 12,000 × 0.045 × 3',
          'Annual interest = 12,000 × 0.045 = $540 per year',
          'Total interest = 540 × 3 = $1,620',
          'Total amount = 12,000 + 1,620 = $13,620',
        ],
        result: 'Total interest $1,620 and a final balance of $13,620.',
        takeaway:
          'Each year adds exactly $540, without variation. The year-by-year schedule runs $540, $1,080, $1,620 — equal steps, because the $540 earned in year one never becomes part of the base that generates year two interest.',
      },
      {
        title: 'Example 2 — Five years, and the contrast with compounding',
        scenario: 'Principal $25,000 · Annual rate 6% · 5 years',
        steps: [
          'Rate as a decimal = 6 ÷ 100 = 0.06',
          'Annual interest = 25,000 × 0.06 = $1,500 per year',
          'Total interest = 1,500 × 5 = $7,500',
          'Total amount = 25,000 + 7,500 = $32,500',
          'For contrast, the same sum compounded annually would reach about $33,456',
        ],
        result: 'Total interest $7,500 and a final balance of $32,500.',
        takeaway:
          'Over five years the difference between simple and annual compounding is roughly $956, about 3.8% of the principal. Over thirty years at the same rate the gap becomes far larger, because compound growth accelerates while simple growth continues adding the same $1,500 every year.',
      },
    ],
    whenToUse: [
      'Use this calculator when interest is genuinely charged or earned on the original principal only — certain short-term loans, fixed-term notes, bond coupons, and agreements that specify simple interest.',
      'It is also useful as a deliberate comparison: running the same principal, rate, and term through both this calculator and the compound interest calculator quantifies exactly what compounding is worth in a given situation.',
      'Do not use it to project savings or investment growth where interest is reinvested. Reinvested interest compounds by definition, and modelling it as simple interest understates the outcome, increasingly so as the term lengthens.',
    ],
    factors: [
      {
        title: 'Whether interest actually compounds',
        detail:
          'This is the decisive question and it is determined by the agreement, not by preference. Read the terms. An arrangement that credits interest to the balance is compounding regardless of how the rate is described.',
      },
      {
        title: 'Length of the term',
        detail:
          'Time enters as a plain multiplier, so doubling the term exactly doubles the interest. This is the clearest structural difference from compound interest, where doubling the term more than doubles the result.',
      },
      {
        title: 'The principal',
        detail:
          'Because the base never changes, interest is strictly proportional to the principal. Twice the principal produces exactly twice the interest for the same rate and term.',
      },
      {
        title: 'How the rate is quoted',
        detail:
          'A rate quoted per month or per quarter must be converted to an annual figure before entry, or the term must be expressed in matching units. Mixing a monthly rate with a term in years is a common and costly error.',
      },
      {
        title: 'Day-count conventions',
        detail:
          'Real agreements may count a year as 360 or 365 days, which slightly changes interest on partial periods. This calculator uses plain decimal years and does not model those conventions.',
      },
    ],
    assumptions: [
      'The interest rate is constant for the whole term.',
      'Interest does not compound and is never added to the principal.',
      'No fees, taxes, or penalties are included.',
      'The term is expressed in years, and fractional years are permitted.',
      'No payments are made against the principal during the term.',
    ],
    commonMistakes: [
      'Using simple interest for long-term projections where compound interest actually applies, which understates the result significantly.',
      'Confusing simple interest with compound interest — compounding always yields more over any term longer than one period.',
      'Entering a monthly or quarterly rate as though it were annual, which multiplies the interest by twelve or four.',
      'Assuming a loan described as having a fixed rate uses simple interest; most amortizing loans charge interest on the outstanding balance.',
      'Forgetting to convert a term in months to years — eighteen months is 1.5, not 18.',
    ],
    faqs: [
      {
        question: 'When is simple interest actually used?',
        answer:
          'It appears in short-term loans, some car and personal loan agreements, bond coupon payments, certain promissory notes, and many informal lending arrangements. It is most common where the term is short or where both parties want the total cost fixed and easy to verify in advance.',
      },
      {
        question: 'How much less is simple interest than compound interest?',
        answer:
          'The gap depends entirely on the rate and the term. On $25,000 at 6% for five years, simple interest gives $7,500 and annual compounding gives about $8,456 — a difference of roughly $956. Stretch the same figures to thirty years and the difference grows to many times the principal, because one grows linearly and the other exponentially.',
      },
      {
        question: 'Can I use this calculator for a period of months?',
        answer:
          'Yes. Convert the months to a decimal fraction of a year: six months is 0.5, eighteen months is 1.5, and nine months is 0.75. The formula handles fractional terms correctly since time is a plain multiplier.',
      },
      {
        question: 'Why does the yearly breakdown increase in equal steps?',
        answer:
          'Because the interest each year is calculated on the original principal, which never changes. The same rate applied to the same base produces the same amount every year, so the cumulative total rises by an identical increment each time.',
      },
      {
        question: 'Is simple interest better for a borrower or a lender?',
        answer:
          'For a borrower, simple interest costs less than compound interest at the same rate and term. For a lender or saver, it earns less. This is why the distinction matters in both directions and why it is worth confirming which method an agreement actually uses.',
      },
      {
        question: 'Does this calculator handle loan repayments?',
        answer:
          'No. It assumes the principal remains untouched for the full term. An amortizing loan, where each payment reduces the outstanding balance, charges interest on that declining balance instead. For that, use the loan calculator or the personal loan calculator.',
      },
    ],
  },
};
