import Link from "next/link";
import { FC, ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  isLink?: boolean;
  href?: string;
  handleClick?: () => void;
}

const BUTTON_STYLES =
  "text-base border-light bg-light text-primary flex h-[36px] min-w-[90px] cursor-pointer items-center justify-center rounded-lg border-2 py-2 px-3 font-semibold hover:opacity-50";

const SecondaryButton: FC<SecondaryButtonProps> = ({
  children,
  isLink = false,
  href = "/",
  handleClick = () => {},
}) => {
  return isLink ? (
    <Link href={href} className={BUTTON_STYLES}>
      {children}
    </Link>
  ) : (
    <button onClick={handleClick} className={BUTTON_STYLES}>
      {children}
    </button>
  );
};

export default SecondaryButton;
