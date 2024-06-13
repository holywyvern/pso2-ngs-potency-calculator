import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const modal = document.getElementById("modal")!;

type ModalProps = PropsWithChildren<{ open?: boolean }>;

export function Modal({ open, children }: ModalProps) {
  return createPortal(
    <div className={`modal ${open ? "open" : "close"}`}>
      <div className="modal-content">{children}</div>
    </div>,
    modal
  );
}
