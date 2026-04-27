import site from '@/app/config/site';
import { currencies } from '@/app/config/content';
import { getCalendarFeedData } from '@/stores/ics';
import * as ics from 'ics';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { token } = await params;

  if (!token) {
    return new NextResponse("Token missing", { status: 400 });
  }

  let subscriptions;
  try {
    subscriptions = await getCalendarFeedData(token);
  } catch (error) {
    return new NextResponse(error.message, { status: error.message.includes("Invalid") ? 401 : 500 });
  }

  const events = (subscriptions || []).map((sub) => {
    const d = new Date(sub.renewalDate);
    const start = [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()];

    let recurrenceRule = 'FREQ=MONTHLY';
    if (sub.interval === 'Weekly') recurrenceRule = 'FREQ=WEEKLY';
    if (sub.interval === 'Yearly') recurrenceRule = 'FREQ=YEARLY';

    const currencySymbol = currencies.find(c => c.code === sub.currency)?.symbol || '€';
    return {
      title: `${sub.name} - ${sub.price}${currencySymbol}`,
      description: `${sub.category}`,
      start,
      calName: site.name,
      recurrenceRule,
      uid: `${sub.id.replace(/-/g, '')}@${site.name}`
    };
  });

  const { error, value } = ics.createEvents(events);

  if (error) {
    console.error("ICS Event Generation Error:", error);
    return new NextResponse("Error generating ICS feed.", { status: 500 });
  }

  return new NextResponse(value, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="subscriptions.ics"',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
    }
  });
}
