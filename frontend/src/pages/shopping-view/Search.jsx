import ShoppingProductTile from "@/components/shopping-view/Product-Tile";
import { Input } from "@/components/ui/input";
import { getSearchResults, resetSearchResults } from "@/store/shop/searchSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts(){

   const [keyword, setKeyword] = useState('')
   const [searchParams, setSearchParams] = useSearchParams()
   const { searchResults } = useSelector((state) => state.shopSearch)
   const dispacth = useDispatch()

   useEffect(() => {
      if(keyword && keyword.trim() !== '' && keyword.trim().length > 3){
         setTimeout(() => {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispacth(getSearchResults(keyword))
         }, 2000)
      }else{
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispacth(resetSearchResults())
      }
   }, [keyword])
   

   console.log(searchResults, "sr")

    return <div className="container mx-auto md:px-6 px-4 py-8">
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
        {
            !searchResults.length ? <h1 className="text-5xl font-extrabold">No result found</h1> : null
        }
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
               {
                searchResults.map((item) => <ShoppingProductTile product={item} /> ) 
               }
       </div>
    </div>
}

export default SearchProducts;