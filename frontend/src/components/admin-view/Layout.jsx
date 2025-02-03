import { Outlet } from "react-router-dom";
import AdminSideBar from "./SideBar";
import AdminHeader from "./Header";
import { useState } from 'react';

function AdminLayout(){

    const [openSidebar, setOpenSidebar] = useState(false)

    return (
        <div className="flex min-h-screen w-full" >
            {/* Admin sidebar */}
            <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex flex-1 flex-col" >
                {/* Admin header */}
                <AdminHeader setOpen={setOpenSidebar} />
                <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-4" >
                    <Outlet />
                </main>
            </div>
        </div>
    )  
}

export default AdminLayout;