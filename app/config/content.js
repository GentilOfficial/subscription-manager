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
      heading: '1. Information We Collect',
      content: 'We collect minimal information necessary to provide our service. This includes your email address (for authentication purposes), an optional username, and the subscription data you choose to input (such as service names, pricing, billing cycles, and categories).'
    },
    {
      heading: '2. How We Use Your Information',
      content: 'The information collected is used exclusively to operate the application, manage your secure session, and present your dashboard. We do not use your data for marketing or profiling.'
    },
    {
      heading: '3. Data Storage and Security',
      content: 'Your data is securely stored using Supabase, which provides robust backend infrastructure and database security. All communication between your browser and our servers is encrypted.'
    },
    {
      heading: '4. Third-Party Sharing',
      content: 'We do not sell, trade, or otherwise transfer your personal information to outside parties. There are no third-party trackers or marketing analytics tools integrated into this application.'
    },
    {
      heading: '5. Calendar Synchronization API',
      content: 'If you enable the Calendar Feed (ICS) feature, the application generates a unique URL containing a secure token. This allows calendar apps to read your subscription data (names, prices, renewal dates). Please note that this specific API endpoint is accessible without authentication to anyone who possesses the exact link. Keep your feed link private and revoke it from the Settings page if you believe it has been compromised.'
    },
    {
      heading: '6. Your Rights',
      content: `You have the right to access, modify, or delete your personal data at any time. If you wish to permanently delete your account and all associated data, you can do so by contacting us at ${site.contactEmail}.`
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
      content: 'Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide a secure user experience.'
    },
    {
      heading: '2. Essential Cookies',
      content: 'We use strictly necessary cookies provided by our authentication service (Supabase) to maintain your logged-in session securely. Without these cookies, you would not be able to log in or access your dashboard.'
    },
    {
      heading: '3. Local Storage',
      content: "We utilize your browser's Local Storage strictly to remember your user interface preferences, such as your choice of Light or Dark mode. This data never leaves your device."
    },
    {
      heading: '4. Analytics and Tracking',
      content: 'We respect your privacy. This application does not use any third-party analytics cookies, marketing trackers, or social media pixels.'
    },
    {
      heading: '5. Managing Cookies',
      content: 'Since we only use essential cookies, there is no option to opt-out within the application. However, you can manage or delete cookies at any time through your browser settings.'
    }
  ],
  backHome: 'Back to Home'
};
