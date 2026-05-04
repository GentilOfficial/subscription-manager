"use client";

import CalendarFeedSection from '@/app/components/organisms/CalendarFeedSection';
import ChangePasswordSection from '@/app/components/organisms/ChangePasswordSection';
import ProfileSection from '@/app/components/organisms/ProfileSection';
import { settings } from '@/app/config/content';

export default function SettingsPage() {
  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-app-text dark:text-app-text-dark mb-4">
            {settings.heading}
          </h1>
          <p className="text-lg md:text-xl text-app-text-muted font-medium">
            {settings.subtitle}
          </p>
        </header>

        <div className="space-y-8">
          <ProfileSection />
          <ChangePasswordSection />
          <CalendarFeedSection />
        </div>
      </div>
    </>
  );
}
