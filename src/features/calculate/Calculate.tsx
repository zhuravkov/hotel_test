import { AxiosError } from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { FC, useState } from 'react';
import { roomsAPI } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CalculateResponse, sagaActions } from '../../app/sagas';
import { selectRoomsCategoty } from '../rooms/RoomsSlice';
import styles from './Calculate.module.css';


type PropsType = {
  calculateOnOff: (a: boolean) => void
}

export const Calculate: FC<PropsType> = (props) => {

  let dispatch = useAppDispatch()

  let categories = useAppSelector(selectRoomsCategoty)




  const [error, setError] = useState<AxiosError>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<CalculateResponse>();



  return (
    <div className={styles.calculate_container}>


      <div onClick={() => props.calculateOnOff(false)} className={styles.calculate_container__exit}></div>

      <Formik
        initialValues={{ arrival_date: '', departure_date: '', category: '1' }}
        validate={values => {
          const errors: { [field: string]: string } = {};
          if (!values.arrival_date) {
              errors.arrival_date = 'Поле обязательно для заполнения';
          } 
          else if (!values.departure_date) {
            errors.departure_date = 'Поле обязательно для заполнения';
        } 
        else if (values.departure_date <= values.arrival_date) {
          errors.departure_date = 'Дата выезда не может быть меньше даты заезда';
      } 
      return errors;
         
    }}


        onSubmit={(values, { setSubmitting }) => {
          // Положил значения полей в тело запроса, ини ушли в сагу ЗАПРОС ЧЕРЕЗ САГУ
          // dispatch({ type: sagaActions.FETCH_CALCULATE_PRICE, payload:values })

          // Запрос локально в компоненте 
          roomsAPI.getCalculatedPrice(values)
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
              setError(undefined)
            },
            (error) => {
                setError(error);
                setItems(undefined)
                setIsLoaded(false)
              })
          setTimeout(() => {

            setSubmitting(false);
          }, 5000);
        }}
      >
        {(props: FormikProps<any>,) => (
          <Form>
            <div className={styles.calculate_container__wrapper}>
              <h2>Расчёт стоимости</h2>
              <div>
                <Field name="arrival_date" type="date" />
                <ErrorMessage name="arrival_date" component="div" className={styles.calc__error} />
              </div>
              <div>
                <Field name="departure_date" type="date" />
                <ErrorMessage name="departure_date" component="div" className={styles.calc__error} />
              </div>
              <div>
                <Field name="category" component="select">
                  {categories.map(p =>
                    <option key={p.id} value={p.id}>{p.title}</option>
                  )}
                </Field>
              </div>
              <button type="submit" disabled={props.isSubmitting}>Расчитать</button>
              
              
              {isLoaded && <>
                <div>
                  <span>Стоимость:</span>
                  <span>{items?.data.price}</span>
                </div>
                <div>
                  <span>Количество дней:</span>
                  <span>{items?.data.days}</span>
                </div>
                <div>
                  <span>Доступно в данной категории:</span>
                  <span>{items?.data.avalibility}</span>
                </div>
              </>
              }
              {error && <div>{error.message}</div>}
            </div>
            

            
          </Form>
        )}
      </Formik>

    </div>
  );
}

// TODO в inicialvalue текущую дату