import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { FC } from 'react';
import styles from './Booking.module.css';



export const Booking = () => {

    return (
        <div className={styles.Booking_container}>
            <div className={styles.Booking_container__exit}></div>
            <Formik
                initialValues={{ date: '', adult: 1, childeren: '', child_age: '', name: '', phone: '', toggle: false }}

                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {(props: FormikProps<any>) => (
                    <Form>
                        <div className={styles.Booking_container__fields}>
                            <h2>Бронирование</h2>
                            <Field name="date" placeholder="Заезд-отъезд" />
                            <div className={styles.Booking_container__fields__custom} >
                                <span>Кол-во взрослых </span>
                                <Field name="adult" component={CustomInputComponent} placeholder="First Name"/>
                            </div>                          
                            <Field name="childeren" placeholder="Кол-во детей" />
                            <Field name="child_age" placeholder="Bозраст детей" />
                            <Field name="name" placeholder="Ваше имя" />
                            <Field name="phone" placeholder="Ваш телефон" />
                            
                            

                            <label>
                                <Field type="checkbox" name="toggle" />
                                Вы даете согласие на обработку своих персональных данных
                            </label>
                            <button type="submit" disabled={props.isSubmitting}>
                                Отправить
                            </button>
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