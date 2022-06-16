import { FC } from "react"
import style from './HomePage.module.css';

type PropsType = {
  bookingOnOff: (a:boolean) => void
}

export const HomePage: FC<PropsType>  = (props) => {
  return (
    <div>
      <div className={style.header__center__text_block}>
        <p>Курортный отель</p>
        <p>«Пляжный»</p>
        <p>Незабываемый отдых в Анапе на первой линии
          <span> от 2500 ₽</span></p>
      </div>
      <div className={style.header__center__btn_block}>
        <button>Расчет стоимости</button>
        <button onClick={() => props.bookingOnOff(true)}>Бронирование</button>
        <p>Акция действует до 31 мая!</p>
      </div>
    </div>
  )
}

