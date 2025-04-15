import { forwardRef } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/image/logo.jpg";
import PropTypes from "prop-types";
import { navbarLinks } from "@/constants";
import { cn } from "../../utils/cn";
import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/UserContext"; // Thêm import useUser

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    const location = useLocation();
    const { logout } = useUser(); // Lấy hàm logout từ context

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    const handleClick = (path) => {
        if (path === '/signin') {
            logout(); // Gọi hàm logout khi click vào Logout
        }
    };

    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
        >
            <div className="flex gap-x-3 p-3">
                <img
                    src={logo}
                    alt="Logoipsum"
                    className="dark:hidden w-10 h-10"
                />
                <img
                    src={logo}
                    alt="Logoipsum"
                    className="hidden dark:block w-10 h-10"
                />
                {!collapsed && <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">AirGlobe</p>}
            </div>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
                {navbarLinks.map((navbarLink) => (
                    <nav
                        key={navbarLink.title}
                        className={cn(
                            "flex flex-col gap-y-1",
                            collapsed && "md:items-center"
                        )}
                    >
                        <p className={cn(
                            "text-xs font-semibold uppercase text-slate-600 dark:text-slate-400",
                            collapsed && "md:w-[45px]"
                        )}>
                            {navbarLink.title}
                        </p>
                        {navbarLink.links.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.path}
                                onClick={() => handleClick(link.path)}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-x-3 rounded-lg px-3 py-2 transition-all duration-200 ease-in-out",
                                        collapsed && "md:w-[45px] md:justify-center md:px-0",
                                        isActive
                                            ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                                            : "hover:bg-slate-100 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                                    )
                                }
                            >
                                <link.icon
                                    size={22}
                                    className={cn(
                                        "flex-shrink-0 transition-colors",
                                        isActiveLink(link.path) && "text-white"
                                    )}
                                />
                                {!collapsed && (
                                    <span className={cn(
                                        "whitespace-nowrap transition-colors",
                                        isActiveLink(link.path) && "font-medium"
                                    )}>
                                        {link.label}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                ))}
            </div>
        </aside>
    );
});

Sidebar.displayName = "Sidebar";
Sidebar.propTypes = {
    collapsed: PropTypes.bool,
};