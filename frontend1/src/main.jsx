import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx';
import SellerHomeScreen from './screens/sellerHomeScreen.jsx';
import SellerLoginScreen from './screens/SellerLoginScreen.jsx';
import SellerRegisterScreen from './screens/SellerRegisterScreen.jsx';
import SellerProfileScreen from './screens/SellerProfileScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
        <Route index={true} path='/' element={<SellerHomeScreen />} />
        <Route path='/login' element={<SellerLoginScreen />} />
        <Route path='/register' element={<SellerRegisterScreen />} />

        {/* private Routes */}
        <Route path='' element={<PrivateRoute /> }>
          <Route path='/profile' element={<SellerProfileScreen />} />
        </Route>
    </Route>
  ) 
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
)
