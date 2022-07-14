
import style from './Category.module.css';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { currentCategoty, selectRoomsCategoty, setCurrentCutegory } from '../RoomsSlice';
import { useParams } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { sagaActions } from '../../../app/sagas';
import { CalcBookingBtn } from '../../CalcBookingBtn/CalcBookingBtn';


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
    <div >
      <CalcBookingBtn calculateOnOff = {props.calculateOnOff}
                      bookingOnOff = {props.bookingOnOff} />
      <div>{category?.id}</div>
      <div>{category?.content}</div>
      <div>{category?.title}</div>

      <div className={style.additionalImages}>
        {category?.additionalImg.map(p =>
          <div key={p.id}>
            <img src={p.image} alt={p.image} />
          </div>
        )
        }
      </div>
    </div>
  )
}