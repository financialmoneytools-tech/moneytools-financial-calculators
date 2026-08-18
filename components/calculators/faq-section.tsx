interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs?.length) return null;
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq: FaqItem, i: number) => (
          <div key={i} className="rounded-lg bg-white border border-slate-200 p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <h3 className="font-semibold text-[#1e3a5f] mb-2">{faq.question}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
