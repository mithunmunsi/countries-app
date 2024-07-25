// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store/store';
import Countries from './routes/Countries';
import CountriesSingle from './routes/CountriesSingle';
import Home from './routes/Home';
import Root from './routes/Root';
import ProtectedRoute from './auth/ProtectedRoute';
import Favourites from './routes/Favourites';
import Register from './routes/Register';
import Login from './routes/Login';
// import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="/countries"
              element={
                <ProtectedRoute>
                  <Countries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favourites"
              element={
                <ProtectedRoute>
                  <Favourites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/countries/:single"
              element={
                <ProtectedRoute>
                  <CountriesSingle />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
