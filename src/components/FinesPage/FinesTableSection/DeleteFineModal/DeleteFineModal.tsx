import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { TrashIcon } from "lucide-react";
import { useDeleteFine } from "../hooks";

type Props = {
  fineId: string;
};

const DeleteFineModal = ({ fineId }: Props): React.JSX.Element => {
  const { open, setOpen, onDeleteFine, isLoading } = useDeleteFine({ fineId });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TrashIcon className="cursor-pointer  hover:text-purple-400" />
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogTitle>Delete fine?</DialogTitle>
          <DialogFooter>
            <DialogClose asChild disabled={isLoading}>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => onDeleteFine()}>
              Delete {isLoading && <Spinner />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DeleteFineModal;
