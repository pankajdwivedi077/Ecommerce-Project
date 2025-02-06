import { Button } from "@/components/ui/button"
import bannerOne from "../../assets/b1.jpeg"
import bannerTwo from "../../assets/b2.jpeg"
import bannerThree from "../../assets/b3.jpeg"
import { Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Heater, Images, Shirt, ShirtIcon, ShoppingBagIcon, UmbrellaIcon, WashingMachine, WatchIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllFilterdProducts } from "@/store/shop/productSlice"
import ShoppingProductTile from "@/components/shopping-view/Product-Tile"

const categoriesWithIcon =  [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ]

const brandWithIcons = [
    { id: "nike", label: "Nike", icon: Shirt },
    { id: "adidas", label: "Adidas", icon: WashingMachine },
    { id: "puma", label: "Puma", icon: ShoppingBagIcon },
    { id: "levi", label: "Levi's", icon: Airplay },
    { id: "zara", label: "Zara", icon: Images },
    { id: "h&m", label: "H&M", icon: Heater },
  ]

function ShoppingHome(){

    const [currentSlide, setCurrentSlide] = useState(0)

    const dispatch = useDispatch()
    const { productsList } = useSelector((state) => state.shopProduct)

    const slides = [bannerOne, bannerTwo, bannerThree]

    function handleNavigateToListingPage(getCurrentItem, section){
      sessionStorage.clear();
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length)
        }, 8000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        dispatch(fetchAllFilterdProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))
    }, [dispatch])

    console.log(productsList, "ra")

    return <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden">
            {
              slides.map((slide, index) => (
                <img src={slide} key={index} className={` ${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 w-full h-full object-cover transition-opacity duration-1000`} />
              ))
            }
            <Button onClick={() => setCurrentSlide(prev => (prev -1 + slides.length) % slides.length)} variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80" >
                <ChevronLeftIcon className="w-4 h-4"  />
            </Button>
            <Button onClick={() => setCurrentSlide(prev => (prev + 1 + slides.length) % slides.length)}  variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80" >
                <ChevronRightIcon className="w-4 h-4"  />
            </Button>
        </div>
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        categoriesWithIcon.map((categoryItem) => <Card onClick={() => handleNavigateToListingPage(categoryItem, 'category')} className="cursor-pointer hover:shadown-lg transition-shadow">
                            <CardContent className="flex flex-col items-center justify-center p-6" >
                                <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                                <span className="font-bold">{categoryItem.label}</span>
                            </CardContent>
                        </Card>  )
                    }
                </div>
            </div>
        </section>
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Shop by brand</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {
                        brandWithIcons.map((brandItem) => <Card className="cursor-pointer hover:shadown-lg transition-shadow">
                            <CardContent className="flex flex-col items-center justify-center p-6" >
                                <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                                <span className="font-bold">{brandItem.label}</span>
                            </CardContent>
                        </Card>  )
                    }
                </div>
            </div>
        </section>
        <section className="py-12">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Features products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                productsList && productsList.length > 0 ? productsList.map((productItem) => <ShoppingProductTile product={productItem} /> )  : null
       }
        </div>
        </div>
        </section>
    </div>
        }

export default ShoppingHome;