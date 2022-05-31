import { Field, Form, Formik } from 'formik';
import styles from './Booking.module.css';



export const Booking = () => {

    return (
        <div className={styles.Booking_container}>
            <div className={styles.Booking_container__exit}></div>
            <Formik
                initialValues={{ date: '', adult: '', childeren: '', child_age: '', name: '', phone: '', toggle: false }}

                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className={styles.Booking_container__fields}>
                            <h2>Бронирование</h2>
                            <Field name="date" placeholder="Заезд-отъезд" />
                            <Field name="adult" placeholder="Кол-во взрослых" />
                            <Field name="childeren" placeholder="Кол-во детей" />
                            <Field name="child_age" placeholder="Bозраст детей" />
                            <Field name="name" placeholder="Ваше имя" />
                            <Field name="phone" placeholder="Ваш телефон" />


                            <label>
                                <Field type="checkbox" name="toggle" />
                                Вы даете согласие на обработку своих персональных данных
                            </label>
                            <button type="submit" disabled={isSubmitting}>
                                Отправить
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
