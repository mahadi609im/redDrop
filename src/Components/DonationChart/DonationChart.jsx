import React, { useState, useMemo } from 'react';
import { FaChartLine } from 'react-icons/fa';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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
        end.setHours(23, 59, 59, 999);
        return { name: `Week ${i + 1}`, start, end, requests: 0, completed: 0 };
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

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white/90 dark:bg-gray-900/90 p-3 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <p className="font-semibold mb-1">{payload[0].payload.name}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="text-sm">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto mt-12 space-y-8">
      {/* Chart Card */}
      <div className="bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-lg hover:shadow-xl transition">
        {/* Header */}
        <div className="flex gap-6 justify-between flex-wrap items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <FaChartLine className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Donation Requests
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Daily / Weekly / Monthly
              </p>
            </div>
          </div>
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {['daily', 'weekly', 'monthly'].map(p => (
              <button
                key={p}
                onClick={() => setChartPeriod(p)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  chartPeriod === p
                    ? 'bg-white dark:bg-gray-700 text-red-500'
                    : 'text-gray-500'
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Area Chart */}
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="areaRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="areaCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" />
              <Area
                dataKey="requests"
                stroke="#ef4444"
                fill="url(#areaRequests)"
                name="Requests"
              />
              <Area
                dataKey="completed"
                stroke="#10b981"
                fill="url(#areaCompleted)"
                name="Completed"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="border border-red-500 bg-red-500/10 text-white p-3 rounded-xl flex flex-col items-center shadow-md">
            <p className="text-xs sm:text-sm font-medium">Total Requests</p>
            <h3 className="text-xl sm:text-2xl font-bold">{totalRequests}</h3>
          </div>
          <div className="border border-green-500 bg-green-500/10 text-white p-3 rounded-xl flex flex-col items-center shadow-md">
            <p className="text-xs sm:text-sm font-medium">Completed</p>
            <h3 className="text-xl sm:text-2xl font-bold">{totalCompleted}</h3>
          </div>
          <div className="border border-blue-500 bg-blue-500/10 text-white p-3 rounded-xl flex flex-col items-center shadow-md">
            <p className="text-xs sm:text-sm font-medium">Success Rate</p>
            <h3 className="text-xl sm:text-2xl font-bold">{successRate}%</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationChart;
