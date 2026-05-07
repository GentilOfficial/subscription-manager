import PolicySection from '@/app/components/organisms/PolocySection';
import { privacyPolicy } from '@/app/config/content';

export default function PrivacyPolicyPage() {
  return <PolicySection policy={privacyPolicy} />;
}
