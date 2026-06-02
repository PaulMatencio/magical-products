import { describe, it, expect } from 'vitest';

interface FunnelStep {
  name: string;
  count: number;
  percentageOfTotal: number;
  percentageOfPrevious: number;
}

function computeFunnel(totalSessions: number, baseOrders: number): FunnelStep[] {
  const step1_sessions = totalSessions;
  const step2_views = Math.round(step1_sessions * 0.78);
  const step3_cart = Math.round(step2_views * 0.44);
  const step4_checkout = Math.round(step3_cart * 0.62);
  const step5_orders = baseOrders + Math.max(1, Math.round(step4_checkout * 0.35));

  return [
    { name: 'Sessions', count: step1_sessions, percentageOfTotal: 100, percentageOfPrevious: 100 },
    { name: 'Product Views', count: step2_views, percentageOfTotal: Math.round((step2_views / step1_sessions) * 100), percentageOfPrevious: Math.round((step2_views / step1_sessions) * 100) },
    { name: 'Cart Additions', count: step3_cart, percentageOfTotal: Math.round((step3_cart / step1_sessions) * 100), percentageOfPrevious: Math.round((step3_cart / step2_views) * 100) },
    { name: 'Checkout Started', count: step4_checkout, percentageOfTotal: Math.round((step4_checkout / step1_sessions) * 100), percentageOfPrevious: Math.round((step4_checkout / step3_cart) * 100) },
    { name: 'Purchased Orders', count: step5_orders, percentageOfTotal: Math.round((step5_orders / step1_sessions) * 100), percentageOfPrevious: Math.round((step5_orders / step4_checkout) * 100) }
  ];
}

describe('Business Owner Traffic Conversion Math', () => {
  it('should calculate funnel steps and percentages correctly', () => {
    const funnel = computeFunnel(1000, 5);

    // Sessions: 1000, 100%
    // Views: 1000 * 0.78 = 780, 78% of total, 78% of previous
    // Cart: 780 * 0.44 = 343, 34% of total, 44% of previous
    // Checkout: 343 * 0.62 = 213, 21% of total, 62% of previous
    // Orders: 5 + Math.max(1, 213 * 0.35) = 5 + 75 = 80, 8% of total, 38% of previous
    expect(funnel[0].count).toBe(1000);
    expect(funnel[0].percentageOfTotal).toBe(100);

    expect(funnel[1].count).toBe(780);
    expect(funnel[1].percentageOfTotal).toBe(78);
    expect(funnel[1].percentageOfPrevious).toBe(78);

    expect(funnel[2].count).toBe(343);
    expect(funnel[2].percentageOfTotal).toBe(34);
    expect(funnel[2].percentageOfPrevious).toBe(44);

    expect(funnel[3].count).toBe(213);
    expect(funnel[3].percentageOfTotal).toBe(21);
    expect(funnel[3].percentageOfPrevious).toBe(62);

    expect(funnel[4].count).toBe(80);
    expect(funnel[4].percentageOfTotal).toBe(8);
  });
});
