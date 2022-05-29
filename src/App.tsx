import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import style from './App.module.css';

import phone_img from './assets/images/header_phone.svg'


function App() {
  return (
    <div className={style.App}>
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
        <div className={style.header__center}>
          CENTER
        </div>
        <div className={style.header__bottom}>
          bottom
        </div>
      </div>


        <div className={style.find__block}>
          <div className={style.find__block__left}>
            Получите подборку лучших номеров по выгодной цене
          </div>
          <div className={style.find__block__right}>
            search components 
          </div>
        </div>
    </div>
  );
}

export default App;
