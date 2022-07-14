import { FC } from "react"
import style from './CalcBookingBtn.module.css';

type PropsType = {
  bookingOnOff: (a:boolean) => void
  calculateOnOff: (a:boolean) => void
}

export const CalcBookingBtn: FC<PropsType> = (props) => {
  return (
    <div className={style.calc_booking_btn_block}>
      <button onClick={() => props.calculateOnOff(true)}>Расчет стоимости</button>
      <button onClick={() => props.bookingOnOff(true)}>Бронирование</button>
    </div>
  )
}
