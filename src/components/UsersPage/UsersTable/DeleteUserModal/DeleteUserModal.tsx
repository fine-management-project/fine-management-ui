"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { useDeleteUser } from "../hooks";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  userId: string;
};

const DeleteUserModal = ({ userId }: Props): React.JSX.Element => {
  const { isLoading, onDeleteUser, open, setOpen } = useDeleteUser({ userId });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TrashIcon className="cursor-pointer  hover:text-purple-400" />
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogTitle>Delete user?</DialogTitle>
          <DialogFooter>
            <DialogClose asChild disabled={isLoading}>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => onDeleteUser()}>
              Delete {isLoading && <Spinner />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DeleteUserModal;
