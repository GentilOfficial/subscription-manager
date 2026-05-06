import dedent from 'dedent';
import site from './site';

export const currencies = [
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'USD', symbol: '$', label: 'USD ($)' },
];

export const landing = {
  badge: `${site.name} ${site.version}`,
  headingLine1: 'Own your',
  headingHighlight: 'Capital.',
  subtitle:
    'Track your monthly expenses, manage active services, and take back control of your recurring bills.',
  ctaPrimary: 'Get Started',
  ctaSecondary: 'Sign In',
};

export const login = {
  brand: site.name,
  heading: 'Restricted Access',
  subtitle: 'Enter your credentials to continue.',
  emailLabel: 'Email',
  emailPlaceholder: 'you@domain.com',
  passwordLabel: 'Password',
  passwordPlaceholder: '••••••••',
  submitButton: 'Sign In',
  submittingButton: 'Signing in…',
  defaultError: 'The credentials provided are incorrect. Please try again.',
  noAccount: "Don't have an account?",
  signUpLink: 'Create one',
};

export const signup = {
  brand: site.name,
  disabledHeading: 'Invite Only',
  disabledSubtitle: 'Registration is currently managed via direct invites.',
  contactMessage: `If you were expecting an invite or wish to request access, please contact us at ${site.contactEmail}`,
  backToLogin: 'Back to Login',
};

export const navbar = {
  logoLabel: site.name,
  links: {
    overview: 'Overview',
    subscriptions: 'Subscriptions',
    settings: 'Settings',
  },
  logout: 'Logout',
  loading: 'Loading…',
};


export const overview = {
  greeting: "Hello, ",
  greetingName: (name) => name,
  subtitle: (monthYear) => `Your subscription pulse for ${monthYear}.`,
  syncError: 'Sync Error',
  retrySync: 'Retry Sync',
};

export const blocks = {
  jumbo: {
    title: 'Monthly Burn Rate',
    activeServices: (count) => `${count} Active Services`,
    viewAll: 'View all',
  },
  accent: {
    title: 'Up Next',
    dueIn: 'Due in',
    today: 'Today',
    days: (n) => `${n} day${n !== 1 ? 's' : ''}`,
    noPayments: 'No upcoming payments.',
    noPaymentsSub: "You're all clear.",
    dateLabel: 'Date',
  },
  chart: {
    title: 'Category Distribution',
    tooltipSuffix: '/ mo',
    empty: 'No distribution data available',
  },
  activity: {
    title: 'Recent Activity',
    empty: 'No recent activity.',
  },
};

export const subscriptions = {
  heading: 'Your Subscriptions',
  subtitle: 'Complete overview of your active commitments and structural costs.',
  exportCsv: 'Export CSV',
  importCsv: 'Import CSV',
  addNew: 'Add New',
  emptyTitle: 'Silent Space',
  emptyMessage: "You haven't initialized any subscription records in this logical view yet.",
  emptyCta: 'Initiate Block',
  categories: ['Entertainment', 'Music', 'Software', 'Shopping', 'Developer', 'Productivity', 'Other'],
  filterAll: 'All',
};

export const modal = {
  createTitle: 'Add Subscription',
  editTitle: 'Edit Subscription',
  nameLabel: 'Service Identity',
  namePlaceholder: 'e.g. Netflix, Spotify',
  priceLabel: 'Valuation',
  pricePlaceholder: '0.00',
  intervalLabel: 'Cycle',
  renewalLabel: 'Next Renewal',
  categoryLabel: 'Classification',
  statusLabel: 'State',
  colorLabel: 'Visual Identity',
  intervals: {
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
  },
  statuses: {
    active: 'Active',
    paused: 'Paused',
    cancelled: 'Cancelled',
  },
  deleteButton: 'Delete',
  cancelButton: 'Discard',
  saveButton: 'Save',
  createButton: 'Add',
  errors: {
    emptyName: 'Service Name cannot be empty.',
    nameTooLong: 'Service Name must be at most 25 characters.',
    invalidPrice: 'Price must be a valid positive number.',
    noRenewal: 'Renewal date is required.',
    noCategory: 'Please select a category.',
    noInterval: 'Please select a billing cycle.',
    noStatus: 'Please select a status.',
    noColor: 'Please select a brand color.',
  },
};

export const csvImport = {
  title: 'Import CSV',
  description: 'Upload a',
  descriptionFileType: '.csv',
  descriptionSuffix: 'file to bulk import your subscription records into the dashboard.',
  selectFile: 'Select CSV File',
  dragDrop: 'Click or drag & drop here',
  noSubscriptions: 'No valid subscriptions found in the file.',
  parsing: 'Parsing...',
  cancelButton: 'Cancel',
  importButton: 'Import',
  successMessage: (count) => `Successfully imported ${count} subscriptions!`,
  errorMessage: 'Failed to parse the CSV file. Please ensure it follows the required format.',
};

export const theme = {
  toggleLabel: 'Toggle Theme',
  switchMode: (mode) => `Switch to ${mode} mode`,
};

