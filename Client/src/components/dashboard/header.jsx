import { useTheme } from "@/hooks/use-theme"
import { ChevronsLeft } from "lucide-react";
import PropTypes from "prop-types";
//import profileImg from "../assets/image/profile-image.jpg";

export const Header = ({ collapsed, setCollapsed }) => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleCollapseToggle = () => {
        if (typeof setCollapsed === 'function') {
            setCollapsed(!collapsed);
        }
    };

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={handleCollapseToggle}
                >
                    <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
                </button>

            </div>
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={toggleTheme}
                >
                    {theme === "light" ? "🌞" : "🌙"}
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired
};
