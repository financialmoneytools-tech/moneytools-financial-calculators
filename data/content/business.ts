import type { CalculatorContent } from '../registry';

/**
 * Educational content for the business calculators.
 * See data/calculator-content.ts for how these modules are assembled.
 */
export const businessContent: Record<string, CalculatorContent> = {
  'profit-margin-calculator': {
    slug: 'profit-margin-calculator',
    longIntro: [
      'Profit is not a single number. A business has several profit figures, each measured after a different set of costs has been subtracted, and each answering a different question about how the business operates. Reporting one without specifying which is a frequent source of confusion.',
      'Gross profit subtracts only the direct cost of what was sold, so it measures whether the core product or service is priced above what it costs to deliver. Operating profit subtracts the cost of running the business as well, so it measures whether the operation as a whole is viable. Net profit subtracts everything else, including interest and tax, and is what remains.',
      'Reading all three together tells you far more than any one of them alone, because the gaps between them localise where money is going. A healthy gross margin paired with a thin net margin points to overhead rather than pricing. A weak gross margin means the problem starts at the product level, and no amount of overhead reduction will fix it.',
    ],
    howItWorks: [
      'The calculator starts from revenue and subtracts costs in three successive layers, computing a profit figure and a margin percentage at each stage.',
      'Gross profit is revenue minus the cost of goods sold, which covers the direct costs of producing or delivering what was sold — materials, direct labour, and per-unit delivery costs.',
      'Operating profit is gross profit minus operating expenses, which covers the costs of running the business regardless of sales volume: salaries, rent, software, marketing, and administration.',
      'Net profit is operating profit minus other expenses, a category that typically holds interest, tax, and one-off items that are not part of normal operations.',
      'Every margin uses revenue as the denominator, which is what makes the three percentages directly comparable to each other and to other periods.',
    ],
    formula:
      'Gross Margin = (Revenue - COGS) / Revenue × 100\nOperating Margin = (Gross Profit - OpEx) / Revenue × 100\nNet Margin = Net Profit / Revenue × 100',
    formulaExplanation:
      'All three margins divide by revenue, not by cost. This is the key structural difference from markup, which divides by cost. Because every margin shares the same denominator, the differences between them isolate exactly one layer of cost each: gross minus operating margin is overhead as a share of revenue, and operating minus net margin is interest, tax, and other items as a share of revenue.',
    workedExamples: [
      {
        title: 'Example 1 — A product business with heavy direct costs',
        scenario: 'Revenue $500,000 · COGS $300,000 · Operating expenses $120,000 · Other expenses $30,000',
        steps: [
          'Gross profit = 500,000 − 300,000 = $200,000',
          'Gross margin = 200,000 ÷ 500,000 × 100 = 40%',
          'Operating profit = 200,000 − 120,000 = $80,000',
          'Operating margin = 80,000 ÷ 500,000 × 100 = 16%',
          'Net profit = 80,000 − 30,000 = $50,000',
          'Net margin = 50,000 ÷ 500,000 × 100 = 10%',
        ],
        result: 'Gross margin 40%, operating margin 16%, net margin 10%.',
        takeaway:
          'The margin falls by 24 points from gross to operating, meaning overhead consumes nearly a quarter of revenue. A further 6 points go to other expenses. Each dollar of revenue leaves ten cents, so raising prices by even a few percent would move net profit substantially — the leverage is high precisely because the margin is thin.',
      },
      {
        title: 'Example 2 — A service business with low direct costs',
        scenario: 'Revenue $85,000 · COGS $25,500 · Operating expenses $34,000 · Other expenses $6,800',
        steps: [
          'Gross profit = 85,000 − 25,500 = $59,500',
          'Gross margin = 59,500 ÷ 85,000 × 100 = 70%',
          'Operating profit = 59,500 − 34,000 = $25,500',
          'Operating margin = 25,500 ÷ 85,000 × 100 = 30%',
          'Net profit = 25,500 − 6,800 = $18,700',
          'Net margin = 18,700 ÷ 85,000 × 100 = 22%',
        ],
        result: 'Gross margin 70%, operating margin 30%, net margin 22%.',
        takeaway:
          'A 70% gross margin is characteristic of service and software businesses, where delivering one more unit costs relatively little. Overhead still absorbs 40 points, which is the structural trade-off: low direct costs usually come with high fixed costs, so volume matters more than per-unit economics.',
      },
    ],
    whenToUse: [
      'Use this calculator to break a period result into its three profit layers and see where revenue is being consumed.',
      'It is most useful for comparing the same business across periods, where a change in the gap between two margins identifies which cost layer moved.',
      'It measures a period as a whole. For per-unit pricing decisions use the markup calculator, and for the volume needed to cover fixed costs use the break-even calculator.',
    ],
    factors: [
      {
        title: 'What you classify as COGS',
        detail:
          'Only direct costs of delivering the product belong here. Moving costs between COGS and operating expenses shifts the gross margin without changing net profit at all, which is why consistent classification matters more than the classification itself.',
      },
      {
        title: 'Industry structure',
        detail:
          'Margins vary enormously by sector. Grocery retail operates on low single-digit net margins by design; software often runs far higher. A margin is only interpretable against comparable businesses or against the same business in a prior period.',
      },
      {
        title: 'Pricing power',
        detail:
          'Because margins are ratios of revenue, a price increase that does not reduce volume flows almost entirely to profit. This is the single most powerful lever on every margin simultaneously.',
      },
      {
        title: 'Fixed versus variable cost mix',
        detail:
          'A business with high fixed costs sees margins improve sharply with volume and deteriorate sharply without it. One with mostly variable costs has steadier margins but less upside from growth.',
      },
      {
        title: 'One-off items',
        detail:
          'Unusual expenses in the other category can distort net margin for a single period. Comparing several periods reveals whether a change is structural or a one-time event.',
      },
    ],
    assumptions: [
      'All figures represent the same single accounting period.',
      'Revenue is net of returns, discounts, and allowances.',
      'Costs are correctly assigned to their respective categories.',
      'Other expenses capture interest, tax, and non-operating items.',
      'Revenue is positive; margins are undefined without it.',
    ],
    commonMistakes: [
      'Confusing markup with margin — they use different denominators and produce different numbers.',
      'Comparing margins across industries without context, where structural differences make the comparison meaningless.',
      'Including operating expenses in COGS, which understates gross margin and misplaces the source of a problem.',
      'Reading net margin alone without the gross and operating figures that show where the money went.',
      'Using revenue before returns and discounts, which inflates every margin.',
    ],
    faqs: [
      {
        question: 'What is the difference between gross, operating, and net margin?',
        answer:
          'Each subtracts one more layer of cost. Gross margin subtracts only direct production costs and measures product economics. Operating margin also subtracts the cost of running the business and measures operational viability. Net margin subtracts everything, including interest and tax, and shows what is finally left from each dollar of revenue.',
      },
      {
        question: 'What counts as cost of goods sold?',
        answer:
          'Costs that scale directly with what you sell: materials, direct labour used in production, manufacturing costs, and per-unit shipping or delivery. Rent, salaried staff, software subscriptions, and marketing are operating expenses, because they continue whether or not you sell an additional unit.',
      },
      {
        question: 'What is a good profit margin?',
        answer:
          'There is no universal answer, and figures quoted as universal should be treated with suspicion. Margins are structural properties of an industry. The useful comparisons are against your own prior periods and against businesses with a similar cost structure.',
      },
      {
        question: 'Why is my net margin so much lower than my gross margin?',
        answer:
          'Because operating expenses and other costs sit between them. The size of each gap tells you where revenue is going. A large drop from gross to operating points to overhead; a large drop from operating to net points to interest, tax, or unusual items.',
      },
      {
        question: 'How is margin different from markup?',
        answer:
          'Margin divides profit by the selling price; markup divides the same profit by the cost. A product costing $18 and selling for $45 carries a 150% markup but a 60% margin. Both describe the same $27 of profit from different reference points. The markup calculator converts between them.',
      },
      {
        question: 'Can I use this for a single product rather than a whole business?',
        answer:
          'Yes, provided you can attribute costs to that product sensibly. Direct costs are usually straightforward. Allocating shared overhead to one product is a judgement call, and different allocation methods produce different operating and net margins for the same product.',
      },
    ],
  },

  'markup-calculator': {
    slug: 'markup-calculator',
    longIntro: [
      'Markup and margin are the two ways of expressing the same profit as a percentage, and confusing them is one of the most expensive errors in pricing. The profit amount is identical either way. What differs is the denominator: markup divides by cost, margin divides by selling price. Because the selling price is always the larger number, the margin percentage is always smaller than the markup percentage for the same sale.',
      'The practical damage is specific and predictable. A business that wants a 40% margin but applies a 40% markup will systematically underprice every item it sells. A 40% markup produces only a 28.6% margin, and that shortfall repeats on every transaction. Across a year it can be the difference between profit and loss, and nothing in the daily numbers makes the error visible.',
      'The confusion persists because both are quoted as percentages of a price, and in conversation they sound interchangeable. They are not. Suppliers and trade publications often quote markup, while accountants and financial statements work in margin, so the same product is routinely described in both languages.',
      'This calculator computes both from the same inputs and shows them side by side, which makes the relationship concrete rather than theoretical. It also works in either direction: enter a selling price to see the resulting markup and margin, or enter a target markup to see the price it implies.',
    ],
    howItWorks: [
      'The calculator accepts a cost and then either a selling price or a markup percentage, and derives everything else from whichever you supply.',
      'If you enter a selling price, it computes profit as the price minus the cost, then expresses that profit as a percentage of cost to give the markup.',
      'If you enter a markup percentage instead, it works forward: the selling price is the cost multiplied by one plus the markup as a decimal.',
      'Margin is then computed from whichever selling price resulted, as profit divided by that selling price. This is what places the two percentages on a common basis.',
      'The two are related by a fixed formula in both directions: margin = markup ÷ (1 + markup), and markup = margin ÷ (1 − margin). Neither conversion depends on the actual cost, only on the percentage itself.',
    ],
    formula:
      'Markup = (Selling Price - Cost) / Cost × 100\nMargin = (Selling Price - Cost) / Selling Price × 100',
    formulaExplanation:
      'Both formulas have the same numerator, which is the profit on the sale. Only the denominator differs. Markup answers how much you added on top of what you paid; margin answers what share of the customer payment you kept. Because the selling price always exceeds the cost on a profitable sale, markup always exceeds margin, and the gap widens as prices rise relative to cost.',
    workedExamples: [
      {
        title: 'Example 1 — Retail pricing from cost to shelf price',
        scenario: 'Cost $18 · Selling price $45',
        steps: [
          'Profit = 45 − 18 = $27',
          'Markup = 27 ÷ 18 × 100 = 150%',
          'Margin = 27 ÷ 45 × 100 = 60%',
          'Check via the conversion: 150 ÷ (1 + 1.50) = 60% ✓',
        ],
        result: 'Markup 150%, margin 60%, profit $27 per unit.',
        takeaway:
          'The same $27 of profit is a 150% markup and a 60% margin. Neither figure is wrong; they answer different questions. If a supplier says this product carries a 150% markup and your accountant reports a 60% margin, both are describing this identical transaction.',
      },
      {
        title: 'Example 2 — Pricing forward from a target markup',
        scenario: 'Cost $240 · Target markup 35%',
        steps: [
          'Selling price = 240 × (1 + 0.35) = $324',
          'Profit = 324 − 240 = $84',
          'Margin = 84 ÷ 324 × 100 ≈ 25.93%',
          'Check via the conversion: 35 ÷ 1.35 ≈ 25.93% ✓',
        ],
        result: 'Selling price $324, markup 35%, margin 25.93%, profit $84 per unit.',
        takeaway:
          'This is where the error costs money. A 35% markup delivers only a 25.93% margin — more than nine points less than the number suggests. To actually achieve a 35% margin, the markup would need to be 35 ÷ (1 − 0.35) ≈ 53.8%, giving a price of about $369.',
      },
    ],
    whenToUse: [
      'Use this calculator when setting prices from cost, or when you need to convert between a markup and a margin that someone else has quoted.',
      'It is particularly useful when different parties in the same business use different conventions — purchasing quoting markup, finance reporting margin — and the numbers need reconciling.',
      'It prices a single unit. For whole-period profitability across all three profit layers use the profit margin calculator, and for the volume required to cover fixed costs use the break-even calculator.',
    ],
    factors: [
      {
        title: 'Which convention the quoted figure uses',
        detail:
          'Always establish whether a percentage refers to markup or margin before acting on it. The same number means materially different things, and the gap grows as the percentage rises.',
      },
      {
        title: 'Overhead beyond the unit cost',
        detail:
          'Markup is applied to direct cost only. It has to cover rent, salaries, and every other fixed cost as well as profit. A markup that looks generous per unit can still leave the business unprofitable once overhead is allocated.',
      },
      {
        title: 'Discounting',
        detail:
          'Discounts come out of margin directly, and their effect is larger than it appears. On a 25.93% margin, a 10% discount removes nearly 39% of the profit on that sale, because the discount is a percentage of price while the profit is a much smaller slice of it.',
      },
      {
        title: 'Cost accuracy',
        detail:
          'If the cost figure omits freight, duties, handling, or payment processing fees, every percentage derived from it is overstated. Landed cost, not invoice cost, is the correct input.',
      },
      {
        title: 'Volume and returns',
        detail:
          'Per-unit markup says nothing about how many units sell. A high markup on a slow-moving item can contribute less total profit than a low markup on a fast-moving one, and returns erode realised margin without changing the calculated figure.',
      },
    ],
    assumptions: [
      'The calculation covers a single product at a single price point.',
      'The cost entered is the full direct cost of acquiring or producing one unit.',
      'No volume discounts, tiered pricing, or promotional pricing are applied.',
      'Overhead, returns, and shrinkage are not allocated to the unit.',
      'Cost must be greater than zero for the percentages to be defined.',
    ],
    commonMistakes: [
      'Confusing markup with margin — a 50% markup is NOT a 50% margin; it is a 33.3% margin.',
      'Applying a target margin percentage as a markup, which underprices every unit systematically.',
      'Setting markup too low to cover overhead, leaving per-unit profit that the business as a whole never sees.',
      'Using invoice cost rather than landed cost, which omits freight, duties, and handling.',
      'Underestimating what a discount does to margin, since it is deducted from price but consumes profit.',
    ],
    faqs: [
      {
        question: 'What is the difference between markup and margin?',
        answer:
          'Markup is profit as a percentage of cost; margin is the same profit as a percentage of the selling price. A product costing $18 and selling for $45 has a 150% markup and a 60% margin. Because the selling price is always larger than the cost, markup is always the bigger number.',
      },
      {
        question: 'How do I convert markup to margin?',
        answer:
          'Margin = Markup ÷ (1 + Markup), using decimals. A 50% markup becomes 0.5 ÷ 1.5 = 33.3% margin. A 35% markup becomes 0.35 ÷ 1.35 ≈ 25.93%. The conversion depends only on the percentage, never on the actual cost.',
      },
      {
        question: 'How do I convert margin to markup?',
        answer:
          'Markup = Margin ÷ (1 − Margin). To achieve a 40% margin you need a markup of 0.4 ÷ 0.6 ≈ 66.7%. To achieve a 35% margin you need about 53.8%. Note that a margin of 50% requires a markup of 100%, and margins above 50% require markups above 100%.',
      },
      {
        question: 'Why does using the wrong one cost money?',
        answer:
          'Because applying a margin target as a markup always underprices. A business wanting a 40% margin that applies a 40% markup achieves only 28.6%, and that 11.4-point shortfall repeats on every sale. Nothing in the day-to-day figures reveals the error; it simply shows up as a thinner year.',
      },
      {
        question: 'Can markup be more than 100%?',
        answer:
          'Yes, and it is common. A markup of 150% means the selling price is 2.5 times the cost. Margin, by contrast, can never reach 100%, because that would require a selling price with zero cost. Any margin above 50% corresponds to a markup above 100%.',
      },
      {
        question: 'Does this calculator account for overhead?',
        answer:
          'No. It works from the direct unit cost you enter. The resulting markup has to cover both overhead and profit, so a healthy-looking per-unit figure does not guarantee the business is profitable. The profit margin calculator shows what remains after overhead across a full period.',
      },
    ],
  },

  'break-even-calculator': {
    slug: 'break-even-calculator',
    longIntro: [
      'The break-even point is the sales volume at which total revenue exactly equals total cost. Below it the business loses money; above it, it makes money. Locating that threshold converts a vague sense of whether something is viable into a specific number of units that can be tested against realistic demand.',
      'The concept rests on separating costs by behaviour rather than by category. Fixed costs stay the same regardless of volume — rent, salaries, software, insurance. Variable costs scale with each unit sold — materials, per-unit labour, shipping, payment processing. This split matters because only variable costs change when you sell one more unit.',
      'The difference between price and variable cost is the contribution margin, and it is the engine of the whole calculation. Each sale contributes that amount toward covering fixed costs. Once enough units have been sold that the accumulated contribution equals the fixed costs, the business breaks even, and every subsequent unit contributes directly to profit.',
    ],
    howItWorks: [
      'The calculator subtracts the variable cost per unit from the price per unit to get the contribution margin — the amount each sale contributes toward fixed costs.',
      'It rejects any case where the contribution margin is zero or negative, because a business losing money on every unit cannot reach break-even through volume. Selling more only deepens the loss.',
      'Break-even units is fixed costs divided by the contribution margin, and break-even revenue is that unit count multiplied by the price.',
      'The contribution margin ratio expresses the contribution margin as a percentage of price, showing what share of each sale is available to cover fixed costs.',
      'If a target profit is supplied, the calculator treats it as an additional fixed cost to be covered: units required become (fixed costs + target profit) divided by the contribution margin.',
    ],
    formula: 'Break-Even Units = Fixed Costs / (Price - Variable Cost per Unit)',
    formulaExplanation:
      'The denominator is the contribution margin per unit. Dividing total fixed costs by it answers how many units of contribution are needed to cover those fixed costs completely. For a target profit, add the desired profit to the fixed costs in the numerator, since profit is simply an additional amount that contribution must cover beyond the costs themselves.',
    workedExamples: [
      {
        title: 'Example 1 — A straightforward break-even point',
        scenario: 'Fixed costs $48,000 · Variable cost $14/unit · Price $39/unit',
        steps: [
          'Contribution margin = 39 − 14 = $25 per unit',
          'Contribution margin ratio = 25 ÷ 39 × 100 ≈ 64.1%',
          'Break-even units = 48,000 ÷ 25 = 1,920 units',
          'Break-even revenue = 1,920 × 39 = $74,880',
        ],
        result:
          'Break-even at 1,920 units, or $74,880 in revenue, with a contribution margin of $25 per unit (64.1% of price).',
        takeaway:
          'Every unit beyond 1,920 adds $25 of profit. The 64.1% contribution margin ratio also means that roughly 64 cents of every revenue dollar is available to cover fixed costs, which is what makes the fixed cost base recoverable at this volume.',
      },
      {
        title: 'Example 2 — Adding a profit target',
        scenario: 'Fixed costs $9,000 · Variable cost $3.20/unit · Price $12/unit · Target profit $15,000',
        steps: [
          'Contribution margin = 12 − 3.20 = $8.80 per unit',
          'Contribution margin ratio = 8.80 ÷ 12 × 100 ≈ 73.33%',
          'Break-even units = 9,000 ÷ 8.80 ≈ 1,022.73 units',
          'Break-even revenue ≈ $12,272.73',
          'For $15,000 profit: (9,000 + 15,000) ÷ 8.80 ≈ 2,727.27 units',
          'Revenue required ≈ $32,727.27',
        ],
        result:
          'Break-even at about 1,023 units; reaching $15,000 of profit requires about 2,728 units, or $32,727.27 in revenue.',
        takeaway:
          'The profit target requires roughly 2.67 times the break-even volume, not merely a little more. Because fixed costs are already covered at break-even, every unit after that point contributes its full $8.80, so the additional units needed for profit are simply the target divided by the contribution margin.',
      },
    ],
    whenToUse: [
      'Use this calculator when launching a product, evaluating a price change, or testing whether a fixed cost commitment such as a lease or a hire is supportable at realistic volumes.',
      'It is valuable as a reality check: comparing the break-even volume against what you can plausibly sell often settles a decision faster than a full projection.',
      'It assumes a single product at a single price. For a business selling many products at different margins, apply it per product line or use an average contribution margin ratio, accepting the approximation.',
    ],
    factors: [
      {
        title: 'Completeness of fixed costs',
        detail:
          'Every recurring cost that does not vary with volume belongs here — rent, salaries, software subscriptions, insurance, professional fees. Omitting any of them makes break-even look closer than it is.',
      },
      {
        title: 'Price relative to variable cost',
        detail:
          'The contribution margin drives everything. A small price increase can reduce the break-even volume sharply, because it raises the contribution on every unit simultaneously.',
      },
      {
        title: 'The cost structure itself',
        detail:
          'High fixed costs with low variable costs mean a distant break-even but strong profit growth beyond it. The reverse means an early break-even but slower profit accumulation. Neither is better in general; they carry different risks.',
      },
      {
        title: 'Whether variable cost is truly constant',
        detail:
          'Volume discounts on materials lower variable cost at higher quantities, while overtime or expedited shipping raise it. The calculation assumes a flat per-unit cost across all volumes.',
      },
      {
        title: 'Units produced versus units sold',
        detail:
          'The model assumes everything produced is sold. Unsold inventory consumes variable cost without generating contribution, which pushes the real break-even beyond the calculated figure.',
      },
    ],
    assumptions: [
      'Costs are cleanly separable into fixed and variable.',
      'Price and variable cost per unit are constant at every volume.',
      'All units produced are sold, with no unsold inventory.',
      'The price exceeds the variable cost per unit, so the contribution margin is positive.',
      'A single product at a single price is being analysed.',
    ],
    commonMistakes: [
      'Not including all fixed costs such as rent, salaries, and subscriptions, which understates the break-even point.',
      'Confusing total variable cost with variable cost per unit.',
      'Assuming the calculated break-even accounts for unsold inventory, which it does not.',
      'Treating a break-even volume as achievable without testing it against realistic demand.',
      'Applying a single contribution margin to a business selling products with very different margins.',
    ],
    faqs: [
      {
        question: 'What is a contribution margin?',
        answer:
          'It is the price of a unit minus its variable cost — the amount each sale contributes toward covering fixed costs. At a $39 price and $14 variable cost, each sale contributes $25. Once accumulated contribution equals fixed costs, the business breaks even, and every further unit contributes its full $25 to profit.',
      },
      {
        question: 'What counts as a fixed cost?',
        answer:
          'Any cost that does not change with sales volume: rent, salaried staff, insurance, software subscriptions, professional fees, and loan payments. Variable costs are those incurred per unit — materials, per-unit labour, shipping, and payment processing fees.',
      },
      {
        question: 'Why does the calculator reject my inputs sometimes?',
        answer:
          'Because it requires the price to exceed the variable cost per unit. If the contribution margin is zero or negative, each sale loses money and no volume can produce break-even. Selling more units makes the loss larger, so no valid answer exists.',
      },
      {
        question: 'How do I use this if I sell several products?',
        answer:
          'Either analyse each product line separately with its own share of fixed costs, or work with a weighted average contribution margin ratio across your sales mix. The second approach is quicker but only holds while the mix stays roughly constant.',
      },
      {
        question: 'Should I lower the price to sell more units?',
        answer:
          'A lower price reduces the contribution margin, which raises the break-even volume, so you must sell meaningfully more just to stand still. Running both prices through the calculator shows exactly how many additional units the lower price requires, which is the number to weigh against expected demand.',
      },
      {
        question: 'How does the target profit calculation work?',
        answer:
          'The target profit is added to fixed costs in the numerator, because profit is simply another amount that contribution must cover. With $9,000 of fixed costs and a $15,000 target at an $8.80 contribution margin, the requirement is (9,000 + 15,000) ÷ 8.80 ≈ 2,728 units.',
      },
    ],
  },

  'roas-calculator': {
    slug: 'roas-calculator',
    longIntro: [
      'Return on ad spend divides the revenue attributed to a campaign by the amount spent on it. A ROAS of 4 means four currency units of revenue for every one spent. It is the standard headline metric in advertising reporting, and taken alone it is one of the most consistently misleading numbers in business.',
      'The problem is that revenue is not profit. Delivering that revenue costs something — the product itself, fulfilment, payment processing — and ROAS ignores all of it. A campaign returning revenue at four times its cost is excellent if the gross margin is 60% and merely adequate if the margin is 25%. The same ratio describes both situations.',
      'The correction is the break-even ROAS: the ratio at which gross profit from a campaign exactly equals its cost. It is determined entirely by gross margin, and it is the threshold every campaign must clear before it contributes anything. A business with a 35% gross margin needs a ROAS above 2.86 simply to avoid losing money, which means a ROAS of 2.5 — a figure that sounds perfectly respectable — is a loss.',
      'This calculator reports both figures together, along with the actual profit and the ROI on the spend, so the headline ratio can be read against the threshold that gives it meaning rather than judged on its own.',
    ],
    howItWorks: [
      'ROAS is computed directly as attributed revenue divided by ad spend, producing a ratio rather than a percentage.',
      'Break-even ROAS is one divided by the gross margin expressed as a decimal. At a 62% margin the threshold is 1 ÷ 0.62 ≈ 1.61; at 35% it is 1 ÷ 0.35 ≈ 2.86. Lower margins demand much higher ROAS.',
      'Gross profit from the campaign is revenue multiplied by the gross margin percentage, which is the portion of revenue left after the direct cost of delivering it.',
      'Actual profit is that gross profit minus the ad spend. This figure, not ROAS, determines whether the campaign made money, and it can be negative while ROAS still looks healthy.',
      'ROI on the spend is profit divided by ad spend as a percentage, which restates the outcome in the same form used for other investments and makes it directly comparable.',
    ],
    formula: 'ROAS = Revenue / Ad Spend\nBreak-Even ROAS = 1 / Gross Margin %',
    formulaExplanation:
      'ROAS is a simple ratio of revenue to spend and says nothing about cost. Break-even ROAS inverts the gross margin to find the ratio at which gross profit exactly equals the spend. The comparison between the two is what matters: a campaign is profitable only when its ROAS exceeds its break-even ROAS, and the gap between them, not the ROAS itself, measures how well it performed.',
    workedExamples: [
      {
        title: 'Example 1 — A campaign that clears its threshold',
        scenario: 'Ad spend $12,000 · Attributed revenue $54,000 · Gross margin 62%',
        steps: [
          'ROAS = 54,000 ÷ 12,000 = 4.5',
          'Break-even ROAS = 1 ÷ 0.62 ≈ 1.61',
          'Gross profit = 54,000 × 0.62 = $33,480',
          'Profit = 33,480 − 12,000 = $21,480',
          'ROI = 21,480 ÷ 12,000 × 100 = 179%',
          'Cost per revenue dollar = 12,000 ÷ 54,000 ≈ $0.22',
        ],
        result: 'ROAS 4.5 against a break-even of 1.61, producing $21,480 profit and a 179% ROI on the spend.',
        takeaway:
          'The ROAS is nearly three times the threshold, so the campaign is genuinely profitable. Note how much work the 62% margin does: at that margin the bar is only 1.61, which is why a high-margin business can tolerate ROAS levels that would ruin a low-margin one.',
      },
      {
        title: 'Example 2 — A respectable-looking ROAS that loses money',
        scenario: 'Ad spend $8,000 · Attributed revenue $20,000 · Gross margin 35%',
        steps: [
          'ROAS = 20,000 ÷ 8,000 = 2.5',
          'Break-even ROAS = 1 ÷ 0.35 ≈ 2.86',
          'Gross profit = 20,000 × 0.35 = $7,000',
          'Profit = 7,000 − 8,000 = −$1,000',
          'ROI = −1,000 ÷ 8,000 × 100 = −12.5%',
          'ROAS 2.5 is below the 2.86 threshold',
        ],
        result: 'ROAS 2.5 against a break-even of 2.86, producing a $1,000 loss and a ROI of −12.5%.',
        takeaway:
          'A 2.5 ROAS would be reported as a success in most dashboards. It is not. At a 35% gross margin the campaign needed 2.86 just to break even, so it lost $1,000. This is the single most important reason never to evaluate ROAS without knowing the margin behind it.',
      },
    ],
    whenToUse: [
      'Use this calculator to judge whether a campaign is profitable rather than merely productive, by comparing its ROAS against the threshold your margin sets.',
      'It is useful for setting bidding targets in advance: the break-even ROAS tells you the minimum acceptable return before a campaign is worth running at all.',
      'It measures a campaign in isolation over a defined period. For the longer-run economics of acquiring customers who buy repeatedly, the LTV:CAC calculator is the appropriate tool.',
    ],
    factors: [
      {
        title: 'Gross margin',
        detail:
          'This sets the entire threshold. A business at 70% margin breaks even at a ROAS of about 1.43; one at 25% needs 4.0. The same campaign performance can be strongly profitable or loss-making depending on nothing but the margin.',
      },
      {
        title: 'Attribution accuracy',
        detail:
          'ROAS depends on correctly assigning revenue to the campaign. Overstated attribution inflates the ratio and makes losing campaigns look profitable. Revenue that would have arrived anyway should not be credited to the spend.',
      },
      {
        title: 'Costs beyond the advertising spend',
        detail:
          'Creative production, agency fees, platform charges, and staff time are real acquisition costs that ROAS excludes. Including them in the spend figure gives a more honest ratio.',
      },
      {
        title: 'Repeat purchases',
        detail:
          'ROAS typically counts only the first transaction. For businesses where customers return, this understates the value of acquisition, which is exactly what lifetime value analysis is designed to capture.',
      },
      {
        title: 'Returns and refunds',
        detail:
          'Revenue that is later refunded still appears in most campaign reporting. Where return rates are material, using net revenue rather than gross revenue avoids a systematic overstatement.',
      },
    ],
    assumptions: [
      'All revenue entered is genuinely attributable to the advertising spend.',
      'The gross margin percentage is accurate and consistent across the products sold.',
      'Ad spend captures the full cost of the campaign.',
      'Revenue is measured over the same period as the spend.',
      'Gross margin is between 0 and 100 percent, and ad spend is positive.',
    ],
    commonMistakes: [
      'Looking at ROAS without considering gross margin, which is what determines whether the figure is good or bad.',
      'Not accounting for customer acquisition costs beyond the raw ad spend, such as creative and agency fees.',
      'Treating ROAS as a profit measure when it is a revenue measure.',
      'Crediting revenue to a campaign that would have occurred without it.',
      'Comparing ROAS across businesses or product lines with different margin structures.',
    ],
    faqs: [
      {
        question: 'What is a good ROAS?',
        answer:
          'There is no universal figure, because the answer depends entirely on your gross margin. Compute your break-even ROAS as 1 ÷ margin, and anything above it is profitable. At a 62% margin the bar is 1.61; at 35% it is 2.86. A ROAS of 2.5 is excellent in the first case and a loss in the second.',
      },
      {
        question: 'How is ROAS different from ROI?',
        answer:
          'ROAS is a ratio of revenue to spend and ignores the cost of delivering that revenue. ROI is a percentage based on actual profit after all costs. The second example above has a ROAS of 2.5 and an ROI of −12.5%, which shows how far apart the two can be.',
      },
      {
        question: 'Why does my break-even ROAS seem so high?',
        answer:
          'Because your gross margin is low. Break-even ROAS is the reciprocal of the margin, so as the margin falls the required ratio rises steeply. At 20% margin you need a ROAS of 5.0 just to break even, which is why thin-margin businesses have so little room in paid acquisition.',
      },
      {
        question: 'Should I include agency fees and creative costs in ad spend?',
        answer:
          'Yes, if you want the figure to reflect reality. Those costs are part of what the campaign required. Excluding them produces a flattering ratio that overstates profitability, particularly on smaller campaigns where fixed production costs are a large share of the total.',
      },
      {
        question: 'Does ROAS account for repeat purchases?',
        answer:
          'Usually not. It typically captures the first transaction within the reporting window. If your customers buy repeatedly, a campaign below its break-even ROAS on the first purchase may still be worthwhile over the relationship. The LTV:CAC calculator addresses that longer view.',
      },
      {
        question: 'What does cost per revenue dollar mean?',
        answer:
          'It is ad spend divided by revenue, the inverse of ROAS expressed in currency. A ROAS of 4.5 means about $0.22 of advertising per revenue dollar. Some teams find this framing more intuitive, but it carries exactly the same limitation: it says nothing about the cost of delivering that revenue.',
      },
    ],
  },

  'ltv-cac-calculator': {
    slug: 'ltv-cac-calculator',
    longIntro: [
      'The LTV:CAC ratio compares what a customer is worth over the whole relationship against what it cost to acquire them. It is the central metric for any business where customers buy more than once, because it reframes acquisition as an investment with a return rather than as an expense to be minimised.',
      'This reframing changes what counts as a sensible decision. A campaign that loses money on the first purchase may be strongly profitable if customers return for years. Conversely, efficient-looking acquisition can destroy value if customers leave quickly. Neither conclusion is visible from single-transaction metrics.',
      'Two inputs do most of the work, and one of them is frequently overlooked. Churn determines how long a customer relationship lasts and therefore how many purchases it contains — at 25% annual churn the average relationship runs four years; at 50% it runs two. Gross margin determines how much of each purchase is actually worth anything. Using revenue instead of gross profit in the lifetime value calculation is the most common error, and it overstates the result by exactly the proportion that costs represent.',
      'Alongside the ratio, the calculator reports the payback period: how many months of gross profit are needed to recover the acquisition cost. That figure speaks to cash flow rather than profitability, and the two can point in different directions.',
    ],
    howItWorks: [
      'Annual revenue per customer is the average order value multiplied by the purchase frequency per year.',
      'That revenue is multiplied by the gross margin percentage to give annual gross profit per customer. This step is what makes the result a profit figure rather than a revenue figure.',
      'Lifetime value is annual gross profit divided by the annual churn rate. Dividing by churn works because the reciprocal of churn is the expected lifetime in years — 25% churn implies four years, 40% implies 2.5.',
      'Customer acquisition cost is total marketing spend divided by the number of new customers that spend produced.',
      'The ratio is lifetime value divided by acquisition cost, and the payback period is acquisition cost divided by monthly gross profit per customer, expressed in months.',
      'The calculator also returns a plain-language interpretation of the ratio, using the widely cited 3:1 level as a reference point rather than as a rule.',
    ],
    formula:
      'LTV = (AOV × Frequency × Gross Margin%) / Churn Rate\nCAC = Marketing Spend / New Customers\nRatio = LTV / CAC',
    formulaExplanation:
      'Dividing by the churn rate is the step that converts an annual figure into a lifetime one, because the reciprocal of an annual churn rate is the expected relationship length in years. Applying gross margin before that division is essential: it ensures lifetime value measures accumulated gross profit rather than accumulated revenue, which is the difference between a figure you can compare against cost and one you cannot.',
    workedExamples: [
      {
        title: 'Example 1 — An e-commerce business with frequent repeat purchases',
        scenario:
          'AOV $85 · 4 purchases per year · Gross margin 60% · Annual churn 25% · Marketing spend $45,000 · 600 new customers',
        steps: [
          'Annual revenue per customer = 85 × 4 = $340',
          'Annual gross profit = 340 × 0.60 = $204',
          'Expected lifetime = 1 ÷ 0.25 = 4 years',
          'LTV = 204 ÷ 0.25 = $816',
          'CAC = 45,000 ÷ 600 = $75',
          'Ratio = 816 ÷ 75 ≈ 10.88 · Payback = 75 ÷ (204 ÷ 12) ≈ 4.41 months',
        ],
        result:
          'LTV $816, CAC $75, ratio 10.88:1, payback period about 4.4 months.',
        takeaway:
          'A ratio near 11:1 is far above the 3:1 reference, which often indicates there is room to spend more on acquisition rather than cause for satisfaction. A very high ratio can mean growth is being left on the table because acquisition is underfunded.',
      },
      {
        title: 'Example 2 — Higher order value, shorter relationships',
        scenario:
          'AOV $320 · 1.5 purchases per year · Gross margin 45% · Annual churn 40% · Marketing spend $90,000 · 500 new customers',
        steps: [
          'Annual revenue per customer = 320 × 1.5 = $480',
          'Annual gross profit = 480 × 0.45 = $216',
          'Expected lifetime = 1 ÷ 0.40 = 2.5 years',
          'LTV = 216 ÷ 0.40 = $540',
          'CAC = 90,000 ÷ 500 = $180',
          'Ratio = 540 ÷ 180 = 3.0 · Payback = 180 ÷ (216 ÷ 12) = 10 months',
        ],
        result: 'LTV $540, CAC $180, ratio exactly 3.0:1, payback period 10 months.',
        takeaway:
          'The annual gross profit per customer is slightly higher than in the first example ($216 against $204), yet the ratio is less than a third as strong. Higher churn shortens the relationship and a higher CAC raises the cost, and the ten-month payback means considerably more working capital is tied up per customer.',
      },
    ],
    whenToUse: [
      'Use this calculator for subscription or repeat-purchase businesses, where a customer relationship extends well beyond the first transaction.',
      'It is useful for deciding whether acquisition spending should increase or decrease, and for seeing how much retention improvements are worth relative to acquisition efficiency.',
      'It is not suited to genuine one-off purchases with no repeat behaviour. For evaluating a single campaign in isolation, the ROAS calculator is the direct tool.',
    ],
    factors: [
      {
        title: 'Churn rate',
        detail:
          'The most powerful input, because lifetime value is inversely proportional to it. Halving churn from 40% to 20% doubles lifetime value with no change to pricing, frequency, or margin. Retention improvements are often cheaper than acquisition improvements.',
      },
      {
        title: 'Gross margin',
        detail:
          'Lifetime value must be built from gross profit, not revenue. Using revenue overstates it by exactly the proportion that costs represent, which makes unprofitable acquisition look sustainable.',
      },
      {
        title: 'Completeness of acquisition cost',
        detail:
          'CAC should include everything spent to win customers — advertising, sales salaries and commissions, agency fees, and tooling. Counting only media spend understates the cost and inflates the ratio.',
      },
      {
        title: 'Payback period and cash flow',
        detail:
          'A strong ratio with a long payback still consumes cash, because acquisition is paid now and recovered slowly. A business can be profitable on paper and constrained in practice.',
      },
      {
        title: 'Stability of the averages',
        detail:
          'Order value, frequency, and churn are averages that shift as the customer base changes. Cohorts acquired through different channels often behave very differently, so a blended figure can conceal a channel that is losing money.',
      },
    ],
    assumptions: [
      'Average order value, purchase frequency, and gross margin are representative averages.',
      'The churn rate is annual and constant over the customer relationship.',
      'All marketing spend entered is for acquisition rather than retention.',
      'Every new customer in the period was produced by that spend.',
      'Churn is greater than zero and no more than 100 percent, since a zero churn rate implies an infinite lifetime.',
    ],
    commonMistakes: [
      'Using revenue instead of gross profit for lifetime value, which overstates it substantially.',
      'Not including all acquisition costs in CAC, such as sales salaries, agency fees, and tooling.',
      'Ignoring that lifetime value assumptions change over time as the customer base evolves.',
      'Reading a high ratio as an unambiguous success when it may indicate underinvestment in growth.',
      'Blending channels with very different economics into a single ratio that hides a losing one.',
    ],
    faqs: [
      {
        question: 'What does the 3:1 ratio actually mean?',
        answer:
          'It is a widely cited reference point suggesting a customer should generate roughly three times their acquisition cost in gross profit, leaving room for overhead and profit after acquisition is paid for. It is a rule of thumb rather than a standard, and the appropriate level varies with margin structure, growth stage, and how long the payback period runs.',
      },
      {
        question: 'Why divide by the churn rate?',
        answer:
          'Because the reciprocal of an annual churn rate is the expected relationship length in years. At 25% churn a customer stays about four years, so annual gross profit divided by 0.25 gives the lifetime total. At 40% churn the expected lifetime is 2.5 years.',
      },
      {
        question: 'Should LTV use revenue or gross profit?',
        answer:
          'Gross profit, always. Revenue includes the cost of delivering the product, which is money you never keep. Using revenue inflates lifetime value by exactly the proportion that costs represent — at a 45% margin, using revenue would more than double the figure and make unprofitable acquisition appear sustainable.',
      },
      {
        question: 'Can the ratio be too high?',
        answer:
          'Arguably yes. A ratio well above 3:1, such as the 10.88 in the first example, often signals that acquisition is underfunded and growth is being left unrealised. If each customer returns nearly eleven times their acquisition cost, spending more to acquire additional customers may create more value than keeping the ratio high.',
      },
      {
        question: 'What is the payback period and why does it matter?',
        answer:
          'It is how many months of gross profit are needed to recover the acquisition cost. It matters because it governs cash flow rather than profitability. A ten-month payback ties up considerably more working capital per customer than a four-month one, even when both ratios look acceptable.',
      },
      {
        question: 'How is this different from ROAS?',
        answer:
          'ROAS measures revenue against spend for a single campaign, usually covering the first purchase only. LTV:CAC measures gross profit across the entire customer relationship against the full cost of acquisition. A campaign can fail on ROAS and succeed on LTV:CAC when customers return.',
      },
    ],
  },
};
