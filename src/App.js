import "./App.scss";
import Container from "react-bootstrap/Container";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoute from "./routers/AppRoute";

function App() {
  const { user , login } = useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem('token')){
      login(localStorage.getItem("email"),localStorage.getItem("token"))
    }
  },[])

  return (
    <div className="app-container">
      <Container>
        <AppRoute />
      </Container>
    </div>
  );
}

export default App;
