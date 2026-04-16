import site from './site';

/**
 * All user-facing text content, organised by page / component.
 * Import what you need: `import { landing } from '@/app/config/content'`
 */

// ─── Landing page ────────────────────────────────────────
export const landing = {
  badge: `${site.name} ${site.version}`,
  headingLine1: 'Own your',
  headingHighlight: 'Capital.',
  subtitle:
    'Track your monthly expenses, manage active services, and take back control of your recurring bills.',
  ctaPrimary: 'Get Started',
  ctaSecondary: 'Sign In',
};

// ─── Login page ──────────────────────────────────────────
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
  defaultError: 'Invalid credentials. Please try again.',
  noAccount: "Don't have an account?",
  signUpLink: 'Create one',
};

// ─── Sign-up page ────────────────────────────────────────
export const signup = {
  brand: site.name,
  heading: 'Create Account',
  subtitle: 'Start tracking your subscriptions today.',
  emailLabel: 'Email',
  emailPlaceholder: 'you@domain.com',
  passwordLabel: 'Password',
  passwordPlaceholder: '••••••••',
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordPlaceholder: '••••••••',
  submitButton: 'Create Account',
  submittingButton: 'Creating account…',
  defaultError: `Account creation is currently unavailable. If you are interested in using the service, please reach out at ${site.contactEmail}.`,
  passwordMismatch: 'Passwords do not match.',
  successMessage: 'Account created! Check your email to confirm, then sign in.',
  hasAccount: 'Already have an account?',
  signInLink: 'Sign in',
};

// ─── Dashboard layout / navbar ───────────────────────────
export const navbar = {
  logoLabel: site.name[0],
  links: {
    overview: 'Overview',
    subscriptions: 'Subscriptions',
  },
  logout: 'Logout',
  loading: 'Loading…',
};

// ─── Dashboard overview ──────────────────────────────────
export const overview = {
  greeting: "Hello, ",
  greetingName: (name) => name,
  subtitle: (monthYear) => `Your subscription pulse for ${monthYear}.`,
  loadingText: 'Initializing space...',
};

// ─── Dashboard blocks ────────────────────────────────────
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

// ─── Subscriptions page ──────────────────────────────────
export const subscriptions = {
  heading: 'Your Subs',
  subtitle: 'Complete overview of your active commitments and structural costs.',
  exportCsv: 'Export CSV',
  importCsv: 'Import CSV',
  addNew: 'Add New',
  loading: 'Initializing space...',
  emptyTitle: 'Silent Space',
  emptyMessage: "You haven't initialized any subscription records in this logical view yet.",
  emptyCta: 'Initiate Block',
  categories: ['Entertainment', 'Music', 'Software', 'Shopping', 'Developer', 'Productivity', 'Other'],
  filterAll: 'All',
};

// ─── Subscription modal ─────────────────────────────────
export const modal = {
  createTitle: 'Create Record',
  editTitle: 'Modify Record',
  nameLabel: 'Service Identity',
  namePlaceholder: 'e.g. Netflix, Spotify',
  priceLabel: 'Valuation',
  pricePlaceholder: '0.00',
  intervalLabel: 'Cycle',
  renewalLabel: 'Next Renewal',
  categoryLabel: 'Classification',
  statusLabel: 'State',
  deleteButton: 'Purge',
  cancelButton: 'Discard',
  saveButton: 'Commit Changes',
  createButton: 'Execute',
  errors: {
    emptyName: 'Service Name cannot be empty.',
    invalidPrice: 'Price must be a valid positive number.',
    noRenewal: 'Renewal date is required.',
  },
};

// ─── CSV Import modal ───────────────────────────────────
export const csvImport = {
  title: 'Import CSV',
  description: 'Upload a',
  descriptionFileType: '.csv',
  descriptionSuffix: 'file to bulk import your subscription records into the dashboard.',
  selectFile: 'Select CSV File',
  dragDrop: 'Click or drag & drop here',
  cancelButton: 'Cancel',
  importButton: 'Import Batch',
  successMessage: (count) => `Successfully imported ${count} subscriptions!`,
  errorMessage: 'Failed to parse the CSV file. Please ensure it follows the required format.',
};

