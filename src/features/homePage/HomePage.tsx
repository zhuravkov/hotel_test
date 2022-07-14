import { FC } from "react"
import { useAppSelector } from "../../app/hooks";
import { CalcBookingBtn } from "../CalcBookingBtn/CalcBookingBtn";
import { selectMinPriceCategoty } from "../rooms/RoomsSlice";
import style from './HomePage.module.css';

type PropsType = {
  bookingOnOff: (a:boolean) => void
  calculateOnOff: (a:boolean) => void
}

export const HomePage: FC<PropsType>  = (props) => {
  const minPrice = useAppSelector(selectMinPriceCategoty)
  return (
    <div>
      <div className={style.header__center__text_block}>
        <p>Курортный отель</p>
        <p>«Пляжный»</p>
        <p>Незабываемый отдых в Анапе на первой линии
          {minPrice && <span>{` от ${minPrice} ₽`}</span>}</p>
      </div>
      <CalcBookingBtn calculateOnOff = {props.calculateOnOff}
                      bookingOnOff = {props.bookingOnOff} />
    </div>
  )
}

