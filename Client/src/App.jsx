import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/theme_context';
import Layout1 from './pages/dashboard/layout';
import Layout2 from './pages/layout.jsx';
import Dashboard from './pages/dashboard/page';
import Home from './pages/home/main_page';
import Profile from './pages/profile/profile';
import Signin from './pages/auth/signin';
import Signup from './pages/auth/signup';
import ForgotPassword from './pages/auth/forget_password';
import TourDetail from './pages/tour_details/tour_detail.jsx';
import TourCategoryDetail from './pages/category_details/category_details.jsx';
import PaymentPage from './pages/payment/payment.jsx';
import PaymentConfirmation from './pages/payment/confirm.jsx';
import TourList from './pages/location_details/location_details.jsx';
import PaymentSuccess from './pages/payment/completed.jsx';
import TourManagementPage from './pages/admin/tourManagement.jsx';
import UserManagement from './pages/admin/UserManagement.jsx';
import TourSearch from './pages/tour_search/tour_search.jsx';
import { useState, useEffect } from 'react';
import TourFormModal from './components/Modal/TourFormModal';
import BookingManagement from './pages/admin/bookingManagement.jsx';

// eslint-disable-next-line react/prop-types
function AdminProtectedRoute({ children }) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.email.trim().toLowerCase() !== 'admin@gmail.com') {
        return <div>Access Denied. Bạn không có quyền truy cập trang admin.</div>;
    }
    return children;
}

function App() {
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        location_id: '',
        title: '',
        category_id: '',
        price: '',
        available: '',
        start_date: '',
        end_date: '',
        status: 'Active',
        description: '',
        image_url: '',
        // ... other fields ...
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdating] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('http://localhost/server/public/locations'); // your API endpoint
                const data = await response.json();
                // Log the fetched data
                setLocations(data);
            } catch (error) {
                console.error('Failed to fetch locations:', error);
            }
        };
        fetchLocations();
    }, []);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch('http://localhost/server/public/categories'); // your API endpoint
                const data = await response.json();
                // Log the fetched data
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch locations:', error);
            }
        };
        fetchCategory();
    }, []);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // ...submit logic...
    };
    return (
        <ThemeProvider storageKey="theme">
            <Router>
                <div className="min-h-screen">
                    <TourFormModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        formData={formData}
                        onSubmit={onSubmit}
                        onChange={onChange}
                        isUpdating={isUpdating}
                        modalTitle="Add Tour"
                        onFileChange={() => {}}
                        locations={locations}
                        categories={categories}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={<Layout2 />}
                        >
                            {/*Trang Home*/}
                            <Route
                                index
                                element={<Home />}
                            />{' '}
                            <Route
                                index
                                path="/profile"
                                element={<Profile />}
                            />{' '}
                            {/* Trang Profile */}
                            <Route
                                index
                                path="/signin"
                                element={<Signin />}
                            />{' '}
                            {/* Trang Đăng nhập */}
                            <Route
                                index
                                path="/signup"
                                element={<Signup />}
                            />{' '}
                            {/* Trang Đăng ký */}
                            <Route
                                index
                                path="/forget_password"
                                element={<ForgotPassword />}
                            />
                            <Route
                                index
                                path="/location_details/:location_id"
                                element={<TourList />}
                            />
                            <Route
                                index
                                path="/tour_details/:id"
                                element={<TourDetail />}
                            />
                            <Route
                                index
                                path="/category_details/:category_id"
                                element={<TourCategoryDetail />}
                            />
                            <Route
                                index
                                path="/payment/:id"
                                element={<PaymentPage />}
                            />
                            <Route
                                index
                                path="/payment_confirmation"
                                element={<PaymentConfirmation />}
                            />
                            <Route
                                index
                                path="/payment_completed"
                                element={<PaymentSuccess/>}
                            ></Route>
                        </Route>
                        {/*Admin */}
                        <Route
                            path="/admin"
                            element={
                                <AdminProtectedRoute>
                                    <Layout1 />
                                </AdminProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={<Dashboard />}
                            />
                            <Route
                                path="dashboard"
                                element={<Dashboard />}
                            />
                            <Route
                                path="tourmanagement"
                                element={<TourManagementPage />}
                            />
                            <Route
                                path="usermanagement"
                                element={<UserManagement />}
                            />
                            <Route
                                path="bookingmanagement"
                                element={<BookingManagement />}
                            />
                            
                        </Route>
                        {/* Thêm route cho tour_search */}
                        <Route
                            path="/tour_search"
                            element={<TourSearch />}
                        />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
