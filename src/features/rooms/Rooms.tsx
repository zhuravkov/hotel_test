
import Carousel from 'nuka-carousel';
import style from './Rooms.module.css';
import img1 from '../../assets/images/rooms_img/1.jpg'
import img2 from '../../assets/images/rooms_img/2.jpeg'
import img3 from '../../assets/images/rooms_img/3.jpg'
import img4 from '../../assets/images/rooms_img/4.jpg'
import img5 from '../../assets/images/rooms_img/5.jpg'

import { useScreenDimensions } from "use-screen-dimensions";


export const Rooms = () => {
  const { width } = useScreenDimensions();
  let slidesToShow
  if (width > 770) slidesToShow = 3
  else if (width <= 770 && width > 460) slidesToShow = 2
  else if (width <= 460) slidesToShow = 1



  return (
    <div className={style.rooms_caroucsel}>
      <Carousel
        wrapAround={true}
        slidesToShow={slidesToShow}
        autoplayInterval={60000}
        autoplay={true}
        renderCenterLeftControls={({ previousSlide }) => (
          <button className={`${style.slider_button} ${style.slider_button__left}`} onClick={previousSlide}></button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button className={`${style.slider_button} ${style.slider_button__right}`} onClick={nextSlide}></button>
        )}
        renderBottomCenterControls={null}
        cellSpacing = {20}
      >
        <div className={`${style.rooms_caroucsel__item} ${style.rooms_caroucsel__item_1}`}>
          <div>ЛЮКС</div>
          <img src={img1} alt="" />
          
        </div>
        <div className={`${style.rooms_caroucsel__item} ${style.rooms_caroucsel__item_2}`}>
          <div>СТАНДАРТ+</div>
          <img src={img2} alt="" />
          </div>
        <div className={`${style.rooms_caroucsel__item} ${style.rooms_caroucsel__item_3}`}>
          <div>СТАНДАРТ</div>
          <img src={img3} alt="" />
        </div>
        <div className={`${style.rooms_caroucsel__item} ${style.rooms_caroucsel__item_4}`}>
          
          <div>ЭКОНОМ</div>
          <img src={img4} alt="" />
        </div>
        <div className={`${style.rooms_caroucsel__item} ${style.rooms_caroucsel__item_5}`}>
          <div>БИЗНЕС</div>
          <img src={img5} alt="" />

        </div>
          
      </Carousel>
    </div>
  )
}