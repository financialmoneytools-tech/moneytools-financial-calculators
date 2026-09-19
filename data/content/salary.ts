import type { CalculatorContent } from '../registry';

/**
 * Educational content for the salary calculators.
 * See data/calculator-content.ts for how these modules are assembled.
 */
export const salaryContent: Record<string, CalculatorContent> = {
  'salary-calculator': {
    slug: 'salary-calculator',
    longIntro: [
      'Compensation is quoted in whatever unit suits the arrangement. Contract and shift work is priced per hour, professional roles are advertised as an annual figure, and payroll may run weekly, every two weeks, twice a month, or monthly. These are all descriptions of the same underlying rate, but they are not directly comparable until they are converted to a common basis.',
      'The conversion is not merely arithmetic, because it depends on two assumptions that are easy to leave implicit. How many hours constitute a working week, and how many weeks are worked in a year? A role at 37.5 hours a week is not the same as one at 40, and a year with unpaid leave is not the same as one with 52 paid weeks. Changing either assumption changes every derived figure.',
      'One conversion in particular causes recurring confusion at the point where it matters most. Being paid every two weeks is not the same as being paid twice a month. Bi-weekly produces 26 pay periods a year; semi-monthly produces 24. The annual total is identical, but the individual payments differ, and budgeting from the wrong one leaves a gap twice a year.',
      'This calculator converts a figure in any pay period into every other, holding your hours and weeks assumptions constant so the comparison is consistent. All figures are gross, before any deductions.',
    ],
    howItWorks: [
      'The calculator first converts whatever you entered into an annual equivalent, then derives every other period from that annual figure. Routing everything through a single annual value keeps the conversions internally consistent.',
      'Hours worked per year is hours per week multiplied by weeks per year. An hourly rate becomes annual by multiplying by that figure; annual becomes hourly by dividing by it.',
      'Weekly is annual divided by weeks per year, and bi-weekly is annual divided by half that number, since a bi-weekly payment covers two weeks.',
      'Semi-monthly is always annual divided by 24, because there are exactly two pay periods in each of the twelve months. Monthly is annual divided by 12. Neither depends on the weeks-per-year setting.',
      'The daily rate assumes eight-hour days, so working days per week is derived as hours per week divided by eight. At 40 hours this gives five days; at 37.5 hours it gives 4.6875, which is a mathematical convenience rather than a real schedule.',
    ],
    formula:
      'Annual = Hourly × Hours/Week × Weeks/Year\nHourly = Annual / (Hours/Week × Weeks/Year)',
    formulaExplanation:
      'Every conversion passes through the annual figure. Hours per year is the product of hours per week and weeks per year, and it links hourly rates to all period-based figures. Note that semi-monthly and monthly divide the annual figure by 24 and 12 respectively and are therefore unaffected by the hours and weeks assumptions, while hourly, daily, weekly, and bi-weekly all depend on them.',
    workedExamples: [
      {
        title: 'Example 1 — From an hourly rate to every other period',
        scenario: 'Hourly rate $32.50 · 40 hours per week · 52 weeks per year',
        steps: [
          'Hours per year = 40 × 52 = 2,080',
          'Annual = 32.50 × 2,080 = $67,600',
          'Monthly = 67,600 ÷ 12 ≈ $5,633.33',
          'Semi-monthly = 67,600 ÷ 24 ≈ $2,816.67',
          'Bi-weekly = 67,600 ÷ 26 = $2,600',
          'Weekly = 67,600 ÷ 52 = $1,300 · Daily (5-day week) = $260',
        ],
        result:
          'Annual $67,600 · Monthly $5,633.33 · Semi-monthly $2,816.67 · Bi-weekly $2,600 · Weekly $1,300 · Daily $260.',
        takeaway:
          'Compare the bi-weekly figure of $2,600 against the semi-monthly figure of $2,816.67. Both total $67,600 a year, but bi-weekly pays 26 times and semi-monthly pays 24. Anyone budgeting monthly on a bi-weekly schedule should plan for the two months each year that contain three paydays rather than two.',
      },
      {
        title: 'Example 2 — From an annual salary with non-standard hours',
        scenario: 'Annual salary $78,000 · 37.5 hours per week · 50 weeks per year',
        steps: [
          'Hours per year = 37.5 × 50 = 1,875',
          'Hourly = 78,000 ÷ 1,875 = $41.60',
          'Weekly = 78,000 ÷ 50 = $1,560',
          'Bi-weekly = 78,000 ÷ 25 = $3,120',
          'Semi-monthly = 78,000 ÷ 24 = $3,250 · Monthly = 78,000 ÷ 12 = $6,500',
          'Working days per week = 37.5 ÷ 8 = 4.6875 · Daily = $332.80',
        ],
        result:
          'Hourly $41.60 · Daily $332.80 · Weekly $1,560 · Bi-weekly $3,120 · Semi-monthly $3,250 · Monthly $6,500.',
        takeaway:
          'The hours assumption drives the hourly figure entirely. At 1,875 hours a year the rate is $41.60; the same $78,000 across a standard 2,080 hours would be $37.50. That is a difference of more than four dollars an hour from nothing but the assumption, which is why two offers cannot be compared on salary alone.',
      },
    ],
    whenToUse: [
      'Use this calculator when comparing offers quoted in different units, such as an hourly contract rate against an annual salary.',
      'It is useful for translating a target annual income into the hourly rate a freelance or contract arrangement would need to reach it, once realistic working weeks are accounted for.',
      'It converts gross figures only. It does not calculate tax, deductions, or take-home pay, all of which depend on jurisdiction and individual circumstances.',
    ],
    factors: [
      {
        title: 'Hours per week',
        detail:
          'This assumption drives every hourly and daily figure. A 37.5-hour week against a 40-hour week changes the implied hourly rate by nearly 7% for the same annual salary.',
      },
      {
        title: 'Weeks per year',
        detail:
          'Using 52 assumes every week is paid. Entering fewer weeks models unpaid leave or gaps between contracts, which is usually the more realistic assumption for freelance and contract work.',
      },
      {
        title: 'Bi-weekly versus semi-monthly',
        detail:
          'These produce 26 and 24 payments respectively. The annual total is the same, but individual payments differ by roughly 8%, and the two extra paydays in a bi-weekly year fall in different months each year.',
      },
      {
        title: 'Benefits that carry real value',
        detail:
          'Health coverage, retirement contributions, paid leave, and equity can be worth a substantial share of total compensation. None of them appear in a salary figure, so comparing two offers on salary alone can rank them incorrectly.',
      },
      {
        title: 'Gross versus take-home',
        detail:
          'Every figure here is before tax and deductions. The gap between gross and net varies widely by jurisdiction and personal circumstances, so gross comparisons between locations can be misleading.',
      },
    ],
    assumptions: [
      'Hours worked per week are consistent throughout the year.',
      'All figures are gross, before tax and any other deductions.',
      'The daily rate assumes eight-hour working days.',
      'Semi-monthly is 24 payments and monthly is 12, independent of the weeks-per-year setting.',
      'No overtime, bonuses, commission, or benefits are included.',
    ],
    commonMistakes: [
      'Forgetting that gross salary differs from take-home pay after taxes and deductions.',
      'Not adjusting hours per week for part-time or non-standard schedules.',
      'Ignoring the value of benefits such as health insurance, retirement matching, and paid leave when comparing offers.',
      'Treating bi-weekly and semi-monthly as equivalent, when they pay 26 and 24 times respectively.',
      'Using 52 weeks for contract work that realistically includes unpaid gaps.',
    ],
    faqs: [
      {
        question: 'What is the difference between bi-weekly and semi-monthly pay?',
        answer:
          'Bi-weekly means every two weeks, producing 26 payments a year. Semi-monthly means twice a month, producing 24. On a $67,600 salary that is $2,600 bi-weekly against $2,816.67 semi-monthly. The annual total is identical, but a bi-weekly schedule delivers two months each year with three paydays.',
      },
      {
        question: 'Should I use 52 weeks or fewer?',
        answer:
          'Use 52 for salaried employment where leave is paid, since you are paid for every week regardless. For contract or freelance work, entering the number of weeks you realistically expect to bill gives a far more accurate hourly equivalent, because unpaid gaps are part of the economics.',
      },
      {
        question: 'Why does changing hours per week change my hourly rate so much?',
        answer:
          'Because the annual figure is divided by hours per year, and that total shifts proportionally. A $78,000 salary is $41.60 an hour at 1,875 hours but $37.50 at 2,080. The salary has not changed; only the number of hours it is spread across has.',
      },
      {
        question: 'Does this show my take-home pay?',
        answer:
          'No. Every figure is gross, before income tax, social contributions, and any other deductions. Take-home pay depends on jurisdiction, filing circumstances, and benefit elections, none of which this calculator models.',
      },
      {
        question: 'How do I compare a contract rate against a salaried offer?',
        answer:
          'Convert the contract rate using the weeks you realistically expect to work rather than 52, then add an allowance for benefits the salaried role provides and the contract does not — health coverage, retirement contributions, and paid leave. Comparing headline rates alone consistently favours the contract.',
      },
      {
        question: 'How is the daily rate calculated?',
        answer:
          'It assumes eight-hour days, deriving working days per week as hours per week divided by eight. At 40 hours this gives a clean five days. At 37.5 hours it gives 4.6875 days, which is a mathematical device rather than a real schedule, so treat the daily figure as an equivalent rather than a literal day rate.',
      },
    ],
  },
};
