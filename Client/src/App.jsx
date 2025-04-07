import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/theme_context';
import { UserProvider } from './contexts/UserContext';
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

function App() {
    return (
        <UserProvider>
            <ThemeProvider storageKey="theme">
                <Router>
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
                                path="/location_details"
                                element={<TourList />}
                            />
                            <Route
                                index
                                path="/tour_details/:id"
                                element={<TourDetail />}
                            />
                            <Route
                                index
                                path="/category_details/:categoryId"
                                element={<TourCategoryDetail />}
                            />
                            <Route
                                index
                                path="/payment"
                                element={<PaymentPage />}
                            />
                            <Route
                                path="/xac-nhan-thanh-toan"
                                element={<PaymentConfirmation />}
                            />
                            <Route
                                index
                                path="/tours"
                                element={<TourList />}
                            />
                        </Route>
                        {/*Admin */}
                        <Route
                            path="/admin"
                            element={<Layout1 />}
                        >
                            <Route
                                index
                                element={<Dashboard />}
                            />
                            <Route
                                path="/admin/analytics"
                                element={<h1 className="title">Analytics</h1>}
                            />
                            <Route
                                path="/admin/reports"
                                element={<h1 className="title">Reports</h1>}
                            />
                            <Route
                                path="/admin/customers"
                                element={<h1 className="title">Customers</h1>}
                            />
                            <Route
                                path="/admin/new-customer"
                                element={<h1 className="title">New Customer</h1>}
                            />
                            <Route
                                path="/admin/verified-customers"
                                element={<h1 className="title">Verified Customers</h1>}
                            />
                            <Route
                                path="/admin/products"
                                element={<h1 className="title">Products</h1>}
                            />
                            <Route
                                path="/admin/new-product"
                                element={<h1 className="title">New Product</h1>}
                            />
                            <Route
                                path="/admin/inventory"
                                element={<h1 className="title">Inventory</h1>}
                            />
                            <Route
                                path="/admin/settings"
                                element={<h1 className="title">Settings</h1>}
                            />
                        </Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </UserProvider>
    );
}

export default App;
