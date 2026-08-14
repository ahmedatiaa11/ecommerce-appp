import { Button } from "../../../@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../@/components/ui/dialog";
import { removeFromCart } from "../../Redux/CartSlice";
import { useAppDispatch } from "../../Redux/ReduxHooks";
type props = {
  id: number;
};
export const DeleteProductDialog = ({ id }: props) => {
  const dispatch = useAppDispatch();
  const handelDelete = (id:number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="text-red-500 hover:text-red-700 font-semibold transition text-lg">
          {" "}
          Delete{" "}
        </button>
      </DialogTrigger>
      <DialogContent
        className="
    sm:max-w-md
    bg-white
    text-black
    border-2
    shadow-xl
  "
      >
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          Are you sure you want to delete this product?
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">close</Button>
          </DialogClose>
          <button onClick={() => handelDelete(id)}> Delete </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
