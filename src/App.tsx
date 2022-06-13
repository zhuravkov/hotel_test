import React, { useState } from 'react';
import { Booking } from './features/booking/Booking';
import style from './App.module.css';

import phone_img from './assets/images/header_phone.svg'
import { BestRooms } from './features/bestRooms/BestRooms';


function App() {

  const [booking, setBooking] = useState(false)


  // Для возможного расширения при смене состояния
  const bookingOnOff = (a: boolean) => {
    setBooking(a)
  }

  return (
    <div className={style.App}>
      {booking && <Booking bookingOnOff={bookingOnOff} />}
      <div className={style.header__container}>
        <div className={style.header__top}>
          <div className={style.header__top__logo}>
            logo
          </div>
          <div className={style.header__top__links}>
            <a href="#">Преимущества</a>
            <a href="#">О нас</a>
            <a href="#">Инфраструктура</a>
            <a href="#">Номера</a>
            <a href="#">Отзывы</a>
            <a href="#">Контакты</a>
          </div>
          <div className={style.header__top__phone}>
            <p>8 (918) 49-46-001</p>
            <img src={phone_img} alt="" />
          </div>
        </div>
        <div>
          <div className={style.header__center__text_block}>
            <p>Курортный отель</p>
            <p>«Пляжный»</p>
            <p>Незабываемый отдых в Анапе на первой линии
              <span> от 2500 ₽</span></p>
          </div>
          <div className={style.header__center__btn_block}>
            <button>Расчет стоимости</button>
            <button onClick={() => bookingOnOff(true)}>Бронирование</button>
            <p>Акция действует до 31 мая!</p>
          </div>
        </div>
        <div className={style.header__bottom}>
          <div>
            Листайте ниже
          </div>
          <div>
            <div>
              <p>Мы находимся:</p>
              <p>Анапа, Пионерский проспект 5</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.find__block}>
        <div>
          Получите подборку лучших номеров по выгодной цене
        </div>
        <div>
          <BestRooms />
        </div>
      </div>
    </div>
  );
}

export default App;
