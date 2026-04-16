import SubscriptionIcon from '../SubscriptionIcon';
import site from '../../config/site';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

export default function SubscriptionCard({ sub, onClick }) {
  return (
    <GlassCard 
      className="p-8 cursor-pointer hover:shadow-2xl hover:scale-[1.03] active:scale-95 group transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-6">
        <SubscriptionIcon name={sub.name} color={sub.color} className="w-16 h-16 rounded-2xl shadow-lg group-hover:scale-110 transition-transform" />
        <Badge showDot>{sub.status}</Badge>
      </div>
      
      <div className="mb-8">
        <h3 className="text-2xl font-extrabold tracking-tight text-app-text dark:text-app-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{sub.name}</h3>
        <p className="text-sm font-bold text-app-text-muted tracking-wider uppercase mt-1">{sub.category}</p>
      </div>
      
      <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-white/10 flex items-end justify-between">
        <div>
          <p className="text-3xl sm:text-[2.5rem] leading-none font-extrabold tracking-tighter text-app-text dark:text-app-text-dark mb-1 whitespace-nowrap"><span className="text-lg sm:text-xl text-primary mr-0.5">{site.currency}</span>{Number(sub.price).toFixed(2)}</p>
          <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-app-text-muted">
            <span>{sub.interval}</span>
            {sub.renewalDate && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20"></span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(sub.renewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-app-bg dark:bg-app-surface-dark/50 flex items-center justify-center text-app-text-muted/50 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </GlassCard>
  );
}
