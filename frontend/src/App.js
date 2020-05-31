import React from 'react';
import Maps from './components/Maps';
import Header from './components/Header';
import Blocker from './components/Blocker';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/App.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { markers: {}, showSearchBar: false };
  }
  handleGetStore = (store, user) => {
    this.setState({ markers: { store, user }, showSearchBar: true });
  }
  render() {
    return (
      <div className="App" >
        <Header />
        <SearchBar
          showSearchBar={this.state.showSearchBar}
          onFindStore={this.handleGetStore}
        />
        <Blocker
          onFindStore={this.handleGetStore}
        />
        <Maps
          markers={this.state.markers}
        />
        <ToastContainer />
      </div>
    )

  };
}

export default App;
