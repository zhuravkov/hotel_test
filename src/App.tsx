import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import style from './App.module.css';
import bg_img from './assets/images/Rectangle_32.png'

function App() {
  return (
    <div className={style.App}>
        <div className={style.header__container}>
          <div className={style.header__top}>
            Лого и ссылки
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
