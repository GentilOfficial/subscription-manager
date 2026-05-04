import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuthStore } from '@/stores/auth';
import { blocks } from '@/app/config/content';
import GlassCard from '@/app/components/atoms/GlassCard';

const COLORS = ['#ea580c', '#fb923c', '#e11d48', '#fbbf24', '#f43f5e', '#d97706', '#be123c', '#9a3412'];

const CustomTooltip = ({ active, payload }) => {
  const { getCurrencySymbol } = useAuthStore();
  if (active && payload && payload.length) {
    return (
      <div className="bg-app-surface/90 dark:bg-app-surface-dark/90 backdrop-blur-md border border-slate-200/50 dark:border-white/10 px-4 py-3 rounded-2xl shadow-xl">
        <p className="text-app-text dark:text-app-text-dark font-bold tracking-tight">{`${payload[0].name}`}</p>
        <p className="text-primary font-medium">{`${payload[0].value.toFixed(2)}${getCurrencySymbol()} ${blocks.chart.tooltipSuffix}`}</p>
      </div>
    );
  }
  return null;
};

export default function ChartBlock({ categoryData }) {
  return (
    <GlassCard className="md:col-span-6 lg:col-span-7 p-8 md:p-10">
      <h2 className="text-2xl font-extrabold tracking-tight mb-8 text-app-text dark:text-app-text-dark">{blocks.chart.title}</h2>
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                cornerRadius={6}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontWeight: 600, fontSize: '14px' }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-slate-400 font-medium">{blocks.chart.empty}</div>
        )}
      </div>
    </GlassCard>
  );
}
