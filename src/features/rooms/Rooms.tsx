import Carousel from 'nuka-carousel';
import style from './Rooms.module.css';
import { useScreenDimensions } from "use-screen-dimensions";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRoomsCategoty, setCurrentCutegory } from './RoomsSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sagaActions } from '../../app/sagas';

export const Rooms = () => {
  let dispatch = useAppDispatch()
  let categories = useAppSelector(selectRoomsCategoty)


  const { width } = useScreenDimensions();

  // useEffect(() => {
  //   dispatch({ type: sagaActions.FETCH_ROOMS_CATEGORY_DATA })
  //   }, [])


  let slidesToShow
  if (width > 770) slidesToShow = 3
  else if (width <= 770 && width > 460) slidesToShow = 2
  else if (width <= 460) slidesToShow = 1;

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
        {categories.map(p =>
          <div  key={p.id} className={`${style.rooms_caroucsel__item} ${style.rooms_caroucsel__item_1}`}>
            <Link to={`${p.category_slug}`} onClick={()=>dispatch(setCurrentCutegory(p.category_slug))}><div>{p.title}</div></Link>
            {/* <div>{p.title}</div> */}
            <img src={`http://localhost:8000${p.image}`} alt={p.image} />
          </div>
        )
        }         
      </Carousel>
    </div>
  )
}