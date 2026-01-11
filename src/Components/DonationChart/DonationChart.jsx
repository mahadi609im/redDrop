import React, { useState, useMemo } from 'react';
import { FaChartLine } from 'react-icons/fa';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const DonationChart = ({ donationRequests = [] }) => {
  const [chartPeriod, setChartPeriod] = useState('weekly');

  const getDate = req => new Date(req.createdAt || req.date || req.fundAt);

  const generateChartData = (period, requests) => {
    const now = new Date();
    if (period === 'daily') {
      const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(now.getDate() - (6 - i));
        return {
          name: d.toLocaleDateString('en-US', { weekday: 'short' }),
          key: d.toDateString(),
          requests: 0,
          completed: 0,
        };
      });
      requests.forEach(req => {
        const key = getDate(req).toDateString();
        const day = days.find(d => d.key === key);
        if (day) {
          day.requests++;
          if (['done', 'completed'].includes(req.status)) day.completed++;
        }
      });
      return days;
    }

    if (period === 'weekly') {
      const weeks = Array.from({ length: 8 }, (_, i) => {
        const start = new Date();
        start.setDate(now.getDate() - 7 * (7 - i));
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return { name: `W${i + 1}`, start, end, requests: 0, completed: 0 };
      });
      requests.forEach(req => {
        const d = getDate(req);
        const week = weeks.find(w => d >= w.start && d <= w.end);
        if (week) {
          week.requests++;
          if (['done', 'completed'].includes(req.status)) week.completed++;
        }
      });
      return weeks;
    }

    if (period === 'monthly') {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const data = months.map((m, i) => ({
        name: m,
        month: i,
        requests: 0,
        completed: 0,
      }));
      requests.forEach(req => {
        const d = getDate(req);
        if (d.getFullYear() === now.getFullYear()) {
          const item = data[d.getMonth()];
          item.requests++;
          if (['done', 'completed'].includes(req.status)) item.completed++;
        }
      });
      return data.slice(0, now.getMonth() + 1);
    }
    return [];
  };

  const chartData = useMemo(
    () => generateChartData(chartPeriod, donationRequests),
    [chartPeriod, donationRequests]
  );

  const totalRequests = chartData.reduce((s, i) => s + i.requests, 0);
  const totalCompleted = chartData.reduce((s, i) => s + i.completed, 0);
  const successRate = totalRequests
    ? Math.round((totalCompleted / totalRequests) * 100)
    : 0;

  // থিম ফ্রেন্ডলি কাস্টম টুলটিপ
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-base-200/90 backdrop-blur-md border border-base-300 p-4 rounded-2xl shadow-2xl">
        <p className="font-black italic uppercase text-[10px] tracking-widest mb-2 text-base-content/40 border-b border-base-300 pb-1">
          {payload[0].payload.name} Statistics
        </p>
        {payload.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm font-bold italic"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: p.color }}
            ></div>
            <span className="text-base-content/70">{p.name}:</span>
            <span className="text-base-content">{p.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="bg-base-200/40 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-6 md:p-10 shadow-xl transition-all duration-500">
        {/* Chart Header */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-inner">
              <FaChartLine size={24} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tight text-base-content leading-none">
                Donation <span className="text-primary not-italic">Flow</span>
              </h2>
              <p className="text-base-content/40 text-[10px] uppercase font-black tracking-widest mt-1">
                Real-time activity tracking
              </p>
            </div>
          </div>

          {/* Period Toggle Switch */}
          <div className="flex bg-base-300/50 p-1.5 rounded-2xl border border-base-300">
            {['daily', 'weekly', 'monthly'].map(p => (
              <button
                key={p}
                onClick={() => setChartPeriod(p)}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-tighter transition-all italic ${
                  chartPeriod === p
                    ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 scale-105'
                    : 'text-base-content/40 hover:text-base-content'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Area */}
        <div className="h-[300px] w-full mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-primary)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-base-300)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="var(--color-base-content)"
                opacity={0.3}
                tick={{ fontSize: 10, fontWeight: 800 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="var(--color-base-content)"
                opacity={0.3}
                tick={{ fontSize: 10, fontWeight: 800 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: 'var(--color-primary)',
                  strokeWidth: 1,
                  strokeDasharray: '5 5',
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                height={36}
                iconType="diamond"
                wrapperStyle={{
                  fontSize: '10px',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  paddingBottom: '20px',
                }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="var(--color-primary)"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorReq)"
                name="Requests"
                animationDuration={1500}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#10b981"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorComp)"
                name="Completed"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Mini Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-primary/5 border border-primary/10 p-5 rounded-[1.5rem] flex flex-col items-center group hover:bg-primary transition-all duration-300">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary group-hover:text-primary-content/70">
              Total Volume
            </p>
            <h3 className="text-3xl font-black italic text-base-content group-hover:text-primary-content">
              {totalRequests}
            </h3>
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-[1.5rem] flex flex-col items-center group hover:bg-emerald-500 transition-all duration-300">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 group-hover:text-white/70">
              Success Count
            </p>
            <h3 className="text-3xl font-black italic text-base-content group-hover:text-white">
              {totalCompleted}
            </h3>
          </div>
          <div className="bg-blue-500/5 border border-blue-500/10 p-5 rounded-[1.5rem] flex flex-col items-center group hover:bg-blue-500 transition-all duration-300">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:text-white/70">
              Efficiency Rate
            </p>
            <h3 className="text-3xl font-black italic text-base-content group-hover:text-white">
              {successRate}%
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationChart;
