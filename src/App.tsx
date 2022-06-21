import React, { useState } from 'react';
import { Booking } from './features/booking/Booking';
import style from './App.module.css';

import { HomePage } from './features/homePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import { Advantages } from './features/advantages/Advantages';
import { About } from './features/about/About';
import { Infrastructure } from './features/infrastructure/Infrastructure';
import { Rooms } from './features/rooms/Rooms';
import { Reviews } from './features/reviews/Reviews';
import { Contacts } from './features/contacts/Contacts';
import { Layout } from './features/Layout/Layout';
// for mobile viewport
import {useScreenDimensions} from "use-screen-dimensions";

function App() {

  // get window size
  const { width, height } = useScreenDimensions();


  const [booking, setBooking] = useState(false)


  // Для возможного расширения при смене состояния
  const bookingOnOff = (a: boolean) => {
    setBooking(a)
  }

  return (
    <div className={style.App} style={{'--vh': height} as React.CSSProperties}>
      {booking && <Booking bookingOnOff={bookingOnOff} />}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage bookingOnOff={bookingOnOff} />} />
          <Route path='advantages' element={<Advantages />} />
          <Route path='about' element={<About />} />
          <Route path='infrastructure' element={<Infrastructure />} />
          <Route path='rooms' element={<Rooms />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='contacts' element={<Contacts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
