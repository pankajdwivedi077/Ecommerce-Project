import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/productSlice";
import { Label } from "../ui/label";
import StarRatingComponet from "../common/Rating";
import { useState, useEffect } from "react";
import { addReview, getAllReviews } from "@/store/shop/reviewSlice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.review);
  const [loading, setLoading] = useState(true); // Add loading state
  const { cartItems } = useSelector((state) => state.shopCart)
  const { toast } = useToast();
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {

    let getCartItems = cartItems?.items || []

    if (getCartItems.length){
      const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId );
      if(indexOfCurrentItem > -1){
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock){
            toast({
                title: `Only ${getQuantity} quantity can be addred for this item`,
                variant: 'destructive'
            })
            return;
        }
      }
    }    

    if (!user || !user.id) {
      console.error("User ID is missing");
      return;
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId: user?.id }));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {

    dispatch(setProductDetails());
    setRating(0)
    setReviewMsg('')
    setOpen(false);
    setLoading(true);
  }

  function handleRatingChange(getRating){
     setRating(getRating)
  }

  function handleAddReview() {

    // console.log("Sending Review Data:", {
    //     productId: productDetails?._id, 
    //     userId: user?.id, 
    //     userName: user?.userName, 
    //     reviewMessage: reviewMsg, 
    //     reviewValue: rating
    // });

    dispatch(addReview({
        productId: productDetails?._id, 
        userId: user?.id, 
        userName: user?.userName, 
        reviewMessage: reviewMsg, 
        reviewValue: rating
    })).then((data) => {
        console.log("Review API Response:", data);
        if (data?.payload?.success) {
            setRating(0)
            setReviewMsg('')
            dispatch(getAllReviews(productDetails?._id));  // Refresh the reviews list
            toast({
              title: 'review added succesfully'
            })
        }
    });
}


//   function handleAddReview(){
//     const reviewData = {
//       productId: productDetails?._id, 
//       userId: user?.id, 
//       userName: user?.userName, 
//       reviewMessage: reviewMsg, 
//       reviewValue: rating
//     };

//     console.log("Sending Review Data:", reviewData); // Debug log

//     dispatch(addReview(reviewData))
//     .then((data) => {
//       console.log("Review API Response:", data);  // Debug log response
//     })
//     .catch((error) => {
//       console.error("Error in submitting review:", error);  // Catch errors
//     });
// }


  useEffect(() => {
    if (productDetails) {
      setLoading(false); // Set loading to false when data arrives
    }
  }, [productDetails]);

  // console.log("Product Details:", JSON.stringify(productDetails, null, 2));

  useEffect(() => {
     if (productDetails !== null) dispatch(getAllReviews(productDetails?._id))
  }, [productDetails])

  const averageReview = reviews && reviews.length > 0 ?  reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0 )/ reviews.length : 0 ;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={` text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponet rating={averageReview} />
            
            </div>
            <span className="text-muted-foreground">{averageReview.toFixed(2)}</span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button
                // onClick={() => handleAddtoCart(productDetails?._id)}
                className="w-full opacity-50 cursor-not-allowed"
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddtoCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="w-full"
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
            {
              reviews && reviews.length > 0 ?
              reviews.map((reviewItem) => <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{reviewItem?.userName}</h3>
                </div>
                <div className="flex items-center gap-0.5">
                  <StarRatingComponet rating={reviewItem?.reviewValue} />
                </div>
                <p className="text-muted-foreground">{reviewItem?.reviewMessage}</p>
              </div>
            </div> ) : <h1>No Reviews</h1>
            }
            
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponet rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <Input name="reviewMsg" value={reviewMsg} onChange={(e)=>setReviewMsg(e.target.value)} placeholder="Write a review.." />
              <Button onClick={() => handleAddReview()} disabled={reviewMsg.trim() === ""} >Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
