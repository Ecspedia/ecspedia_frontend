import { ReactNode } from 'react';
import { Minus, Plus, Users, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { GuestSelectorContext } from './utils';
import { useGuestSelectorContext, useGuestSelector } from './hooks';

// ============= Types =============
interface GuestSelectorProps {
  initialAdults?: number;
  onApply: (adults: number) => void;
  onClose: () => void;
}

// ============= Main Component =============
export default function GuestSelector(guestSelectorProps: GuestSelectorProps) {
  const { initialAdults, onApply, onClose } = guestSelectorProps;
  const guestSelectorState = useGuestSelector({ initialAdults, onApply, onClose });

  return (
    <GuestSelectorContext.Provider value={guestSelectorState}>
      <GuestSelector.container>
        <GuestSelector.header icon={Users} title="Number of Adults" />
        <GuestSelector.guestRow label="Adults" description="Ages 13 or above" />
        <GuestSelector.applyButton />
      </GuestSelector.container>
    </GuestSelectorContext.Provider>
  );
}

// ============= Compound Components =============
GuestSelector.container = function GuestSelectorContainer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-overlay shadow-lg flex w-80 flex-col rounded-lg p-6 gap-6 animate-[expandDown_130ms_ease-out] origin-top-left">
      {children}
    </div>
  );
};

GuestSelector.header = function GuestSelectorHeader({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-2 text-primary">
      <Icon size={24} />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
};

GuestSelector.counterButton = function GuestSelectorCounterButton({
  onClick,
  disabled,
  icon: Icon,
  label,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-primary hover:bg-hover disabled:opacity-30 disabled:cursor-not-allowed w-8 h-8 rounded-full border border-primary flex items-center justify-center transition-colors"
      aria-label={label}
    >
      <Icon size={16} />
    </button>
  );
};

GuestSelector.guestRow = function GuestSelectorGuestRow({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  const { adults, handleIncrement, handleDecrement, min, max } = useGuestSelectorContext();

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-primary font-medium">{label}</p>
        <p className="text-secondary text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <GuestSelector.counterButton
          onClick={handleDecrement}
          disabled={adults <= min}
          icon={Minus}
          label={`Decrease ${label.toLowerCase()}`}
        />
        <span className="text-primary font-semibold w-8 text-center">{adults}</span>
        <GuestSelector.counterButton
          onClick={handleIncrement}
          disabled={adults >= max}
          icon={Plus}
          label={`Increase ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
};

GuestSelector.applyButton = function GuestSelectorApplyButton() {
  const { handleApply, isValid } = useGuestSelectorContext();

  return (
    <Button
      text="Apply"
      variant="secondary"
      className="w-full p-3 mt-2"
      onClick={handleApply}
      disabled={!isValid}
    />
  );
};
