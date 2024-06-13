import { PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  onClick?(): void;
}>;

export function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <button className="btn" type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
