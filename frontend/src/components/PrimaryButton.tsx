import Link from "next/link";
import { FC, ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  isLink?: boolean;
  href?: string;
  handleClick?: () => void;
}

const BUTTON_STYLES =
  "text-base flex h-[36px] min-w-[90px] cursor-pointer items-center justify-center rounded-lg border-2 border-action bg-action py-2 px-3 font-semibold text-white hover:opacity-50";

const PrimaryButton: FC<PrimaryButtonProps> = ({
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

export default PrimaryButton;
