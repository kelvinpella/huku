import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { ComponentProps } from "react";

type Props = ComponentProps<typeof Dialog> & {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  children,
  title,
  description,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      {/* backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-black/30 z-[60]" />
      {/* center dialog */}
      <div className="fixed inset-0 flex items-center justify-center z-[70] px-2 md:px-4">
        <DialogPanel className="w-full md:max-w-lg py-2 px-4 bg-spindle rounded-md border md:border-2 border-gray-500/50 shadow-md">
          <DialogTitle>{title}</DialogTitle>
          <Description className='text-black/60'>{description}</Description>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
