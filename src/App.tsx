import React, { useEffect, useState } from 'react';
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
import { Category } from './features/rooms/Category/Category';
import { Calculate } from './features/calculate/Calculate';
import { useAppDispatch } from './app/hooks';
import { sagaActions } from './app/sagas';


function App() {

  // get window size
  const { width, height } = useScreenDimensions();
  let dispatch = useAppDispatch()

  const [booking, setBooking] = useState(false)
  const [calculate, setCalculate] = useState(false)

  useEffect(() => {
   dispatch({ type: sagaActions.FETCH_ROOMS_CATEGORY_DATA })
  }, [])


  // Для возможного расширения при смене состояния
  const bookingOnOff = (a: boolean) => {
    setBooking(a)
  }

  return (
    <div className={style.App} style={{'--vh': height} as React.CSSProperties}>
      {booking && <Booking bookingOnOff={bookingOnOff} />}
      {calculate && <Calculate calculateOnOff={setCalculate} />}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage bookingOnOff={bookingOnOff}
                                          calculateOnOff = {setCalculate} />} />
          <Route path='advantages' element={<Advantages />} />
          <Route path='about' element={<About />} />
          <Route path='infrastructure' element={<Infrastructure />} />
          <Route path='rooms' element={<Rooms />} />
          <Route path={'/rooms/:CategoryId'} element={<Category  />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='contacts' element={<Contacts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
