/**
 * Markup Calculator Engine
 * Markup = (Selling Price - Cost) / Cost × 100
 */

export interface MarkupInput {
  cost: number;
  sellingPrice?: number;
  markupPercent?: number;
}

export interface MarkupResult {
  markup: number;
  margin: number;
  profit: number;
  sellingPrice: number;
  cost: number;
}

export function calculateMarkup(input: MarkupInput): MarkupResult {
  const { cost, sellingPrice, markupPercent } = input;

  if (cost <= 0) throw new Error('Cost must be positive');

  let finalSellingPrice: number;
  let markup: number;

  if (sellingPrice !== undefined && sellingPrice > 0) {
    finalSellingPrice = sellingPrice;
    markup = ((finalSellingPrice - cost) / cost) * 100;
  } else if (markupPercent !== undefined) {
    markup = markupPercent;
    finalSellingPrice = cost * (1 + markupPercent / 100);
  } else {
    throw new Error('Either selling price or markup percentage is required');
  }

  const profit = finalSellingPrice - cost;
  const margin = finalSellingPrice > 0 ? (profit / finalSellingPrice) * 100 : 0;

  return {
    markup,
    margin,
    profit,
    sellingPrice: finalSellingPrice,
    cost,
  };
}
