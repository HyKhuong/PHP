import BottomBar from "../components/home/bottom_bar";
import Navbar from "../components/home/nav_bar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <BottomBar />
        </div>
    );
}

export default Layout;