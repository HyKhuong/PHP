import { Link } from "react-router-dom";
import { FaMountain, FaUmbrellaBeach, FaCity, FaTree } from "react-icons/fa"; // Import FontAwesome icons


const categoriesData = [
    { id: "package", name: "Tour Trọn Gói", icon: <FaMountain className="text-4xl text-blue-500 mb-2" /> },
    { id: "flexible", name: "Tour Linh Động", icon: <FaUmbrellaBeach className="text-4xl text-yellow-500 mb-2" /> },
    { id: "luxury", name: "Tour Cao Cấp", icon: <FaCity className="text-4xl text-gray-500 mb-2" /> },
    { id: "experience", name: "Tour Trải Nghiệm", icon: <FaTree className="text-4xl text-green-500 mb-2" /> },
];

const Categories = () => {
    return (
        <div>
            <h1 className="text-black text-3xl font-bold text-center mb-6">Our Popular Categories</h1>
            <div className="flex-1 max-w-4xl mx-auto p-10">
                <ul className="grid md:grid-cols-4 gap-8">
                    {categoriesData.map((category) => (
                        <li key={category.id} className="bg-white rounded-lg hover:bg-gray-200 shadow-xl p-4 flex flex-col items-center border border-gray-300 cursor-pointer">
                            <Link to={`/category_details/${category.id}`} className="flex flex-col items-center">
                                {category.icon}
                                <p className="text-center font-semibold">{category.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
