import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
    const { user, loadingUser } = useAuth();
    if (loadingUser) {
        return <div className="p-6">Loading...</div>;
    }

    if (!user) return <Navigate to="/login" replace />;
    return children;
}

export default ProtectedRoute;

// This component is returning the children components if the user is authentciated