import React from 'react';
import './App.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import { RoutesContainer } from './Routes/RoutesContainer';
import { initializeApp } from './Redux/Reducer/appReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import store from './Redux/redux-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Preloader from './Components/common/Preloader/Preloader';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render () {
    if(this.props.initialized) {
      return (
        <div className="app-wrapper">
          <HeaderContainer />
          <div className="app-wrapper-hero">
            <NavbarContainer />
            <RoutesContainer />
          </div>
        </div>
      )
    } else {
      return (
        <div className="app-wrapper">
          <Preloader />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

let AppContainer = compose(
  connect(mapStateToProps, {initializeApp}),
)(App);

export const ReactiveNetworkApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer isAuth={store.getState().auth.isAuth}/>
      </Provider>
    </BrowserRouter>
  )
}