export const notifications = {
  success: {
    add: 'Subscription added successfully!',
    update: 'Subscription updated successfully!',
    delete: 'Subscription removed successfully!',
    import: (count) => `Successfully imported ${count} subscriptions!`,
    export: 'Data exported successfully!',
  },
  error: {
    add: 'Failed to add subscription.',
    update: 'Failed to update subscription.',
    delete: 'Failed to remove subscription.',
    import: 'Failed to parse the CSV file. Please check the format.',
    export: 'Failed to export data.',
    generic: 'Something went wrong. Please try again.',
  },
};

export const common = {
  errors: {
    domainRequired: 'Domain required',
  },
};

export const notFound = {
  title: '404 - Page Not Found',
  heading: '404',
  subtitle: 'This page does not exist.',
  description: "The address might be incorrect, or the page has been moved or deleted.",
  backHome: 'Back to Home',
};

export const settings = {
  heading: 'Settings',
  subtitle: 'Manage your account preferences and integrations.',
  profile: {
    title: 'Profile Settings',
    description: 'Personalize your account identity.',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Enter your nickname',
    usernameHint: 'Choose a nickname to display on your dashboard.',
    currencyLabel: 'Global Currency',
    currencyHint: 'Select the currency to use across the entire application.',
    updateBtn: 'Save Profile',
    updatingBtn: 'Saving...',
    successMsg: 'Profile updated successfully!',
    errorTooLong: 'Username must be 20 characters or less.',
    errorGeneric: 'Failed to update profile.',
  },
  calendarFeed: {
    title: 'Calendar Feed (ICS)',
    description: 'Sync your active subscriptions with Apple Calendar, Google Calendar, or Outlook.',
    emptyToken: 'You haven\'t configured a calendar feed yet.',
    generateBtn: 'Generate Feed',
    revokeBtn: 'Revoke Access',
    revokeConfirm: 'Are you sure you want to revoke this feed? Your calendar will stop syncing.',
    feedUrlLabel: 'Your private feed URL:',
    copied: 'Link copied to clipboard!',
    revokeModal: {
      title: 'Revoke Access',
      heading: 'Are you sure?',
      cancelBtn: 'Cancel',
      confirmBtn: 'Yes, Revoke'
    }
  },
  changePassword: {
    title: 'Account Security',
    description: 'Update your password to keep your account secure.',
    newPasswordLabel: 'New Password',
    newPasswordPlaceholder: 'Enter new password',
    confirmPasswordLabel: 'Confirm New Password',
    confirmPasswordPlaceholder: 'Repeat new password',
    updateBtn: 'Update Password',
    updatingBtn: 'Updating...',
    successMsg: 'Password updated successfully!',
    errorMismatch: 'Passwords do not match.',
    errorRequirements: 'Please satisfy all password requirements first.',
    requirements: {
      length: 'Minimum 12 characters',
      uppercase: 'At least 1 uppercase letter',
      lowercase: 'At least 1 lowercase letter',
      number: 'At least 1 number',
      special: 'At least 1 special character'
    }
  }
};

export const calendarSync = {
  button: 'Add to Calendar',
  modalTitle: 'Calendar Synchronization',
  step1Title: 'Generate Sync Link',
  step1Desc: 'Create a secure, private link to sync your subscriptions seamlessly with your favorite calendar app.',
  step1Disclaimer: 'Anyone with this link can access your calendar and view your subscriptions data. Keep it private.',
  step2Title: 'Copy Your Feed Link',
  step2Desc: 'Use the link below to subscribe to your feed from your calendar application.',
  generateBtn: 'Generate private link',
  copyBtn: 'Copy Link',
  copiedBtn: 'Copied!',
  instructionsHeadline: 'Quick Instructions',
  instructions: {
    apple: 'Apple Calendar: File > New Calendar Subscription',
    google: 'Google Calendar: Add calendar > From URL',
  }
};

export const footer = {
  privacyPolicy: 'Privacy Policy',
  cookiePolicy: 'Cookie Policy',
};

