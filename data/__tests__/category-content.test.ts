import { describe, it, expect } from 'vitest';
import {
  categories,
  calculators,
  getCategoryContent,
  getCalculatorContent,
  getCalculatorsByCategory,
  type CategoryContent,
} from '../registry';
import { categoryContent } from '../content/categories';

const MIN_INTRO_WORDS = 300;
const MIN_TOTAL_WORDS = 600;
const REQUIRED_FAQS = 5;

const countWords = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length;

const introWordCount = (content: CategoryContent): number =>
  content.longIntro.reduce((total, p) => total + countWords(p), 0);

/** Every piece of prose rendered on a category page, as one flat list. */
function proseOf(content: CategoryContent): string[] {
  return [
    ...content.longIntro,
    ...content.calculatorGuide.flatMap((g) => [g.useWhen, ...(g.details ?? [])]),
    ...content.methodology,
    ...content.whichCalculator,
    ...content.faqs.flatMap((f) => [f.question, f.answer]),
  ];
}

const totalWordCount = (content: CategoryContent): number =>
  proseOf(content).reduce((total, text) => total + countWords(text), 0);

describe('category content coverage', () => {
  it('has exactly 6 categories in the registry', () => {
    expect(categories).toHaveLength(6);
  });

  it('has a content entry for every category', () => {
    const missing = categories.filter((c) => !getCategoryContent(c.slug)).map((c) => c.slug);
    expect(missing).toEqual([]);
  });

  it('has no content entries that do not match a registry category', () => {
    const slugs = new Set(categories.map((c) => c.slug));
    const orphans = Object.keys(categoryContent).filter((slug) => !slugs.has(slug));
    expect(orphans).toEqual([]);
  });

  it('references only calculator slugs that exist in the registry', () => {
    const known = new Set(calculators.map((c) => c.slug));
    const unknown: string[] = [];
    for (const category of categories) {
      const content = getCategoryContent(category.slug);
      if (!content) continue;
      for (const guide of content.calculatorGuide) {
        if (!known.has(guide.slug)) unknown.push(`${category.slug} -> ${guide.slug}`);
      }
    }
    expect(unknown).toEqual([]);
  });

  it('links every calculator that belongs to the category, and no others', () => {
    const mismatches: string[] = [];
    for (const category of categories) {
      const content = getCategoryContent(category.slug);
      if (!content) continue;
      const expected = getCalculatorsByCategory(category.slug)
        .map((c) => c.slug)
        .sort();
      const linked = content.calculatorGuide.map((g) => g.slug).sort();
      if (JSON.stringify(expected) !== JSON.stringify(linked)) {
        mismatches.push(`${category.slug}: expected [${expected}] but linked [${linked}]`);
      }
    }
    expect(mismatches).toEqual([]);
  });

  it('has no duplicated prose between categories', () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];

    for (const category of categories) {
      const content = getCategoryContent(category.slug);
      if (!content) continue;
      for (const paragraph of proseOf(content)) {
        const key = paragraph.trim();
        const owner = seen.get(key);
        if (owner && owner !== category.slug) {
          duplicates.push(`"${key.slice(0, 60)}..." shared by ${owner} and ${category.slug}`);
        } else {
          seen.set(key, category.slug);
        }
      }
    }

    expect(duplicates).toEqual([]);
  });

  it('does not reuse prose from the calculator long-form content', () => {
    const calculatorProse = new Set<string>();
    for (const calc of calculators) {
      const content = getCalculatorContent(calc.slug);
      if (!content) continue;
      for (const paragraph of [
        ...content.longIntro,
        ...content.howItWorks,
        ...content.whenToUse,
        ...content.faqs.map((f) => f.answer),
      ]) {
        calculatorProse.add(paragraph.trim());
      }
    }

    const reused: string[] = [];
    for (const category of categories) {
      const content = getCategoryContent(category.slug);
      if (!content) continue;
      for (const paragraph of proseOf(content)) {
        if (calculatorProse.has(paragraph.trim())) {
          reused.push(`${category.slug}: "${paragraph.slice(0, 60)}..."`);
        }
      }
    }

    expect(reused).toEqual([]);
  });
});

describe.each(categories.map((c) => [c.slug, c.name] as const))('content for %s', (slug, name) => {
  const content = getCategoryContent(slug) as CategoryContent;

  it('exists and its slug matches its registry key', () => {
    expect(content, `no content found for ${name}`).toBeDefined();
    expect(content.slug).toBe(slug);
  });

  it(`has an introduction of at least ${MIN_INTRO_WORDS} words`, () => {
    expect(introWordCount(content)).toBeGreaterThanOrEqual(MIN_INTRO_WORDS);
  });

  it(`has at least ${MIN_TOTAL_WORDS} words of editorial content overall`, () => {
    expect(totalWordCount(content)).toBeGreaterThanOrEqual(MIN_TOTAL_WORDS);
  });

  it(`has exactly ${REQUIRED_FAQS} FAQs with distinct questions`, () => {
    expect(content.faqs).toHaveLength(REQUIRED_FAQS);
    for (const faq of content.faqs) {
      expect(faq.question.trim().length).toBeGreaterThan(0);
      expect(faq.answer.trim().length).toBeGreaterThan(0);
    }
    const questions = content.faqs.map((f) => f.question.trim().toLowerCase());
    expect(new Set(questions).size).toBe(questions.length);
  });

  it('has a guide entry with guidance for every calculator it lists', () => {
    expect(content.calculatorGuide.length).toBeGreaterThan(0);
    for (const guide of content.calculatorGuide) {
      expect(guide.useWhen.trim().length).toBeGreaterThan(0);
      for (const paragraph of guide.details ?? []) {
        expect(paragraph.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('has a guide substantial enough for the number of calculators it covers', () => {
    // A category with one calculator carries in its guide the detail that a
    // multi-calculator category spreads across several entries.
    const guideWords = content.calculatorGuide.reduce(
      (total, g) => total + countWords(g.useWhen) + (g.details ?? []).reduce((a, d) => a + countWords(d), 0),
      0,
    );
    const floor = content.calculatorGuide.length === 1 ? 250 : 80;
    expect(guideWords).toBeGreaterThanOrEqual(floor);
  });

  it('has methodology and which-calculator sections populated', () => {
    expect(content.methodology.length).toBeGreaterThanOrEqual(3);
    expect(content.whichCalculator.length).toBeGreaterThanOrEqual(3);
  });

  it('has no empty strings in any content array', () => {
    const empties = proseOf(content).filter((text) => text.trim().length === 0);
    expect(empties).toEqual([]);
  });
});
