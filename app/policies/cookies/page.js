import PolicySection from '@/app/components/organisms/PolocySection';
import { cookiePolicy } from '@/app/config/content';

export default function CookiePolicyPage() {
  return <PolicySection policy={cookiePolicy} />;
}