export const privacyPolicy = {
  title: 'Privacy Policy',
  lastUpdated: 'Last Updated: May 2026',
  sections: [
    {
      heading: '1. Data Controller',
      content: `This application is operated by ${site.ownerName}. As the sole Data Controller, I am responsible for your personal data and its lawful processing under the EU General Data Protection Regulation (GDPR – Regulation 2016/679). You can contact me at [${site.contactEmail}](mailto:${site.contactEmail}).`
    },
    {
      heading: '2. Information I Collect',
      content: dedent`
        I collect only the minimum data necessary to provide this service. This includes:

        - Your **email address** (required for authentication)
        - An optional **display name**
        - The **subscription data** you voluntarily input (such as service names, pricing, billing cycles, and categories)

        I do not collect any sensitive personal data.
      `
    },
    {
      heading: '3. Legal Basis for Processing',
      content: dedent`
        I process your personal data on the following legal bases under Article 6 GDPR:

        - **(a) Performance of a contract** – processing your email and account data is necessary to provide the service you signed up for.
        - **(b) Legitimate interest** – storing your session securely to prevent unauthorized access to your account.
      `
    },
    {
      heading: '4. How I Use Your Information',
      content: dedent`
        Your data is used exclusively to:

        - Operate the application
        - Authenticate your identity
        - Manage your secure session
        - Display your personal dashboard

        I do not use your data for marketing, advertising, or automated profiling of any kind.
      `
    },
    {
      heading: '5. Data Retention',
      content: dedent`
        I retain your personal data for as long as your account remains active.

        - If you **delete your account**, all associated personal data is permanently removed within **30 days**.
        - **Session cookies** are cleared when you log out or when your browser session ends.
      `
    },
    {
      heading: '6. Data Storage, Security and International Transfers',
      content: dedent`
        Your data is stored using **Supabase** (Supabase Inc., USA), which acts as my Data Processor under a Data Processing Agreement (DPA) that includes the EU Standard Contractual Clauses (SCCs), as required by Article 46 GDPR for transfers outside the European Economic Area.

        - All data in transit is encrypted via **HTTPS/TLS**
        - Supabase infrastructure complies with **SOC 2 Type II** standards

        For more details, see [Supabase's privacy policy](https://supabase.com/privacy).
      `
    },
    {
      heading: '7. Third-Party Sharing',
      content: dedent`
        I do not sell, trade, or otherwise transfer your personal data to third parties for commercial purposes.

        **Supabase** is the only external party that processes your data, strictly as a data processor acting on my behalf. There are no third-party advertising trackers, marketing tools, or social media pixels integrated into this application.
      `
    },
    {
      heading: '8. Calendar Synchronization API',
      content: dedent`
        If you enable the **Calendar Feed (ICS)** feature, the application generates a unique URL containing a secure token. This allows calendar applications to read your subscription data (service names, prices, renewal dates).

        > This endpoint *does not require authentication* - anyone in possession of the exact URL can access the feed. Keep your feed link private.

        You can **revoke it at any time** from the Settings page, which will immediately invalidate the previous URL.
      `
    },
    {
      heading: '9. Your Rights under GDPR',
      content: dedent`
        Under the GDPR, you have the following rights regarding your personal data:

        - **Right of access** – obtain a copy of the data I hold about you.
        - **Right to rectification** – correct inaccurate or incomplete data.
        - **Right to erasure** ("right to be forgotten") – request permanent deletion of your data.
        - **Right to restriction of processing** – ask me to limit how I use your data.
        - **Right to data portability** – receive your data in a structured, machine-readable format.
        - **Right to object** – object to processing based on legitimate interests.
        - **Right to withdraw consent** – withdraw it at any time without affecting prior lawfulness.

        To exercise any of these rights, contact me at [${site.contactEmail}](mailto:${site.contactEmail}). I will respond within **30 days**.

        If you believe your rights have been violated, you have the right to lodge a complaint with your national data protection authority.
      `
    }
  ],
  backHome: 'Back to Home'
};

export const cookiePolicy = {
  title: 'Cookie Policy',
  lastUpdated: 'Last Updated: May 2026',
  sections: [
    {
      heading: '1. What Are Cookies?',
      content: `Cookies are small text files stored on your device when you visit a website. They are widely used to make websites function correctly and to provide a secure, consistent user experience across sessions.`
    },
    {
      heading: '2. Cookies I Use',
      content: dedent`
        This application uses **only strictly necessary cookies**, specifically session cookies issued by the authentication provider (Supabase).

        These cookies are essential to maintain your logged-in state securely. Without them, you would not be able to sign in or access your dashboard.

        > No cookies are set before you actively log in.
      `
    },
    {
      heading: '3. Local Storage',
      content: dedent`
        I use your browser's **Local Storage** solely to remember UI preferences, such as your selected Light or Dark mode.

        This data is stored only on your device and is **never transmitted** to my server or to any third party.
      `
    },
    {
      heading: '4. Cookies I Do Not Use',
      content: dedent`
        I do not use:

        - Analytics cookies
        - Marketing cookies
        - Advertising trackers
        - Social media pixels
        - Any other non-essential cookies

        No third-party cookies are set by this application.
      `
    },
    {
      heading: '5. Legal Basis and Consent',
      content: dedent`
        Strictly necessary cookies are **exempt from consent requirements** under the EU ePrivacy Directive and national implementations (such as the Italian Cookie Law), as they are technically indispensable for the service to function.

        Because I use no non-essential cookies, **no cookie consent banner is required**. This policy serves as the required prior disclosure of cookie usage.
      `
    },
    {
      heading: '6. Managing and Deleting Cookies',
      content: dedent`
        You can view, manage, or delete cookies at any time through your browser settings.

        > Disabling session cookies will prevent you from logging in.

        Clearing Local Storage from your browser settings will reset any saved UI preferences.
      `
    },
    {
      heading: '7. Contact',
      content: `For any questions about the use of cookies or this policy, contact me at [${site.contactEmail}](mailto:${site.contactEmail}).`
    }
  ],
  backHome: 'Back to Home'
};
