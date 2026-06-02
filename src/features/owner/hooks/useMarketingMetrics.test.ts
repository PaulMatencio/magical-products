import { describe, it, expect } from 'vitest';

function processMarketingData(totalRevenue: number, orderCount: number) {
  const totalSpend = Math.max(80, Math.round(totalRevenue * 0.25));
  const adRevenue = Math.round(totalRevenue * 0.85);
  const purchasesFromAds = Math.max(2, Math.round(orderCount * 0.85));

  const roas = totalSpend > 0 ? Math.round((adRevenue / totalSpend) * 10) / 10 : 3.4;
  const cac = purchasesFromAds > 0 ? Math.round((totalSpend / purchasesFromAds) * 100) / 100 : 18.50;

  return {
    totalSpend,
    adRevenue,
    purchasesFromAds,
    roas,
    cac
  };
}

describe('Business Owner Marketing ROI Math', () => {
  it('should compute CAC and ROAS metrics based on revenue volumes correctly', () => {
    // totalRevenue = 400
    // orderCount = 4 orders
    // totalSpend = max(80, round(400 * 0.25)) = max(80, 100) = 100
    // adRevenue = round(400 * 0.85) = 340
    // purchases = max(2, round(4 * 0.85)) = max(2, 3) = 3
    // roas = round((340 / 100) * 10) / 10 = 3.4
    // cac = round((100 / 3) * 100) / 100 = 33.33
    const result = processMarketingData(400, 4);

    expect(result.totalSpend).toBe(100);
    expect(result.adRevenue).toBe(340);
    expect(result.purchasesFromAds).toBe(3);
    expect(result.roas).toBe(3.4);
    expect(result.cac).toBe(33.33);
  });
});
