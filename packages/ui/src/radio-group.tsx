import {
  createContext,
  useContext,
  useId,
  type ReactNode,
} from "react";
import { cn } from "./cn";

type RadioGroupContextValue = {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext(component: string): RadioGroupContextValue {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error(`${component} must be used within RadioGroup`);
  }
  return ctx;
}

export type RadioGroupProps = {
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
  className?: string;
  children: ReactNode;
};

export function RadioGroup({ value, onValueChange, name: nameProp, className, children }: RadioGroupProps) {
  const autoName = useId();
  const name = nameProp ?? `radio-${autoName}`;
  return (
    <RadioGroupContext.Provider value={{ name, value, onValueChange }}>
      <div className={cn("ui:flex ui:flex-col ui:gap-2", className)} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export type RadioItemProps = {
  value: string;
  id: string;
  label: ReactNode;
  className?: string;
};

export function RadioItem({ value, id, label, className }: RadioItemProps) {
  const { name, value: groupValue, onValueChange } = useRadioGroupContext("RadioItem");
  const checked = groupValue === value;

  return (
    <div className={cn("ui:flex ui:items-center ui:gap-2", className)}>
      <input
        checked={checked}
        className="ui:h-4 ui:w-4 ui:shrink-0 ui:border ui:border-border-default ui:bg-surface-raised ui:text-semantic-brand focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40"
        id={id}
        name={name}
        onChange={() => {
          onValueChange(value);
        }}
        type="radio"
        value={value}
      />
      <label className="ui:text-sm ui:text-text-primary" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
