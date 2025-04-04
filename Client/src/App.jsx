import Home from "./component/home/main_page.jsx";
import Signup from '../src/component/login_page/signup';  // Trang đăng ký
import Signin from '../src/component/login_page/signin';  // Trang đăng nhập
import ForgotPassword from '../src/component/login_page/forget_password';  // Import trang Quên mật khẩu
import Profile from '../src/component/profile/profile';  // Import trang Profile
import {  Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} /> {/*Trang Home*/}
        <Route path="/profile" element={<Profile />} /> {/* Trang Profile */}
        <Route path="/signin" element={<Signin />} />  {/* Trang Đăng nhập */}
        <Route path="/signup" element={<Signup />} />  {/* Trang Đăng ký */}       
        <Route path="/forget_password" element={<ForgotPassword />} /> 
    </Routes>
  );
}

export default App;
