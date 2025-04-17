import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './pages/Login'
import { PuntosVenta } from './pages/PuntosVenta';
import { Dashboards } from './pages/Dashboards';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>loading...</p>}>
        <Routes>
          <Route exact path='/' name='Login' element={<Login />} />
          <Route exact path='/puntosventa' name='Layout' element={<PuntosVenta />} />
          <Route exact path='/mapa' name='Layout' element={<Dashboards />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
