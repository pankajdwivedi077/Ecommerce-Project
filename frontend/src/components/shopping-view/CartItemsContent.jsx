import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/shop/cartSlice";
import { useToast } from "@/hooks/use-toast";


function UserCartItemsContent({ cartItem }){

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { toast } = useToast()

    function handleCartItemDelete(getCartItem){
      dispatch(deleteCartItem({ userId: user?.id , productId: getCartItem?.productId })).then((data) => {
        if(data?.payload?.success){
            toast({
                title: 'Cart items is deleted successfully'
            })
        }
    })
    }

    function handleUpadteQuantity(getCartItem, typeOfAction){
       dispatch(updateCartItem({ userId: user?.id, productId: getCartItem?.productId, quantity:
        typeOfAction === 'plus' ?
        getCartItem?.quantity + 1 : getCartItem?.quantity -1 })).then((data) => {
            if(data?.payload?.success){
                toast({
                    title: 'Cart items is updated successfully'
                })
            }
        })
    }

    return <div className="flex items-center space-x-4">
        <img className="w-20 h-20 rounded object-cover" src={cartItem?.image} alt={cartItem?.title} />
        <div className="flex-1">
            <h3  className="font-extrabold">{cartItem?.title}</h3>
            <div className="flex items-center gap-3 mt-1">
                <Button variant="outline" className="h-8 w-8 rounded-full" size="icon" onClick={()=> handleUpadteQuantity(cartItem, 'minus')} disabled={cartItem?.quantity === 1} >
                    <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                </Button>
                <span className="font-semibold">{cartItem?.quantity}</span>
                <Button onClick={() => handleUpadteQuantity(cartItem, 'plus')} variant="outline" className="h-8 w-8 rounded-full" size="icon" >
                    <Plus className="w-4 h-4" />
                        <span className="sr-only">Increase</span>
                </Button>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <p className="font-semibold">${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2) }</p>
            <Trash onClick={() => handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20} />
        </div>
    </div>
}

export default UserCartItemsContent;

