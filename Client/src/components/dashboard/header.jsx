import { useTheme } from "@/hooks/use-theme"
import { ChevronsLeft, Search } from "lucide-react";
import PropTypes from "prop-types";
//import profileImg from "../assets/image/profile-image.jpg";

export const Header = ({ collapsed, setCollapsed }) => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleCollapseToggle = () => {
        setCollapsed(!collapsed); // Correctly update the collapsed state
    };

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={handleCollapseToggle} // Fixed onClick for toggling collapse
                >
                    <ChevronsLeft className={collapsed ? "rotate-180" : ""} /> {/* Fix conditional class */}
                </button>
                <div className="input">
                    <Search size={20} className="text-slate-300" />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search.."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={toggleTheme} // Fixed the theme toggle logic
                >
                    {/* Optionally add a theme icon here */}
                    {theme === "light" ? "🌞" : "🌙"} {/* Simple icon toggle */}
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool.isRequired, // Ensure collapsed is required and boolean
    setCollapsed: PropTypes.func.isRequired, // Ensure setCollapsed is a function
};
