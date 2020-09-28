import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from '../Navbar';

import AuthProvider from '../../providers/Auth';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import WatchPage from '../../pages/Watch';
import SearchPage from '../../pages/Search';
import NotFound from '../../pages/NotFound';
import SearchProvider from '../../providers/Search';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/search/:query">
              <SearchPage />
            </Route>
            <Route exact path="/watch/:id">
              <WatchPage />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
