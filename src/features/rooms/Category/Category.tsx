
import style from './Category.module.css';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { currentCategoty, selectRoomsCategoty, setCurrentCutegory } from '../RoomsSlice';
import { useParams } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { sagaActions } from '../../../app/sagas';
import { CalcBookingBtn } from '../../CalcBookingBtn/CalcBookingBtn';
import Carousel from 'nuka-carousel';


type PropsType = {
  bookingOnOff: (a:boolean) => void
  calculateOnOff: (a:boolean) => void
}

export const Category: FC<PropsType>  = (props) => {

  let categories = useAppSelector(selectRoomsCategoty)
  const category = useAppSelector(currentCategoty)

  let dispatch = useAppDispatch()

  let { category_slug } = useParams();
  useEffect(() => {
    if (!categories) dispatch({ type: sagaActions.FETCH_ROOMS_CATEGORY_DATA })
    if (!category) { category_slug && dispatch(setCurrentCutegory(category_slug))}
    }, [category, categories, category_slug,dispatch ])

  useEffect(() => {
    return function cleanup() {
      dispatch(setCurrentCutegory(''))}
  }, [dispatch])

  return (
    <div className={style.category_wraper}>
      <div>
        <h2>{category?.title}</h2>






        <div className={style.category_content_wraper}>
        <input className={style.content_toggle} id="content_toggle" type="checkbox" />
        <label className={style.menu_button_container} htmlFor="content_toggle">
          <span>Описание</span>
          <span className={style.menu_button}></span>
        </label>
          <div className={style.category_content}>
            {category?.content}
          </div>


          
          
        </div>
          



        <CalcBookingBtn calculateOnOff={props.calculateOnOff}
          bookingOnOff={props.bookingOnOff} />
        
      </div>

      <div className={style.category_caroucsel}>
        <Carousel
        wrapAround={true}
        slidesToShow={1}
        autoplayInterval={60000}
        autoplay={true}
        renderCenterLeftControls={({ previousSlide }) => (
          <button className={`${style.slider_button} ${style.slider_button__left}`} onClick={previousSlide}></button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button className={`${style.slider_button} ${style.slider_button__right}`} onClick={nextSlide}></button>
        )}

        // renderBottomCenterControls={null}
        defaultControlsConfig={{
          pagingDotsStyle: {
            fill: 'Moccasin',
            margin: '20px',
          }
        }}

        >

        {category?.additionalImg.map(p =>
          <div key={p.id} className={style.rooms_caroucsel__item}>
            <img src={p.image} alt={p.image} />
          </div>
        )
        }

        </Carousel>
      </div>
    </div >
  )
}