import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../services/supabase';

export interface MarketingSummary {
  totalSpend: number;
  purchasesFromAds: number;
  roas: number; // Return on Ad Spend (multiplier, e.g. 3.4)
  cac: number; // Customer Acquisition Cost in USD
}

export interface CampaignItem {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  spend: number;
  revenue: number;
  roas: number;
}

export interface MarketingTimelinePoint {
  label: string;
  spend: number;
  revenue: number;
}

export interface MarketingData {
  metrics: MarketingSummary;
  campaigns: CampaignItem[];
  timeline: MarketingTimelinePoint[];
}

export function useMarketingMetrics(timeframe: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly') {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MarketingData | null>(null);

  const fetchMarketingData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Fetch completed orders to scale ad revenue calculations
      const { data: orders, error: err } = await supabase
        .from('orders')
        .select('total_price')
        .order('created_at', { ascending: false });

      if (err) throw new Error(err.message);

      let totalRevenue = 0;
      (orders || []).forEach(o => {
        totalRevenue += Number(o.total_price || 0);
      });

      // Simulation base parameters anchored by database order volumes
      const totalSpend = Math.max(80, Math.round(totalRevenue * 0.25));
      const adRevenue = Math.round(totalRevenue * 0.85);
      const purchasesFromAds = Math.max(2, Math.round((orders || []).length * 0.85));

      const roas = totalSpend > 0 ? Math.round((adRevenue / totalSpend) * 10) / 10 : 3.4;
      const cac = purchasesFromAds > 0 ? Math.round((totalSpend / purchasesFromAds) * 100) / 100 : 18.50;

      const campaigns: CampaignItem[] = [
        {
          id: 'camp_1',
          name: 'Summer Solstice Google Search Ads',
          status: 'active',
          spend: Math.round(totalSpend * 0.6),
          revenue: Math.round(adRevenue * 0.55),
          roas: totalSpend > 0 ? Math.round(((adRevenue * 0.55) / (totalSpend * 0.6)) * 10) / 10 : 3.1
        },
        {
          id: 'camp_2',
          name: 'Instagram Eco-watch Influencer Promo',
          status: 'active',
          spend: Math.round(totalSpend * 0.3),
          revenue: Math.round(adRevenue * 0.35),
          roas: totalSpend > 0 ? Math.round(((adRevenue * 0.35) / (totalSpend * 0.3)) * 10) / 10 : 4.0
        },
        {
          id: 'camp_3',
          name: 'Retargeting Newsletter Campaign',
          status: 'completed',
          spend: Math.round(totalSpend * 0.1),
          revenue: Math.round(adRevenue * 0.1),
          roas: totalSpend > 0 ? Math.round(((adRevenue * 0.1) / (totalSpend * 0.1)) * 10) / 10 : 3.4
        }
      ];

      // Timeline Points
      let timeline: MarketingTimelinePoint[] = [];
      if (timeframe === 'daily') {
        for (let i = 0; i < 24; i += 4) {
          timeline.push({
            label: `${i}:00`,
            spend: i === 12 ? Math.round(totalSpend * 0.5) : Math.round(totalSpend * 0.05),
            revenue: i === 12 ? Math.round(adRevenue * 0.4) : Math.round(adRevenue * 0.06)
          });
        }
      } else if (timeframe === 'weekly') {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        days.forEach(day => {
          timeline.push({
            label: day,
            spend: Math.round(totalSpend / 7),
            revenue: Math.round(adRevenue / 7)
          });
        });
      } else if (timeframe === 'monthly') {
        for (let w = 1; w <= 4; w++) {
          timeline.push({
            label: `Week ${w}`,
            spend: Math.round(totalSpend * 0.25),
            revenue: Math.round(adRevenue * 0.25)
          });
        }
      } else if (timeframe === 'quarterly') {
        for (let m = 1; m <= 3; m++) {
          timeline.push({
            label: `Month ${m}`,
            spend: Math.round(totalSpend * 0.33),
            revenue: Math.round(adRevenue * 0.33)
          });
        }
      } else {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        months.forEach(m => {
          timeline.push({
            label: m,
            spend: Math.round(totalSpend * 0.083),
            revenue: Math.round(adRevenue * 0.083)
          });
        });
      }

      setData({
        metrics: {
          totalSpend,
          purchasesFromAds,
          roas,
          cac
        },
        campaigns,
        timeline
      });
    } catch (err: any) {
      console.error('useMarketingMetrics error:', err);
      setError(err.message || 'Failed to fetch marketing metrics');
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    fetchMarketingData();
  }, [fetchMarketingData]);

  return { isLoading, error, data, refetch: fetchMarketingData };
}
