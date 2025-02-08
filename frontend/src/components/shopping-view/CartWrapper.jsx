import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./CartItemsContent";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salesPrice > 0
              ? currentItem?.salesPrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const navigate = useNavigate();

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
          : null}
      </div>
      <div className="mt-8 space=y-4">
        <div className="flex justify-between ">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout")
          setOpenCartSheet(false)
        }}
        className="w-full mt-5"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
