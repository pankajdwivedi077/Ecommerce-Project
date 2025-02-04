import ProductFilter from "@/components/shopping-view/Filter";
import ShoppingProductTile from "@/components/shopping-view/Product-Tile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilterdProducts } from "@/store/shop/productSlice";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from 'lucide-react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShoppingListing(){

    const dispatch = useDispatch()
    const { productsList } = useSelector((state) => state.shopProduct)

    // fetch products
    useEffect(() => {
       dispatch(fetchAllFilterdProducts())
    }, [dispatch])

    console.log(productsList)

    return <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 p-4 md:p-6" >
        <ProductFilter />
        <div className="bg-background w-full rounded-lg shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-extrabold ">All Products</h2>
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">10 Products</span>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="outline" size="sm" className="flex items-center gap-1" >
                         <ArrowUpDown className="h-4 w-4" />
                         <span>Sort by</span>
                         </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]" >
                        <DropdownMenuRadioGroup>
                            {
                                sortOptions.map((sortItem) => <DropdownMenuRadioItem key={sortItem.id} >{sortItem.label}</DropdownMenuRadioItem> )
                            }
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {
                    productsList && productsList.length > 0 ?
                    productsList.map((productItem) => <ShoppingProductTile key={productItem._id} product={productItem} /> ) : null
                }
                
             </div>
        </div>
    </div>
}

export default ShoppingListing;