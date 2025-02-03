import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from 'lucide-react';
import { logOutUser } from "@/store/authSlice";

function AdminHeader({ setOpen }){

    const dispatch = useDispatch()

    function handleLogOut(){
      dispatch(logOutUser())
    }

    return <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
      <AlignJustify />
      <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogOut} className="inline-flex gap-2 items-center rounded-b-md px-4 py-2 text-sm font-medium shadow">
        <LogOut />
        Logout
        </Button>
      </div>
    </header>
  }
  
  export default AdminHeader;