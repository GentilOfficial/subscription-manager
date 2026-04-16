import Link from 'next/link';
import SubscriptionIcon from '../SubscriptionIcon';
import { blocks } from '../../config/content';
import site from '../../config/site';
import GlassCard from '../ui/GlassCard';

export default function ActivityBlock({ subscriptions }) {
  return (
    <GlassCard className="md:col-span-6 lg:col-span-5 p-8 md:p-10">
       <div className="flex justify-between items-center mb-8">
         <h2 className="text-2xl font-extrabold tracking-tight text-app-text dark:text-app-text-dark">{blocks.activity.title}</h2>
         <Link href="/dashboard/subscriptions" className="w-10 h-10 rounded-full bg-app-bg dark:bg-app-surface-dark flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer border border-slate-200/50 dark:border-white/10">
            +
         </Link>
       </div>
       
       <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar max-h-[300px]">
         {subscriptions.length > 0 ? subscriptions.slice(0, 5).map((item, i) => (
           <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-app-bg dark:hover:bg-app-surface-dark/50 transition-colors">
             <div className="flex items-center gap-4">
               <SubscriptionIcon name={item.name} color={item.color} className="w-12 h-12 rounded-2xl shrink-0 group-hover:scale-105 transition-transform" />
               <div>
                 <p className="font-bold text-app-text dark:text-app-text-dark line-clamp-1">{item.name}</p>
                 <p className="text-xs font-semibold text-app-text-muted">{item.interval}</p>
               </div>
             </div>
             <div className="text-right">
               <p className="font-bold text-app-text dark:text-app-text-dark">{site.currency}{item.price}</p>
               <p className={`text-xs font-bold uppercase tracking-wider ${item.status === 'Active' ? 'text-primary' : 'text-app-text-muted/50'}`}>{item.status}</p>
             </div>
           </div>
         )) : (
           <div className="text-app-text-muted font-medium text-center py-10">{blocks.activity.empty}</div>
         )}
       </div>
    </GlassCard>
  );
}
