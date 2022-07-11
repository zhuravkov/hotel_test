
import style from './Category.module.css';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { currentCategoty, selectRoomsCategoty, setCurrentCutegory } from '../RoomsSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { sagaActions } from '../../../app/sagas';




export const Category = () => {

  let categories = useAppSelector(selectRoomsCategoty)
  let category = useAppSelector(currentCategoty)

  let dispatch = useAppDispatch()

  let { category_slug } = useParams();
  useEffect(() => {
    if (!categories) dispatch({ type: sagaActions.FETCH_ROOMS_CATEGORY_DATA })
    if (!category) { category_slug && dispatch(setCurrentCutegory(category_slug))}
    }, [category])
  return (
    <div >
      <div>{category?.id}</div>
      <div>{category?.content}</div>
      <div>{category?.title}</div>

      <div className={style.additionalImages}>
        {category?.additionalImg.map(p =>
          <div key={p.id}>
            <img src={`http://localhost:8000${p.image}`} alt={p.image} />
          </div>
        )
        }
      </div>
    </div>
  )
}