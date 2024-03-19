import * as React from "react";

import { cn } from "~/shared/lib/class-name";
import Icon from "~/shared/ui/icon";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled = false, type, ...props }, ref) => {
    const [isFocus, setIsFocus] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <section
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className={cn(
          "flex h-10 items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-sm ring-offset-white",
          isFocus && "ring-2 ring-slate-950 ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input
          type={type === "password" && isOpen ? "text" : type}
          className={cn(
            "flex w-full grow outline-none placeholder:text-slate-500 disabled:cursor-not-allowed",
            className,
          )}
          disabled={disabled}
          spellCheck={false}
          ref={ref}
          {...props}
        />

        {type === "password" && (
          <div onClick={() => setIsOpen((prev) => !prev)} className="-mr-1.5 cursor-pointer p-1.5">
            <Icon size={18} name={isOpen ? "Unlock" : "Lock"} />
          </div>
        )}
      </section>
    );
  },
);
Input.displayName = "Input";

export { Input };
