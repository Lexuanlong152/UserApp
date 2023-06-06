import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const handleClickBackLogin = () => {
    navigate("/login");
  };
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return (
      <>
        <div>You don't have permission</div>
        <div>
          <Button onClick={handleClickBackLogin} variant="btn btn-info">
            Trở lại Login
          </Button>
        </div>
      </>
    );
  }
  return <> {props.children}</>;
};

export default PrivateRoute;
