import { PropsWithChildren } from "react";

export type WindowProps = PropsWithChildren<{ className?: string }>;

export function Window({ children, className }: WindowProps) {
  return <div className={`window ${className}`}>{children}</div>;
}

function WindowHeader({ children, className }: WindowProps) {
  return <div className={`header ${className}`}>{children}</div>;
}

function WindowBody({ children, className }: WindowProps) {
  return <div className={`body ${className}`}>{children}</div>;
}

Window.Header = WindowHeader;
Window.Body = WindowBody;
