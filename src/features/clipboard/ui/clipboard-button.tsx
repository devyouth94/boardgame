import { useState } from "react";

import { cn } from "~/shared/lib/class-name";
import { Button } from "~/shared/ui/button";
import Icon from "~/shared/ui/icon";

interface Props {
  value?: string;
}

const ClipboardButton = ({ value = "" }: Props) => {
  const [isClip, setIsClip] = useState(false);

  const onClickCopy = async () => {
    await navigator.clipboard.writeText(value);
    setIsClip(true);

    setTimeout(() => {
      setIsClip(false);
    }, 1000);
  };

  return (
    <Button
      onClick={onClickCopy}
      disabled={isClip}
      variant={isClip ? "default" : "outline"}
      size="icon"
      className={cn("disabled:opacity-100")}
    >
      <Icon name="Copy" className={cn(isClip && "hidden opacity-0 transition-all")} />
      <Icon name="Check" className={cn(!isClip && "hidden opacity-0 transition-all")} />
    </Button>
  );
};

export default ClipboardButton;
