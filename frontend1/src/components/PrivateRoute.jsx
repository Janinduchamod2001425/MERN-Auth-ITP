import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = () => {

    const { sellerInfo } = useSelector((state) => state.auth);

    return sellerInfo ? <Outlet /> : <Navigate to='/login' replace />;

};

export default PrivateRoute
