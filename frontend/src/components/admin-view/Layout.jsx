import { Outlet } from "react-router-dom";
import AdminSideBar from "./SideBar";
import AdminHeader from "./Header";


function AdminLayout(){
    return (
        <div className="flex min-h-screen w-full" >
            {/* Admin sidebar */}
            <AdminSideBar />
            <div className="flex flex-1 flex-col" >
                {/* Admin header */}
                <AdminHeader />
                <main className="flex-1 flex bg-muted/40 p-4 md:p-6" >
                    <Outlet />
                </main>
            </div>
        </div>
    )  
}

export default AdminLayout;