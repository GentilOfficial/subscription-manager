import site from '@/app/config/site';
import { useEffect, useState } from 'react';
import { modal, subscriptions as subContent } from '../../config/content';
import BaseModal from '../ui/BaseModal';
import Button from '../ui/Button';
import { ALLOWED_COLORS, validateSubscription } from '@/app/utils/subscriptionValidation';

const AVAILABLE_COLORS = ALLOWED_COLORS;

export default function SubscriptionModal({ 
  isOpen, 
  onClose, 
  onSave, 
  onDelete, 
  initialData, 
  isEditing 
}) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    interval: 'Monthly',
    status: 'Active',
    category: 'Other',
    color: AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)],
    renewalDate: new Date().toISOString().split('T')[0]
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: '',
          price: '',
          interval: 'Monthly',
          status: 'Active',
          category: 'Other',
          color: AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)],
          renewalDate: new Date().toISOString().split('T')[0]
        });
      }
      setFormError('');
    }
  }, [isOpen, initialData]);

  const validateForm = () => {
    return validateSubscription(formData, modal.errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      setFormError(errorMsg);
      return;
    }

    const subData = {
      ...formData,
      name: formData.name.trim(),
      price: parseFloat(formData.price)
    };

    onSave(subData);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? modal.editTitle : modal.createTitle}
    >
        <form onSubmit={handleSubmit} className="p-8 space-y-6" noValidate>
          {formError && (
            <div className="p-4 bg-accent-muted border border-accent/20 rounded-2xl text-sm text-accent-dark dark:text-accent font-bold flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {formError}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold tracking-wide text-app-text-muted mb-2">{modal.nameLabel}</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              maxLength={25}
              className="w-full px-5 py-4 bg-app-surface dark:bg-app-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl text-base text-app-text dark:text-app-text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-app-text-muted/50 font-medium"
              placeholder={modal.namePlaceholder}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold tracking-wide text-app-text-muted mb-2">{modal.priceLabel}</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-app-text-muted/50 font-bold">{site.currency}</span>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full pl-9 pr-5 py-4 bg-app-surface dark:bg-app-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl text-base text-app-text dark:text-app-text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-bold"
                  placeholder={modal.pricePlaceholder}
                />
              </div>
            </div>
            <div className="flex-[1.5]">
              <label className="block text-sm font-bold tracking-wide text-app-text-muted mb-2">{modal.intervalLabel}</label>
              <select 
                value={formData.interval}
                onChange={(e) => setFormData({...formData, interval: e.target.value})}
                className="w-full px-5 py-4 bg-app-surface dark:bg-app-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl text-base text-app-text dark:text-app-text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none font-medium cursor-pointer text-center sm:text-left"
              >
                <option value="Weekly">{modal.intervals.weekly}</option>
                <option value="Monthly">{modal.intervals.monthly}</option>
                <option value="Yearly">{modal.intervals.yearly}</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-bold tracking-wide text-app-text-muted mb-2">{modal.renewalLabel}</label>
              <input 
                type="date"
                value={formData.renewalDate}
                onChange={(e) => setFormData({...formData, renewalDate: e.target.value})}
                className="w-full px-5 py-4 bg-app-surface dark:bg-app-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl text-base text-app-text dark:text-app-text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-medium cursor-pointer appearance-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold tracking-wide text-app-text-muted mb-2">{modal.categoryLabel}</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-4 bg-app-surface dark:bg-app-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl text-base text-app-text dark:text-app-text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none font-medium cursor-pointer text-center sm:text-left"
              >
                {subContent.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold tracking-wide text-app-text-muted mb-2">{modal.statusLabel}</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-5 py-4 bg-app-surface dark:bg-app-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl text-base text-app-text dark:text-app-text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none font-medium cursor-pointer text-center sm:text-left"
              >
                <option value="Active">{modal.statuses.active}</option>
                <option value="Paused">{modal.statuses.paused}</option>
                <option value="Cancelled">{modal.statuses.cancelled}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold tracking-wide text-app-text-muted mb-4">{modal.colorLabel}</label>
            <div className="flex flex-wrap gap-4">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-10 h-10 rounded-full transition-all duration-300 transform hover:scale-110 ${color} ${
                    formData.color === color 
                      ? 'ring-4 ring-offset-4 ring-primary dark:ring-offset-app-surface-dark' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="pt-6 mt-4 flex flex-wrap items-center gap-3 border-t border-slate-200/50 dark:border-white/5">
            {isEditing && (
              <Button 
                type="button"
                variant="danger"
                onClick={onDelete}
              >
                {modal.deleteButton}
              </Button>
            )}
            <div className="flex-1"></div>
            <Button 
              type="button"
              variant="subtle"
              onClick={onClose}
            >
              {modal.cancelButton}
            </Button>
            <Button 
              type="submit"
            >
              {isEditing ? modal.saveButton : modal.createButton}
            </Button>
          </div>
        </form>
    </BaseModal>
  );
}

