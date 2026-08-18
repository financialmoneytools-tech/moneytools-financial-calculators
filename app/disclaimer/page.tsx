import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'MoneyTools disclaimer — financial calculators provide estimates for educational purposes only.',
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-[#1e3a5f] tracking-tight mb-6">Disclaimer</h1>

      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          The calculators and tools provided on MoneyTools are for educational and informational purposes only.
          They are not intended to provide, and should not be relied upon for, financial, investment, tax,
          legal, or accounting advice.
        </p>

        <p>
          Results produced by these calculators are estimates based on the information you provide and the
          assumptions stated on each calculator page. Actual results may vary significantly due to factors
          including but not limited to: variable interest rates, fees, taxes, market conditions, individual
          financial circumstances, and changes in law or regulation.
        </p>

        <p>
          MoneyTools does not guarantee the accuracy, completeness, or timeliness of any information
          provided. While we make every effort to ensure our calculators produce mathematically correct
          results, errors may occur.
        </p>

        <p>
          You should consult with a qualified financial professional before making any financial decisions.
          MoneyTools is not a financial advisor, broker, or planner, and does not provide personalized
          financial advice.
        </p>

        <p>
          Use of MoneyTools is at your own risk. We are not liable for any decisions made or actions taken
          based on information provided by these calculators.
        </p>
      </div>
    </div>
  );
}
