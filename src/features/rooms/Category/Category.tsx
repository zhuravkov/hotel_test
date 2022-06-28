
import style from './Category.module.css';


import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { currentCategoty, sagaActions, setCurrentCutegory } from '../RoomsSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';



export const Category = () => {


  let category = useAppSelector(currentCategoty)
  let dispatch = useAppDispatch()


  let { CategoryId } = useParams();
  useEffect(() => {
    if (!category) dispatch({ type: sagaActions.FETCH_ROOMS_CATEGORY_DATA })
    dispatch(setCurrentCutegory(Number(CategoryId)))
 }, [category])

  console.log("RERENDER")
  return (
    
    <div >
      <div>{category?.id}</div> 
      <div>{category?.content}</div>
      <div>{category?.title}</div>
      <div>{CategoryId}</div>
      <div className={style.additionalImages}>
        {category?.additionalImg.map(p =>
          <div  key={p.id}> 
            <img src={`http://localhost:8000${p.image}`} alt={p.image} />
          </div>
        )
        }  
      </div>
            
    </div>
  )
}