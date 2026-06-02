import { describe, it, expect } from 'vitest';

interface TicketSummary {
  totalTickets: number;
  openCount: number;
  resolvedCount: number;
  csat: number;
}

function processCustomerServiceData(scale: number) {
  const totalTickets = scale * 2 + 3;
  const openCount = Math.round(totalTickets * 0.15);
  const resolvedCount = totalTickets - openCount;
  const csat = 94;

  const channels = [
    { channel: 'Email Support', count: Math.round(totalTickets * 0.6) },
    { channel: 'Live Chat', count: Math.round(totalTickets * 0.3) },
    { channel: 'Contact Form', count: Math.round(totalTickets * 0.1) }
  ];

  return {
    metrics: {
      totalTickets,
      openCount,
      resolvedCount,
      csat
    },
    channels
  };
}

describe('Business Owner Customer Service Math', () => {
  it('should compute support metrics scaled by user counts correctly', () => {
    // scale = 6 users
    // total = 6 * 2 + 3 = 15
    // open = round(15 * 0.15) = round(2.25) = 2
    // resolved = 15 - 2 = 13
    const result = processCustomerServiceData(6);

    expect(result.metrics.totalTickets).toBe(15);
    expect(result.metrics.openCount).toBe(2);
    expect(result.metrics.resolvedCount).toBe(13);
    expect(result.metrics.csat).toBe(94);

    const email = result.channels.find(c => c.channel === 'Email Support')!;
    const chat = result.channels.find(c => c.channel === 'Live Chat')!;
    const form = result.channels.find(c => c.channel === 'Contact Form')!;

    // email: round(15 * 0.6) = 9
    // chat: round(15 * 0.3) = 5
    // form: round(15 * 0.1) = 2
    expect(email.count).toBe(9);
    expect(chat.count).toBe(5);
    expect(form.count).toBe(2);
  });
});
