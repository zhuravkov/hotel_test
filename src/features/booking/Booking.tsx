import { ErrorMessage, Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { FC } from 'react';
import styles from './Booking.module.css';


type PropsType = {
    bookingOnOff: (a:boolean) => void
}

export const Booking: FC<PropsType> = (props) => {

    return (
        <div className={styles.booking_container}>
            <div onClick= {()=> props.bookingOnOff(false)} className={styles.booking_container__exit}></div>
            <Formik
                initialValues={{ arrival_date: '', departure_date:'', adult: 1, childeren: 0, child_age: '', client_name: '', phone: '', agreement: false }}

                
                validate={values => {
                    const errors: { [field: string]: string } = {};
                    const phoneRegExp = /^((\+7)+([0-9]){10})$/; // for Mobile Numbers
                    if (!values.phone) {
                        errors.phone = 'Поле обязательно для заполнения';
                    } else if (
                        !phoneRegExp.test(values.phone)
                    ) {
                        errors.phone = 'ФОРМАТ дожен быть: +79998885555';
                    }
                    if (!values.agreement){
                        errors.agreement = 'Для продолжения требуется Ваше согласие'
                    }
                    if (!values.client_name){
                        errors.client_name = 'Поле обязательно для заполнения'
                    }
                    return errors;
                }}



                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(`Payloud на сервер ====>>>\n ${JSON.stringify(values, null, 2)}`);
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {(  props: FormikProps<any> ,) => (
                    <Form>
                        <div className= {styles.booking_container__wrapper}>
                            <h2>Бронирование</h2>

                            {/* Изменил поле данное в макете для правильной обработки дат в 
                            UI и Сервере разделил дату заезда и выезда */}
                            <div>
                                <div className={styles.booking_container__fields__date}>
                                    <div>Заезд: </div>
                                    <Field name="arrival_date" type="date" />
                                </div>
                                <div className={styles.booking_container__fields__date}>
                                    <div>Выезд: </div>
                                    <Field name="departure_date" type="date" />
                                </div>
                            </div>

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

                            <div>
                                {/* Настроен вывод ошибки в placeholder */}
                                <Field name="client_name" placeholder=
                                    {props.errors.client_name && props.touched.client_name
                                        ? props.errors.client_name : "Ваше имя"}
                                    className={props.errors.client_name && props.touched.client_name 
                                    && styles.booking__error} />
                            </div>


                            <div>
                                {/* Ошибка в поле справа */}
                                <Field name="phone" placeholder="Ваш телефон (пример: +79998885555)" />
                                <ErrorMessage name="phone" component="div" className={styles.booking__error} />
                            </div>
                            
                            <label>
                                {/* Ошибка под полем */}
                                <Field type="checkbox" name="agreement"/>
                                <span>Вы даете согласие на обработку своих персональных данных</span>
                                <ErrorMessage name="agreement" component="div" className={styles.booking__error} />
                            </label>
                            
                            <button type="submit" disabled={props.isSubmitting}>Отправить</button>
                            
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
            <button className={styles.quantity_arrow_minus} onClick={() => {setFieldValue(`${field.name}`, field.value-1)}} type="button"> - </button>
            <input className={styles.quantity_num} type="number" readOnly {...field} {...props} />
            <button className={styles.quantity_arrow_plus} onClick={() => {setFieldValue(`${field.name}`, field.value+1)}} type="button"> + </button>
        </div>
  );


// TODO сделать конструктор поля с доп аргументами