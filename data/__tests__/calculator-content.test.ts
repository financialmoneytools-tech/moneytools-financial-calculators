import { describe, it, expect } from 'vitest';
import { calculators, getCalculatorContent, type CalculatorContent } from '../registry';
import { calculatorContent } from '../calculator-content';

const MIN_WORDS = 500;
const MIN_FAQS = 5;
const MAX_FAQS = 6;
const MIN_WORKED_EXAMPLES = 2;

const countWords = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length;

/** Every piece of prose rendered on the page, as one flat list of strings. */
function proseOf(content: CalculatorContent): string[] {
  return [
    ...content.longIntro,
    ...content.howItWorks,
    content.formulaExplanation,
    ...content.workedExamples.flatMap((e) => [e.title, e.scenario, ...e.steps, e.result, e.takeaway]),
    ...content.whenToUse,
    ...content.factors.flatMap((f) => [f.title, f.detail]),
    ...content.assumptions,
    ...content.commonMistakes,
    ...content.faqs.flatMap((f) => [f.question, f.answer]),
  ];
}

const wordCount = (content: CalculatorContent): number =>
  proseOf(content).reduce((total, text) => total + countWords(text), 0);

describe('calculator content coverage', () => {
  it('has exactly 20 calculators in the registry', () => {
    expect(calculators).toHaveLength(20);
  });

  it('has a content entry for every registry calculator', () => {
    const missing = calculators.filter((c) => !getCalculatorContent(c.slug)).map((c) => c.slug);
    expect(missing).toEqual([]);
  });

  it('has no content entries that do not match a registry calculator', () => {
    const slugs = new Set(calculators.map((c) => c.slug));
    const orphans = Object.keys(calculatorContent).filter((slug) => !slugs.has(slug));
    expect(orphans).toEqual([]);
  });

  it('has no duplicated prose between calculators', () => {
    // Long-form paragraphs must be specific to their calculator. Short list items
    // (assumptions, mistakes) may legitimately overlap, so only substantial prose is checked.
    const seen = new Map<string, string>();
    const duplicates: string[] = [];

    for (const calc of calculators) {
      const content = getCalculatorContent(calc.slug);
      if (!content) continue;
      const paragraphs = [
        ...content.longIntro,
        ...content.howItWorks,
        content.formulaExplanation,
        ...content.whenToUse,
        ...content.factors.map((f) => f.detail),
        ...content.workedExamples.map((e) => e.takeaway),
        ...content.faqs.map((f) => f.answer),
      ];
      for (const paragraph of paragraphs) {
        const key = paragraph.trim();
        const owner = seen.get(key);
        if (owner && owner !== calc.slug) {
          duplicates.push(`"${key.slice(0, 60)}..." shared by ${owner} and ${calc.slug}`);
        } else {
          seen.set(key, calc.slug);
        }
      }
    }

    expect(duplicates).toEqual([]);
  });
});

describe.each(calculators.map((c) => [c.slug, c.name] as const))(
  'content for %s',
  (slug, name) => {
    const content = getCalculatorContent(slug) as CalculatorContent;

    it('exists and its slug matches its registry key', () => {
      expect(content, `no content found for ${name}`).toBeDefined();
      expect(content.slug).toBe(slug);
    });

    it(`has at least ${MIN_WORDS} words of explanatory content`, () => {
      expect(wordCount(content)).toBeGreaterThanOrEqual(MIN_WORDS);
    });

    it(`has ${MIN_FAQS} to ${MAX_FAQS} FAQs, each with a question and an answer`, () => {
      expect(content.faqs.length).toBeGreaterThanOrEqual(MIN_FAQS);
      expect(content.faqs.length).toBeLessThanOrEqual(MAX_FAQS);
      for (const faq of content.faqs) {
        expect(faq.question.trim().length).toBeGreaterThan(0);
        expect(faq.answer.trim().length).toBeGreaterThan(0);
      }
    });

    it('has no duplicate FAQ questions', () => {
      const questions = content.faqs.map((f) => f.question.trim().toLowerCase());
      expect(new Set(questions).size).toBe(questions.length);
    });

    it(`has at least ${MIN_WORKED_EXAMPLES} complete worked examples`, () => {
      expect(content.workedExamples.length).toBeGreaterThanOrEqual(MIN_WORKED_EXAMPLES);
      for (const example of content.workedExamples) {
        expect(example.title.trim().length).toBeGreaterThan(0);
        expect(example.scenario.trim().length).toBeGreaterThan(0);
        expect(example.steps.length).toBeGreaterThan(0);
        expect(example.result.trim().length).toBeGreaterThan(0);
        expect(example.takeaway.trim().length).toBeGreaterThan(0);
      }
    });

    it('has every long-form content field populated', () => {
      expect(content.longIntro.length).toBeGreaterThanOrEqual(3);
      expect(content.howItWorks.length).toBeGreaterThanOrEqual(3);
      expect(content.whenToUse.length).toBeGreaterThanOrEqual(2);
      expect(content.factors.length).toBeGreaterThanOrEqual(3);
      expect(content.assumptions.length).toBeGreaterThanOrEqual(3);
      expect(content.commonMistakes.length).toBeGreaterThanOrEqual(3);
      expect(content.formula.trim().length).toBeGreaterThan(0);
      expect(content.formulaExplanation.trim().length).toBeGreaterThan(0);
    });

    it('has no empty strings in any content array', () => {
      const empties = proseOf(content).filter((text) => text.trim().length === 0);
      expect(empties).toEqual([]);
    });
  },
);
