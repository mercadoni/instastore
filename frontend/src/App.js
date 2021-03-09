import './App.css';
import Navbar from './components/Navbar/navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Container } from "react-bootstrap";
import Home from './pages'
import Stores from './pages/stores'

function App() {
  return (
    <Router>
      <Navbar/>
      <main>
        <Container fluid>
          <Route path="/" component={Home} exact />
          <Route path="/stores" component={Stores} exact />
        </Container>
      </main>
    </Router>
  );
}

export default App;
