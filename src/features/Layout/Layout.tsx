import { Link, Outlet } from "react-router-dom"
import { BestRooms } from "../bestRooms/BestRooms";
import style from './Layout.module.css';
import phone_img from '../../assets/images/header_phone.svg'
import { HeaderLinks } from "../headerLinks/HeaderLinks";



export const Layout = () => {

  return (
    <>
      <header>
        <div className={style.header__container}>
          <div className={style.header__top}>
            <div className={style.header__top__logo}>
              <Link to="/">logo</Link>
            </div>

            <HeaderLinks />

            <div className={style.header__top__phone}>
              <p>8 (918) 49-46-001</p>
              <img src={phone_img} alt="" />
            </div>
          </div>

          <Outlet />

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
      </header>
      <div className={style.find__block}>
        <div>
          Получите подборку лучших номеров по выгодной цене
        </div>
        <div>
          <BestRooms />
        </div>
      </div>
    </>
  )
}