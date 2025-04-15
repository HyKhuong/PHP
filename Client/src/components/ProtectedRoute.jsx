import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const { user } = useUser();

    // Nếu chưa đăng nhập hoặc không phải admin thì chuyển về signin
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    if (user.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang này!');
        return <Navigate to="/" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;
