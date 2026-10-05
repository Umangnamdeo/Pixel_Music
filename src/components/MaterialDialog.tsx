import { useEffect, useRef, type DetailedHTMLProps, type HTMLAttributes, type ReactNode } from 'react';
import type { MdDialog } from '@material/web/dialog/dialog.js';
import '@material/web/dialog/dialog.js';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'md-dialog': DetailedHTMLProps<HTMLAttributes<MdDialog>, MdDialog>;
    }
  }
}

interface MaterialDialogProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MaterialDialog = ({
  ariaLabel,
  children,
  className,
  isOpen,
  onClose,
}: MaterialDialogProps) => {
  const dialogRef = useRef<HTMLElementTagNameMap['md-dialog'] | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClosed = () => onClose();
    dialog.addEventListener('closed', handleClosed);
    return () => dialog.removeEventListener('closed', handleClosed);
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      void dialog.show();
    } else if (!isOpen && dialog.open) {
      void dialog.close();
    }
  }, [isOpen]);

  return (
    <md-dialog
      ref={dialogRef}
      className={`pixel-material-dialog ${className ?? ''}`}
      aria-label={ariaLabel}
    >
      <div slot="content" className="pixel-material-dialog-content">
        {children}
      </div>
    </md-dialog>
  );
};
