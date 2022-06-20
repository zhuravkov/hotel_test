import { Link, NavLink } from 'react-router-dom';
import style from './HeaderLinks.module.css';

export const HeaderLinks = () => {
  return (
    <div className={style.top_nav}>

      <input className={style.menu_toggle} id="menu-toggle" type="checkbox" />
      <label className={style.menu_button_container} htmlFor="menu-toggle">
        <div className={style.menu_button}></div>
      </label>

      <ul className={style.menu}>
        <li><NavLink to="/advantages" className={({ isActive }) => isActive ? style.active_navlink : undefined} >Преимущества</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? style.active_navlink : undefined}>О нас</NavLink></li>
        <li><NavLink to="/infrastructure" className={({ isActive }) => isActive ? style.active_navlink : undefined}>Инфраструктура</NavLink></li>
        <li><NavLink to="/rooms" className={({ isActive }) => isActive ? style.active_navlink : undefined}>Номера</NavLink></li>
        <li><NavLink to="/reviews" className={({ isActive }) => isActive ? style.active_navlink : undefined}>Отзывы</NavLink></li>
        <li><NavLink to="/contacts" className={({ isActive }) => isActive ? style.active_navlink : undefined}>Контакты</NavLink></li>
      </ul>

    </div>
  )
}



export const HeaderLinks1 = () => {
  return (
    <div className={style.header__top__links}>


      <input className={style.menu__toggle} id="menu__toggle" type="checkbox" />
      <label  className={style.menu__btn} htmlFor="menu__toggle">
      <div className={style.menu_button}></div>
      </label>

      <ul className={style.menu}>
        <li><NavLink to="/advantages" className={({ isActive }) => isActive ? style.active_navlink : undefined} >Преимущества</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? style.active_navlink : undefined}>О нас</NavLink></li>
        <li><NavLink to="/infrastructure" className={({ isActive }) => isActive ? style.active_navlink : undefined}>Инфраструктура</NavLink></li>
        <li><NavLink to="/rooms" className={({ isActive }) => isActive ? style.active_navlink : undefined}>Номера</NavLink></li>
        <li><NavLink to="/reviews" className={({ isActive }) => isActive ? style.active_navlink : undefined}>Отзывы</NavLink></li>
        <li><NavLink to="/contacts" className={({ isActive }) => isActive ? style.active_navlink : undefined}>Контакты</NavLink></li>
      </ul>
    </div>
  )
}