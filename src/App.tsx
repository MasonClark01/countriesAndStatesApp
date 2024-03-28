import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FetchCountriesAndStates from './components/CountriesAndStates';
import AddCountries from './components/AddCountries';
import AddStates from './components/AddStates';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FetchCountriesAndStates/>
  },
  {
    path: '/AddCountry',
    element: <AddCountries/>
  },
  {
    path: '/AddState',
    element: <AddStates/>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
