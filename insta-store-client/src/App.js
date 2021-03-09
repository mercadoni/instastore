import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import StoresList from './pages/StoresList';
import NearestRestaurant from './pages/NearestRestaurant';
function App() {
  return (
    <Router>
    <div>
      <Nav />

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/restaurants">
          <StoresList />
        </Route>
        <Route path="/nearest">
          <NearestRestaurant />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
