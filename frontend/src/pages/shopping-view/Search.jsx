import ShoppingProductTile from "@/components/shopping-view/Product-Tile";
import { Input } from "@/components/ui/input";
import { getSearchResults, resetSearchResults } from "@/store/shop/searchSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import { fetchAllFilterdProducts, fetchProductDetail } from "@/store/shop/productSlice";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const dispatch = useDispatch();

  const { toast } = useToast()

  const { productsList, productDetails } = useSelector((state) => state.shopProduct)
  const {  user, isAuthenticated } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.shopCart)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 2000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

           function handleGetProductDetails(getCurrentProductId){
               dispatch(fetchProductDetail(getCurrentProductId))
           }

      function handleAddtoCart(getCurrentProductId, getTotalStock){
          console.log(cartItems, "ct")
  
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
         dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
               console.log(data)
          if (data?.payload?.success) {
              dispatch(fetchCartItems({ userId: user?.id }));
              toast({
                  title: "Product is added to cart"
              })
          }
         })
      }

      useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true)
      }, [productDetails])

  console.log(searchResults, "sr");

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products.."
            className="py-6"
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile product={item} 
           handleAddtoCart={handleAddtoCart}
           handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  );
}

export default SearchProducts;
