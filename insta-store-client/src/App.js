import './App.css';
import Nav from './components/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import StoresList from './pages/StoresList';
import ClosetsStore from './pages/ClosetsStore';
function App() {
  return (
    <Router>
    <div>
      <Nav />

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/" exact component={StoresList} />
        <Route path="/closets" exact component={ClosetsStore}/>
          
      </Switch>
    </div>
  </Router>
  );
}

export default App;
