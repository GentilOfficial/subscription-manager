import { Calendar } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';
import { blocks } from '../../config/content';
import SubscriptionIcon from '../SubscriptionIcon';
import GlassCard from '../ui/GlassCard';

export default function AccentBlock({ upcomingSubs = [] }) {
  const { getCurrencySymbol } = useAuthStore();
  return (
    <GlassCard className="md:col-span-6 lg:col-span-4 bg-gradient-to-br from-primary to-accent-dark p-6 sm:p-8 md:p-10 shadow-2xl hover:scale-[1.02] text-white">
      <h3 className="text-lg font-semibold text-white/80 z-10 mb-8">{blocks.accent.title}</h3>

      <div className="relative z-10 flex flex-col gap-6">
        {upcomingSubs.length === 0 ? (
          <div className="flex flex-col h-full justify-center">
            <p className="text-white/80 font-medium text-lg">{blocks.accent.noPayments}<br />{blocks.accent.noPaymentsSub}</p>
          </div>
        ) : upcomingSubs.length === 1 ? (
          <div className="flex flex-col gap-1">
            <SubscriptionIcon name={upcomingSubs[0].name} color={upcomingSubs[0].color} className="w-16 h-16 rounded-2xl mb-4 shadow-xl ring-2 ring-white/20" />
            <p className="text-3xl font-extrabold tracking-tight mb-1">{upcomingSubs[0].name}</p>
            <p className="text-xl font-semibold text-white/50"><span className="text-white">{upcomingSubs[0].price}{getCurrencySymbol()}</span> / {upcomingSubs[0].interval.toLowerCase()}</p>

            <div className="mt-4 bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold opacity-90 mb-1">{blocks.accent.dueIn}</p>
                <p className="text-2xl font-bold">
                  {upcomingSubs[0].daysUntil === 0 ? blocks.accent.today : blocks.accent.days(upcomingSubs[0].daysUntil)}
                </p>
              </div>
              <div className="text-right opacity-80">
                <p className="text-xs font-bold uppercase tracking-widest mb-1">{blocks.accent.dateLabel}</p>
                <p className="font-bold">
                  {new Date(upcomingSubs[0].nextRenewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {upcomingSubs.map((sub, i) => (
              <div 
                key={i} 
                className={`flex items-center justify-between group/item transition-all ${i !== 0 ? 'pt-5 border-t border-white/10' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <SubscriptionIcon 
                      name={sub.name} 
                      color={sub.color} 
                      className="w-12 h-12 rounded-xl shadow-lg ring-2 ring-white/20 group-hover/item:scale-110 transition-transform" 
                    />
                    {sub.daysUntil === 0 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
                    )}
                  </div>
                  <div>
                    <p className="font-extrabold text-lg tracking-tight group-hover/item:text-white transition-colors">{sub.name}</p>
                    <p className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${sub.daysUntil === 0 ? 'bg-white animate-pulse' : 'bg-white/40'}`} />
                      {sub.daysUntil === 0 ? blocks.accent.today : blocks.accent.days(sub.daysUntil)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-extrabold text-lg leading-none mb-1">{Number(sub.price).toFixed(2)}{getCurrencySymbol()}</p>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center justify-end gap-1">
                    <Calendar className="w-2.5 h-2.5" />
                    {new Date(sub.nextRenewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
