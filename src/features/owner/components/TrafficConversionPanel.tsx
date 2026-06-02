import React, { useState } from 'react';
import { 
  Users, Eye, Percent, Clock, ArrowUpRight, ArrowDownRight,
  TrendingUp, Monitor, Compass, RefreshCw, BarChart2
} from 'lucide-react';
import { useTrafficMetrics } from '../hooks/useTrafficMetrics';
import { Button } from '../../../shared/ui';

interface TrafficConversionPanelProps {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export function TrafficConversionPanel({ period }: TrafficConversionPanelProps) {
  const { isLoading, error, data, refetch } = useTrafficMetrics(period);
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 animate-pulse h-28" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 h-96" />
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 h-96" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-center max-w-lg mx-auto mt-8">
        <Users className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Traffic Data</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{error || 'An unexpected error occurred.'}</p>
        <Button onClick={refetch} leftIcon={<RefreshCw className="w-4 h-4" />}>Try Again</Button>
      </div>
    );
  }

  const { totalSessions, totalPageviews, bounceRate, avgSessionDuration, funnel, sources, devices, timeline, comparisons } = data;

  // Chart configuration parameters
  const chartHeight = 160;
  const paddingX = 40;
  const paddingY = 20;
  const maxSessions = Math.max(...timeline.map(p => p.sessions), 1);

  return (
    <div className="space-y-6">
      
      {/* ── Metric Summary Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sessions Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Sessions (Visits)</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{totalSessions.toLocaleString()}</h3>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-bold">
              <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{comparisons.sessionsChange}%
              </span>
              <span className="text-gray-400 dark:text-slate-500">vs. previous period</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Pageviews Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Pageviews</span>
            <div className="p-2 bg-violet-50 dark:bg-violet-500/10 rounded-xl">
              <Eye className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{totalPageviews.toLocaleString()}</h3>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-bold">
              <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{comparisons.pageviewsChange}%
              </span>
              <span className="text-gray-400 dark:text-slate-500">Avg. {(totalPageviews / Math.max(1, totalSessions)).toFixed(1)} pages/session</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Bounce Rate Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Bounce Rate</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
              <Percent className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{bounceRate}%</h3>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-bold">
              <span className={`flex items-center ${comparisons.bounceChange <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                {comparisons.bounceChange <= 0 ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                {comparisons.bounceChange}%
              </span>
              <span className="text-gray-400 dark:text-slate-500">Lower is better</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Session Duration Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Avg. Session Time</span>
            <div className="p-2 bg-cyan-50 dark:bg-cyan-500/10 rounded-xl">
              <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{avgSessionDuration}</h3>
            <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-1 uppercase">Time spent exploring catalog</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* ── Funnel and Breakdown Details ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width): Interactive conversion funnel & SVG timeline chart */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Conversion Funnel Card */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 rounded-lg">
                <BarChart2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">E-Commerce Conversion Funnel</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Track session drop-off rates across stages</p>
              </div>
            </div>

            {/* Styled Funnel Stages */}
            <div className="space-y-4">
              {funnel.map((step, i) => {
                const colors = ['bg-blue-500', 'bg-cyan-500', 'bg-teal-500', 'bg-amber-500', 'bg-emerald-500'];
                const textColors = ['text-blue-500', 'text-cyan-500', 'text-teal-500', 'text-amber-500', 'text-emerald-500'];
                const activeColor = colors[i % colors.length];
                const activeText = textColors[i % textColors.length];

                return (
                  <div key={step.name} className="relative flex items-center justify-between gap-4 p-3 bg-gray-50/50 dark:bg-slate-950/20 border border-gray-100/40 dark:border-white/2 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-white/4">
                    {/* Visual bar fill representing percentage of total */}
                    <div 
                      className={`absolute top-0 bottom-0 left-0 ${activeColor} opacity-[0.07] rounded-l-xl transition-all duration-1000`} 
                      style={{ width: `${step.percentageOfTotal}%` }}
                    />
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs font-black bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 shadow-sm ${activeText}`}>
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-xs font-black text-gray-800 dark:text-slate-200">{step.name}</p>
                        <p className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase mt-0.5">
                          {step.count.toLocaleString()} sessions
                        </p>
                      </div>
                    </div>

                    <div className="text-right relative z-10">
                      <span className={`text-xs font-black font-mono ${activeText}`}>{step.percentageOfTotal}%</span>
                      {i > 0 && (
                        <span className="block text-[9px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">
                          {step.percentageOfPrevious}% of previous step
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SVG timeline chart */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Traffic Volume</h4>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Daily visit trends and sessions count</p>
                </div>
              </div>
              
              {hoveredPoint && (
                <div className="px-3 py-1 bg-violet-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider animate-fadeIn">
                  {hoveredPoint.label}: {hoveredPoint.sessions} Visits ({hoveredPoint.pageviews} Pageviews)
                </div>
              )}
            </div>

            {/* Custom SVG Line Chart */}
            <div className="relative">
              <svg 
                className="w-full overflow-visible" 
                height={chartHeight}
                viewBox={`0 0 ${timeline.length * 50 + paddingX * 2} ${chartHeight}`}
                preserveAspectRatio="none"
              >
                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                  const y = paddingY + (chartHeight - paddingY * 2) * ratio;
                  return (
                    <line
                      key={index}
                      x1={paddingX}
                      y1={y}
                      x2={timeline.length * 50 + paddingX}
                      y2={y}
                      className="stroke-gray-100 dark:stroke-white/5"
                      strokeWidth={1}
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* SVG path mapping */}
                {(() => {
                  const points = timeline.map((p, index) => {
                    const x = paddingX + index * 50;
                    const y = chartHeight - paddingY - ((p.sessions / maxSessions) * (chartHeight - paddingY * 2));
                    return { x, y, ...p };
                  });

                  const pathD = points.reduce((d, p, index) => {
                    return index === 0 ? `M ${p.x} ${p.y}` : `${d} L ${p.x} ${p.y}`;
                  }, '');

                  const areaD = points.length > 0 
                    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z` 
                    : '';

                  return (
                    <>
                      {/* Gradient fill */}
                      <defs>
                        <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>
                      <path d={areaD} fill="url(#trafficGrad)" />
                      <path d={pathD} fill="none" className="stroke-blue-500" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                      
                      {/* Points trigger zone */}
                      {points.map((p, index) => (
                        <g 
                          key={index}
                          onMouseEnter={() => setHoveredPoint(p)}
                          onMouseLeave={() => setHoveredPoint(null)}
                          className="cursor-pointer"
                        >
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={hoveredPoint?.label === p.label ? 6 : 4}
                            className="fill-blue-500 stroke-white dark:stroke-slate-900 transition-all"
                            strokeWidth={2}
                          />
                          {/* Invisible hover area */}
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={15}
                            fill="transparent"
                          />
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>

              {/* X Axis labels */}
              <div className="flex justify-between mt-2 px-10">
                {timeline.map((p, i) => {
                  // Only display alternate labels if there are many to prevent wrapping issues
                  const shouldShow = timeline.length < 15 || i % 4 === 0;
                  return (
                    <span 
                      key={i} 
                      className={`text-[8px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-opacity ${shouldShow ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {p.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1/3 width): Traffic Source Share & Device Breakdown */}
        <div className="space-y-6">
          
          {/* Traffic Sources Breakdown */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-compass-50 dark:bg-white/5 rounded-lg">
                <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Referrals & Sources</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Top visitor acquisition channels</p>
              </div>
            </div>

            <div className="space-y-4">
              {sources.map((src, i) => {
                const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-violet-500', 'bg-amber-500'];
                const activeColor = colors[i % colors.length];

                return (
                  <div key={src.source} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-800 dark:text-slate-300">{src.source}</span>
                      <span className="text-gray-500 dark:text-slate-400 font-mono text-[10px]">
                        {src.sessions.toLocaleString()} ({src.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 dark:bg-slate-950/60 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${activeColor} rounded-full transition-all duration-1000`} 
                        style={{ width: `${src.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Device Types Card */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-cyan-50 dark:bg-cyan-500/10 rounded-lg">
                <Monitor className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Device Share</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Mobile vs. Desktop audience split</p>
              </div>
            </div>

            <div className="space-y-4">
              {devices.map((dev, i) => {
                const colors = ['bg-cyan-500', 'bg-blue-500', 'bg-violet-500'];
                const activeColor = colors[i % colors.length];

                return (
                  <div key={dev.device} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-800 dark:text-slate-300">{dev.device}</span>
                      <span className="text-gray-500 dark:text-slate-400 font-mono text-[10px]">
                        {dev.sessions.toLocaleString()} ({dev.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 dark:bg-slate-950/60 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${activeColor} rounded-full transition-all duration-1000`} 
                        style={{ width: `${dev.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
