import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/theme_context';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
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
import TourManagementPage from './pages/admin/tourManagement.jsx';
import UserMangement from './pages/admin/UserManagement.jsx';
import BookingManagement from './pages/admin/bookingManagement.jsx';

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
                            element={
                                <ProtectedRoute>
                                    <Layout1 />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                path="/admin/dashboard"
                                element={<Dashboard />}
                            />
                            <Route
                                path="/admin/tourManagement"
                                element={<TourManagementPage />}
                            />
                            <Route
                                path="/admin/userManagement"
                                element={<UserMangement />}
                            />
                            <Route
                                path="/admin/bookingManagement"
                                element={<BookingManagement />}
                            />
                        </Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </UserProvider>
    );
}

export default App;
