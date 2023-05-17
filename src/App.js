import "./App.scss";
import Header from "./components/Header";
import UserTable from "./components/UserTable";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <UserTable />
      </Container>
    </div>
  );
}

export default App;
