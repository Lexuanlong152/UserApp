import "./App.scss";
import Container from "react-bootstrap/Container";
import {  useEffect } from "react";
import AppRoute from "./routers/AppRoute";


function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
    }
  }, []);

  return (
    <div className="app-container">
      <Container>
        <AppRoute />
      </Container>
    </div>
  );
}

export default App;
