import { useAuth } from "../context/AuthContext"
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser) { // if logged in -> show children
        return children;
    } else {
        return <Navigate to='/login' replace />
    }
}

export default PrivateRoute