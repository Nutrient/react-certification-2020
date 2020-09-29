import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from '../Navbar';

import AuthProvider from '../../providers/Auth';
import HomePage from '../../pages/Home';
import WatchPage from '../../pages/Watch';
import SearchPage from '../../pages/Search';
import FavoritesPage from '../../pages/Favorites';
import NotFound from '../../pages/NotFound';
import SearchProvider from '../../providers/Search';
import PrivateRoute from '../PrivateRoute';

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
            <PrivateRoute exact path="/favorites">
              <FavoritesPage />
            </PrivateRoute>
            <PrivateRoute exact path="/search/:query">
              <SearchPage />
            </PrivateRoute>
            <PrivateRoute exact path="/watch/:id">
              <WatchPage />
            </PrivateRoute>
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
