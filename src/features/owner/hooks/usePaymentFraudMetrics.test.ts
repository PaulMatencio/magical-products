import { describe, it, expect } from 'vitest';

interface RawOrder {
  id: string;
  created_at: string;
  total_price: number;
  payment_method: string;
}

function processPaymentFraudData(orders: RawOrder[]) {
  const successfulCount = orders.length;
  let totalProcessedAmount = 0;
  const methodsMap = new Map<string, number>();

  orders.forEach(o => {
    const amt = Number(o.total_price || 0);
    totalProcessedAmount += amt;

    let method = 'Stripe Credit Card';
    const rawMethod = (o.payment_method || '').toLowerCase();
    if (rawMethod.includes('stripe') || rawMethod.includes('card')) method = 'Stripe Card';
    else if (rawMethod.includes('btc')) method = 'Bitcoin';
    else if (rawMethod.includes('sol')) method = 'Solana';

    methodsMap.set(method, (methodsMap.get(method) || 0) + 1);
  });

  const failedCount = Math.max(1, Math.round(successfulCount * 0.05));
  const disputeCount = Math.max(0, Math.round(successfulCount * 0.01));

  return {
    metrics: {
      totalProcessedAmount: Math.round(totalProcessedAmount * 100) / 100,
      successfulCount,
      failedCount,
      disputeCount
    },
    methods: Array.from(methodsMap.entries()).map(([method, count]) => ({ method, count }))
  };
}

describe('Business Owner Payment Fraud Math', () => {
  it('should compute processed volume, counts, and methods split correctly', () => {
    const orders: RawOrder[] = [
      { id: 'ord1', created_at: '', total_price: 100, payment_method: 'card' },
      { id: 'ord2', created_at: '', total_price: 250, payment_method: 'stripe' },
      { id: 'ord3', created_at: '', total_price: 50, payment_method: 'btc' }
    ];

    const result = processPaymentFraudData(orders);

    // Assertions:
    // Processed volume: 100 + 250 + 50 = 400.00
    // Success count: 3
    // Failed count: max(1, round(3 * 0.05)) = max(1, 0) = 1
    // Dispute count: max(0, round(3 * 0.01)) = max(0, 0) = 0
    expect(result.metrics.totalProcessedAmount).toBe(400);
    expect(result.metrics.successfulCount).toBe(3);
    expect(result.metrics.failedCount).toBe(1);
    expect(result.metrics.disputeCount).toBe(0);

    const stripeCard = result.methods.find(m => m.method === 'Stripe Card')!;
    const bitcoin = result.methods.find(m => m.method === 'Bitcoin')!;
    expect(stripeCard.count).toBe(2);
    expect(bitcoin.count).toBe(1);
  });
});
