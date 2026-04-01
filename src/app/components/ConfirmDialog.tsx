import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <AlertDialogTitle className="text-xl font-semibold text-[#1e293b] mb-2">
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription className="text-[#64748b] mb-6">
          {description}
        </AlertDialogDescription>
        <div className="flex gap-3 justify-end">
          <AlertDialogCancel className="px-4 py-2 bg-[#f8fafc] text-[#1e293b] rounded hover:bg-[#e2e8f0] transition-colors border-none cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="px-4 py-2 bg-[#ef4444] text-white rounded hover:bg-[#dc2626] transition-colors border-none cursor-pointer"
          >
            Confirm Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}