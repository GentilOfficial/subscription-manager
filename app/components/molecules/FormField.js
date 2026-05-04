import Input from '@/app/components/atoms/Input';
import Label from '@/app/components/atoms/Label';

export default function FormField({ 
  label, 
  error, 
  className = '', 
  labelClassName = '',
  inputClassName = '',
  ...inputProps 
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <Label className={`mb-1 ${labelClassName}`}>{label}</Label>}
      <Input 
        {...inputProps} 
        className={`${error ? 'border-accent' : ''} ${inputClassName} ${inputProps.className || ''}`} 
      />
      {error && <span className="text-accent-dark dark:text-accent text-xs mt-1 font-semibold">{error}</span>}
    </div>
  );
}
