import ProductFilter from "@/components/shopping-view/Filter";
import ShoppingProductTile from "@/components/shopping-view/Product-Tile";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { fetchAllFilterdProducts, fetchProductDetail } from "@/store/shop/productSlice";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from 'lucide-react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams){
  const queryParams = [];
  for(const [key, value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length > 0 ){
        const paramValue = value.join(',')
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return queryParams.join('&')
}

function ShoppingListing(){

    const dispatch = useDispatch()
    const { productsList, productDetails } = useSelector((state) => state.shopProduct)
    const {  user, isAuthenticated } = useSelector((state) => state.auth)

    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState(null)
    
    const [searchParams, setSearchParams] = useSearchParams();

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    const { toast } = useToast()

    function handleSort(value){
         setSort(value)
    }

    function handleFilter(getSelectionId, getCurrentOptions){
        console.log(getSelectionId, getCurrentOptions)

        let copyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSelectionId);
        if(indexOfCurrentSection === -1){
            copyFilters = {
                ...copyFilters,
                [getSelectionId]: [getCurrentOptions]
            }
        }else{
            const indexOfCurrentOptions = copyFilters[getSelectionId].indexOf(getCurrentOptions)
            if (indexOfCurrentOptions === -1){
                copyFilters[getSelectionId].push(getCurrentOptions)
            }else{
                copyFilters[getSelectionId].splice(indexOfCurrentOptions, 1)
            }
        }
        setFilters(copyFilters)
        sessionStorage.setItem('filters', JSON.stringify(copyFilters));
    }

    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetail(getCurrentProductId))
    }

    function handleAddtoCart(getCurrentProductId){
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
       setSort("price-lowtohigh")
       setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    }, [])
    
    useEffect(() => {
       if(filters && Object.keys(filters).length > 0 ){
        const createQueryString = createSearchParamsHelper(filters)
        setSearchParams(new URLSearchParams(createQueryString))
       }
    }, [filters])

    // fetch products
    useEffect(() => {
        if (filters !== null && sort !== null )
       dispatch(fetchAllFilterdProducts({filterParams: filters, sortParams: sort}))
    }, [dispatch, sort, filters])

    useEffect(() => {
      if (productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails])

    // console.log(cartItems, "pr")
    // console.log(user.id)

    return <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 p-4 md:p-6" >
        <ProductFilter handleFilter={handleFilter} filters={filters}/>
        <div className="bg-background w-full rounded-lg shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-extrabold ">All Products</h2>
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{productsList?.length}</span>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="outline" size="sm" className="flex items-center gap-1" >
                         <ArrowUpDown className="h-4 w-4" />
                         <span>Sort by</span>
                         </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]" >
                        <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} >
                            {
                                sortOptions.map((sortItem) => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id} >{sortItem.label}</DropdownMenuRadioItem> )
                            }
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {
                    productsList && productsList.length > 0 ?
                    productsList.map((productItem) => <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} key={productItem._id} product={productItem} handleAddtoCart={handleAddtoCart} /> ) : null
                }
                
             </div>
        </div>
        <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
}

export default ShoppingListing;