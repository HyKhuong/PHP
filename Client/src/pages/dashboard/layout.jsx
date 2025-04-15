import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/dashboard/sidebar";
import { cn } from "../../utils/cn";
import { Header } from "../../components/dashboard/header";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

const Layout = () => {
    const isDeskTopDevice = useMediaQuery("(min-width:768px)");
    const [collapsed, setCollapsed] = useState(!isDeskTopDevice);
    const sidebarRef = useRef(null);

    useEffect(() => {
        setCollapsed(!isDeskTopDevice);
    }, [isDeskTopDevice]);

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            <div className={cn("pointer-events-none fixed inset-0 z-10 bg-black opacity-0",
                !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30")}
            />
            <Sidebar ref={sidebarRef} collapsed={collapsed} />
            <div className={cn("transition-[margin] duration-300",
                collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}
            >
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
