import { ALLOWED_COLORS, validateSubscription } from '@/app/utils/subscriptionValidation';
import { useAuthStore } from '@/stores/auth';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { modal, subscriptions as subContent } from '@/app/config/content';
import BaseModal from '@/app/components/organisms/BaseModal';
import Button from '@/app/components/atoms/Button';
import FormField from '@/app/components/molecules/FormField';
import Label from '@/app/components/atoms/Label';
import Select from '@/app/components/atoms/Select';
import { SUBSCRIPTION_INTERVALS, SUBSCRIPTION_STATUSES } from '@/app/config/constants';

const AVAILABLE_COLORS = ALLOWED_COLORS;

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  isEditing
}) {
  const { getCurrencySymbol } = useAuthStore();
  const [formData, setFormData] = useState(() => ({
    name: '',
    price: '',
    interval: SUBSCRIPTION_INTERVALS.MONTHLY,
    status: SUBSCRIPTION_STATUSES.ACTIVE,
    category: 'Other',
    color: AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)],
    renewalDate: new Date().toISOString().split('T')[0]
  }));
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData(initialData);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({
          name: '',
          price: '',
          interval: SUBSCRIPTION_INTERVALS.MONTHLY,
          status: SUBSCRIPTION_STATUSES.ACTIVE,
          category: 'Other',
          color: AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)],
          renewalDate: new Date().toISOString().split('T')[0]
        });
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
            <AlertTriangle className="w-5 h-5 shrink-0" />
            {formError}
          </div>
        )}

        <FormField
          label={modal.nameLabel}
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          maxLength={25}
          placeholder={modal.namePlaceholder}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            className="flex-1"
            label={modal.priceLabel}
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder={modal.pricePlaceholder}
            leftIcon={getCurrencySymbol()}
          />
          <div className="flex-[1.5]">
            <Label>{modal.intervalLabel}</Label>
            <Select
              value={formData.interval}
              onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
            >
              <option value={SUBSCRIPTION_INTERVALS.WEEKLY}>{modal.intervals.weekly}</option>
              <option value={SUBSCRIPTION_INTERVALS.MONTHLY}>{modal.intervals.monthly}</option>
              <option value={SUBSCRIPTION_INTERVALS.YEARLY}>{modal.intervals.yearly}</option>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <FormField
            className="flex-1 min-w-0"
            label={modal.renewalLabel}
            type="date"
            value={formData.renewalDate}
            onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
            inputClassName="cursor-pointer appearance-none flex-1 min-w-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label>{modal.categoryLabel}</Label>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {subContent.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </Select>
          </div>
          <div className="flex-1">
            <Label>{modal.statusLabel}</Label>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value={SUBSCRIPTION_STATUSES.ACTIVE}>{modal.statuses.active}</option>
              <option value={SUBSCRIPTION_STATUSES.PAUSED}>{modal.statuses.paused}</option>
              <option value={SUBSCRIPTION_STATUSES.CANCELLED}>{modal.statuses.cancelled}</option>
            </Select>
          </div>
        </div>

        <div>
          <Label className="mb-4">{modal.colorLabel}</Label>
          <div className="flex overflow-x-auto gap-4 pt-3 pb-5 px-3 -mx-3 custom-scrollbar">
            {AVAILABLE_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-10 h-10 shrink-0 rounded-full transition-all duration-300 transform hover:scale-110 ${color} ${formData.color === color
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
            className="flex-1 sm:flex-none"
          >
            {isEditing ? modal.saveButton : modal.createButton}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}

