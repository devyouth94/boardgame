import { Check, Copy, Lock, Menu, Unlock, type LucideProps } from "lucide-react";

const icon = {
  Check,
  Copy,
  Lock,
  Menu,
  Unlock,
};

type IconName = keyof typeof icon;

interface Props {
  name: IconName;
}

const Icon = ({
  name,
  size = 16,
  strokeWidth = 1.4,
  absoluteStrokeWidth = true,
  ...props
}: Props & LucideProps) => {
  const LucideIcon = icon[name];

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth={absoluteStrokeWidth}
      {...props}
    />
  );
};

export default Icon;
