import Address from "@/components/shopping-view/Address";
import img from "../../assets/account2.jpeg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/CartItemsContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/orderSlice";
import { useToast } from "@/hooks/use-toast";

function ShoppingCheckout() {

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const dispatch = useDispatch()
  const { toast } = useToast()

  const [currentSelectAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  

  const totalCartAmount =
  cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salesPrice > 0
            ? currentItem?.salesPrice
            : currentItem?.price) *
            currentItem?.quantity,
        0
      )
    : 0;

  function handleInitiatePaypalPayment() {

    if (cartItems.items.length === 0){
      toast({
        title: 'Your cart empty please add items to proceed',
        variant: 'destructive'
      })
      return;
    }

    if (currentSelectAddress === null){
      toast({
        title: 'Please select one address to proceed. by clicking on the address provide by you',
        variant: 'destructive'
      })
      return;
    }

    const orderData = {

      userId : user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map(singleCartItem => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        // salePrice: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price ,
        quantity: singleCartItem?.quantity
})),
        addressInfo: {
          addressId:  currentSelectAddress?._id,
          address: currentSelectAddress?.address,
          city:  currentSelectAddress?.city,
          pincode: currentSelectAddress?.pincode,
          phone: currentSelectAddress?.phone,
          notes: currentSelectAddress?.notes
      },
      orderStatus: 'pending'  ,
      paymentMethod: 'paypal' ,
      paymentStatus: 'pending' ,
      totalAmount: totalCartAmount ,
      orderDate: new Date() ,
      orderUpdateDate: new Date()  ,
      paymentId: '' ,
      payerId: '' ,
    }

    // console.log("Final Order Data Before Dispatch:", JSON.stringify(orderData, null, 2));

    
     dispatch(createNewOrder(orderData)).then((data) => {
      // console.log("Redux Thunk Response:", data);
      if(data?.payload?.success){
        setIsPaymentStart(true)
      }else{
        setIsPaymentStart(false)
      }
     })

  }

  if (approvalURL){
    window.location.href = approvalURL;
  }

  // console.log(cartItems, "cartItems");
  // console.log(currentSelectAddress, "currentSelectAddres")


  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className=" w-full h-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address selectId={currentSelectAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-5">
          {cartItems &&
          cartItems.items &&
          Array.isArray(cartItems.items) &&
          cartItems.items.length > 0 ? (
            cartItems.items.map((item) => (
              <UserCartItemsContent cartItem={item} key={item.id} />
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
          <div className="mt-8 space=y-4">
            <div className="flex justify-between ">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
             {
              isPaymentStart ? 'Processing Payal Payment ' : 'Checkout with Payapal'
             }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
