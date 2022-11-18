import { Navigate } from "react-router-dom";

function PrivateRoute({ user, children }) {
  let userid = localStorage.getItem("currentUser") == null ? false : true;
  return <>{userid ? children : <Navigate to="/ui/login" />}</>;
}

export default PrivateRoute;
