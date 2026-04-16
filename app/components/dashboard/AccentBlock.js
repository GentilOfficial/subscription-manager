import SubscriptionIcon from '../SubscriptionIcon';
import { blocks } from '../../config/content';
import site from '../../config/site';
import GlassCard from '../ui/GlassCard';

export default function AccentBlock({ closestSub, daysUntilNext }) {
  return (
    <GlassCard className="md:col-span-6 lg:col-span-4 bg-gradient-to-br from-primary to-accent-dark p-6 sm:p-8 md:p-10 shadow-2xl hover:scale-[1.02] text-white">
      {/* Texture overlay */}
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <h3 className="text-lg font-semibold text-white/80 z-10 mb-8">{blocks.accent.title}</h3>

      <div className="relative z-10">
        {closestSub ? (
          <>
            <SubscriptionIcon name={closestSub.name} color={closestSub.color} className="w-16 h-16 rounded-2xl mb-6 shadow-xl ring-2 ring-white/20" />
            <p className="text-3xl font-extrabold tracking-tight mb-2">{closestSub.name}</p>
            <p className="text-xl font-semibold text-white/80">{site.currency}{closestSub.price} {closestSub.interval.toLowerCase()}</p>

            <div className="mt-8 bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <p className="text-sm font-semibold opacity-90 mb-1">{blocks.accent.dueIn}</p>
              <p className="text-2xl font-bold">
                {daysUntilNext === 0 ? blocks.accent.today : blocks.accent.days(daysUntilNext)}
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full justify-center">
            <p className="text-white/80 font-medium text-lg">{blocks.accent.noPayments}<br />{blocks.accent.noPaymentsSub}</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
