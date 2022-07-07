import { AxiosError } from 'axios';
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { FC, useState } from 'react';
import { BookingResponseData, roomsAPI } from '../../api/api';
import { useAppSelector } from '../../app/hooks';
import { selectRoomsCategoty } from '../rooms/RoomsSlice';
import styles from './Booking.module.css';


type PropsType = {
    bookingOnOff: (a:boolean) => void
}

export const Booking: FC<PropsType> = (props) => {

    const [bookingSuccess, setBookingSuccess] = useState(false)
    let categories = useAppSelector(selectRoomsCategoty)

    const [error, setError] = useState<AxiosError>();
    const [errorOption, setErrorOption] = useState<string>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<BookingResponseData>();


  return (
    <div className={styles.booking_container}>


      <div onClick={() => props.bookingOnOff(false)} className={styles.booking_container__exit}></div>
      
      
      <Formik
        initialValues={{
          category: '1', arrival_date: '', departure_date: '', adult: 1,
          childeren: 0, child_age: '', client_name: '', phone: '', agreement: false
        }}


        validate={values => {
          const errors: { [field: string]: string } = {};
          const phoneRegExp = /^((\+7)+([0-9]){10})$/; // for Mobile Numbers

          if (!values.arrival_date) {
            errors.arrival_date = 'Поле обязательно для заполнения';
          }
          else if (!values.departure_date) {
            errors.departure_date = 'Поле обязательно для заполнения';
          }
          else if (values.departure_date <= values.arrival_date) {
            errors.departure_date = 'Дата выезда не может быть меньше даты заезда';
          }
          else if (!values.child_age) {
            errors.child_age = 'Поле обязательно для заполнения, если без детей поставьте -';
          }
          else if (!values.phone) {
            errors.phone = 'Поле обязательно для заполнения';
          }
          else if (
            !phoneRegExp.test(values.phone)
          ) {
            errors.phone = 'ФОРМАТ дожен быть: +79998885555';
          }
          if (!values.agreement) {
            errors.agreement = 'Для продолжения требуется Ваше согласие'
          }
          if (!values.client_name) {
            errors.client_name = 'Поле обязательно для заполнения'
          }
          return errors;
        }}



        onSubmit={(values, { setSubmitting }) => {
          // В консоли имитация запроса на сервер
         
          roomsAPI.postOrder(values)
          .then(
            (result) => {
              if (result.resultCode===0){
                setIsLoaded(true)
                setItems(result.data)
                setError(undefined)
                setErrorOption(undefined)
              }
              if (result.resultCode===1){
                setErrorOption(result.messages)
                setItems(undefined)
                setIsLoaded(false)
              }
              
            },
            (error) => {
                setError(error);
                setItems(undefined)
                setIsLoaded(false)
              })
 

          setTimeout(() => {
            // setBookingSuccess(false)
            // props.bookingOnOff(false)
            setSubmitting(false);
          }, 5000);


        }}
      >
        {(props: FormikProps<any>,) => (
          <Form>
            <div className={styles.booking_container__wrapper}>
              <h2>Бронирование</h2>
              
              {error && <div>{error.message}</div>}
              {errorOption && <div className={styles.booking__server_error}>{errorOption}</div>}

              {isLoaded 
              ? <div className={styles.booking__success}>
                <span>№ брони {items?.id}</span>
                <span>Забронирован: {items?.order_name}</span>
                <span>Количество дней: {items?.days}</span>
                <span>Стоимость: {items?.price}</span>
                <span>Спасибо за заказ в  близжайшее время с вами 
                  свяжется наш оператор для подтверждения бронирования</span>
              </div>
              :
              <>

              
              <div>
                <Field name="category" component="select">
                  {categories.map(p =>
                    <option key={p.id} value={p.id}>{p.title}</option>
                  )}
                </Field>
              </div>
              
              <div className={styles.booking_container__fields__date}>
                <div>Заезд: </div>
                <Field name="arrival_date" type="date" />
              </div>
              <ErrorMessage name="arrival_date" component="span" className={styles.booking__error} />
              <div className={styles.booking_container__fields__date}>
                <div>Выезд: </div>
                <Field name="departure_date" type="date" />
              </div>
              <ErrorMessage name="departure_date" component="span" className={styles.booking__error} />
              <div>
                <span>Кол-во взрослых </span>
                <Field name="adult" component={CustomInputComponent} />
              </div>
              <div>
                <span>Кол-во детей </span>
                <Field name="childeren" component={CustomInputComponent} />
              </div>
              <div>
                <Field name="child_age" placeholder="Bозраст детей" />
              </div>
              <ErrorMessage name="child_age" component="span" className={styles.booking__error} />
              <div>
                {/* Настроен вывод ошибки в placeholder */}
                <Field name="client_name" placeholder=
                  {props.errors.client_name && props.touched.client_name
                    ? props.errors.client_name : "Ваше имя"}
                  className={props.errors.client_name && props.touched.client_name
                    && styles.booking__error} />
              </div>
              <div>
                <Field name="phone" placeholder="Ваш телефон (пример: +79998885555)" />
              </div>
              <ErrorMessage name="phone" component="span" className={styles.booking__error} />
              <label>
                {/* Ошибка под полем */}
                <Field type="checkbox" name="agreement" />
                <span>Вы даете согласие на обработку своих персональных данных</span>
                <ErrorMessage name="agreement" component="div" className={styles.booking__error} />
              </label>
              <button type="submit" disabled={props.isSubmitting}>Отправить</button>
            </>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}



// Настраивоемое поле формы
const CustomInputComponent: FC<FieldProps> = ({
    field, // { name, value, onChange, onBlur }
    form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => (
        <div className={styles.quantity_block}>
            <button  disabled={field.value===1} onClick={() => {setFieldValue(`${field.name}`, field.value-1)}} type="button"> - </button>
            <input type="number" readOnly {...field} {...props} />
            <button disabled={field.value===8} onClick={() => {setFieldValue(`${field.name}`, field.value+1)}} type="button"> + </button>
        </div>
  );


// TODO сделать конструктор поля с доп аргументами