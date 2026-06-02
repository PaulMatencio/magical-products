import { describe, it, expect } from 'vitest';

interface RawRefund {
  id: string;
  payment_id: string;
  amount: number;
  reason: string;
  status: string;
  created_at: string;
  processed_at: string | null;
}

function processRefundData(refunds: RawRefund[], totalOrders: number) {
  let totalRefundsCount = refunds.length;
  let totalRefundedAmount = 0;
  let resolutionDaysSum = 0;
  let resolutionDaysCount = 0;

  const reasonsMap = new Map<string, number>();

  refunds.forEach(r => {
    const amt = Number(r.amount || 0) / 100;
    totalRefundedAmount += amt;

    const reason = r.reason || 'Unspecified';
    reasonsMap.set(reason, (reasonsMap.get(reason) || 0) + 1);

    if (r.processed_at && r.created_at) {
      const deltaMs = new Date(r.processed_at).getTime() - new Date(r.created_at).getTime();
      resolutionDaysSum += deltaMs / (1000 * 60 * 60 * 24);
      resolutionDaysCount++;
    }
  });

  const avgResolutionDays = resolutionDaysCount > 0 ? Math.round((resolutionDaysSum / resolutionDaysCount) * 10) / 10 : 2.1;
  const refundRate = Math.round((totalRefundsCount / totalOrders) * 1000) / 10;

  return {
    metrics: {
      totalRefundsCount,
      totalRefundedAmount: Math.round(totalRefundedAmount * 100) / 100,
      refundRate,
      avgResolutionDays
    },
    reasons: Array.from(reasonsMap.entries()).map(([reason, count]) => ({ reason, count }))
  };
}

describe('Business Owner Returns Refunds Math', () => {
  it('should compute refund count, sum values, refund rate and resolution speed', () => {
    const refunds: RawRefund[] = [
      {
        id: 'ref1',
        payment_id: 'pay1',
        amount: 2500, // $25.00
        reason: 'Defective Product',
        status: 'succeeded',
        created_at: '2026-06-02T10:00:00Z',
        processed_at: '2026-06-04T10:00:00Z' // 2.0 days
      },
      {
        id: 'ref2',
        payment_id: 'pay2',
        amount: 4500, // $45.00
        reason: 'Wrong Item Shipped',
        status: 'succeeded',
        created_at: '2026-06-01T12:00:00Z',
        processed_at: '2026-06-03T18:00:00Z' // 2.25 days
      }
    ];

    const result = processRefundData(refunds, 100); // 100 total orders

    // Assertions:
    // Total count: 2
    // Refunded Amount: 25 + 45 = 70.00
    // Refund Rate: 2 / 100 = 2.0%
    // Resolution sum = 2.0 + 2.25 = 4.25
    // Average resolution days = 4.25 / 2 = 2.125 -> round to 2.1
    expect(result.metrics.totalRefundsCount).toBe(2);
    expect(result.metrics.totalRefundedAmount).toBe(70);
    expect(result.metrics.refundRate).toBe(2);
    expect(result.metrics.avgResolutionDays).toBe(2.1);

    const defective = result.reasons.find(r => r.reason === 'Defective Product')!;
    expect(defective.count).toBe(1);
  });
});
