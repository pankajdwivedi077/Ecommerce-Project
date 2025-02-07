import { Link, useNavigate } from "react-router-dom";
import { House, Menu, ShoppingCart, User, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { logOutUser } from "@/store/authSlice";
import UserCartWrapper from "./CartWrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cartSlice";
import { Label } from "../ui/label";

function MenuItems(){

    const navigate = useNavigate()

    function handleNavigate(getCurrentMenuItem){
        sessionStorage.removeItem("filters")
        const currentFilter = getCurrentMenuItem.id !== 'home' ? 
        {
            category: [getCurrentMenuItem.id]
        } : null

        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        navigate(getCurrentMenuItem.path)
    }

    return <nav className="flex flex-col mt-2 lg:mt-0 lg:items-center gap-6 lg:flex-row">
        {
        shoppingViewHeaderMenuItems.map((menuItem) => <Label onClick={()=> handleNavigate(menuItem)}  className="text-sm font-medium cursor-pointer" key={menuItem.id}>{menuItem.label}</Label> )
    }
    </nav>
}

function HeaderRightContent(){

    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.shopCart)

    const [ openCartSheet, setOpenCartSheet ] = useState(false);
    
    const navigate = useNavigate()

    function handleLogout(){
      dispatch(logOutUser())
    }

    useEffect(() => {
        dispatch(fetchCartItems( { userId: user?.id }))
    }, [dispatch])

    console.log(cartItems.items, "p")

    return <div className="flex lg:items-center lg:flex-row flex-col gap-4" >
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon" >
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} />
        </Sheet>
       
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Avatar className="bg-black" >
                    <AvatarFallback className="bg-black text-white font-extrabold flex items-center justify-center w-full h-full" >{user?.userName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56" >
                <DropdownMenuLabel>Logged in as {user?.userName} </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/shop/account')} >
                 <User className="mr-2 h-4 w-4" />
                 Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}

function ShoppingHeader(){

    const { isAuthenticated } = useSelector((state) => state.auth)
    console.log( "useruser")

    return <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
        <House className="h-6 w-6" />
        <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
            <SheetTrigger asChild >
               <Button variant="outline" size="icon" className="lg:hidden" >
               <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
               </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs" >
               <MenuItems />
               <HeaderRightContent />
            </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
           <MenuItems />
        </div>
        <div className="hidden lg:block">
                <HeaderRightContent />
            </div> 
        

      </div>
    </header>
}

export default ShoppingHeader;