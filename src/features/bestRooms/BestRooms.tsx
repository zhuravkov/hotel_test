import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { FC, useState } from 'react';
import styles from './BestRooms.module.css';




export const BestRooms = () => {

    const [step, setStep] = useState(1)
    return (

        <div>
            {step === 4 ? <h2>Мы подберём лучшие предложения специально для вас! <br />До встречи в Анапе!</h2> :
                <div className= {styles.bestRooms_wraper}>
                    <span>Это займет не более 2х минут</span>
                    <span>Шаг {step} из 3:</span>
                    <Formik
                        initialValues={{
                            arrival_date: '',
                            departure_date: '',
                            numberOfRooms: '',
                            numberOfGuests: '',
                            client_name: '',
                            phone: ''
                        }}
                        validate={values => {
                            const errors: { [field: string]: string } = {};
                            const phoneRegExp = /^((\+7)+([0-9]){10})$/; // for Mobile Numbers

                            if (!values.arrival_date) {
                                errors.arrival_date = 'Поле обязательно для заполнения'
                            }

                            if (!values.departure_date) {
                                errors.departure_date = 'Поле обязательно для заполнения'
                            }

                            if (!values.numberOfRooms) {
                                errors.numberOfRooms = 'Поле обязательно для заполнения'
                            }
                            if (!values.numberOfGuests) {
                                errors.numberOfGuests = 'Поле обязательно для заполнения'
                            }

                            if (!values.client_name) {
                                errors.client_name = 'Поле обязательно для заполнения'
                            }

                            if (!values.phone) {
                                errors.phone = 'Поле обязательно для заполнения';
                            } else if (
                                !phoneRegExp.test(values.phone)
                            ) {
                                errors.phone = 'ФОРМАТ дожен быть: +79998885555';
                            }
                            return errors;
                            // TRY TODO in 1 func 
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            // В консоли имитация запроса на сервер
                            setStep(step + 1)
                            console.log(`Payloud на сервер ====>>>\n ${JSON.stringify(values, null, 2)}`);
                            setSubmitting(false);
                        }}
                    >
                        {(props: FormikProps<any>) => (
                            <Form>
                                <div className={styles.bestRooms_form}>
                                    {step === 1 &&
                                        <div>
                                            <div>
                                                <div className={styles.bestRooms_form__date}>
                                                <div>Дата отъезда: </div>
                                                <Field name="arrival_date" type="date" placeholder="Дата заезда:" />
                                                </div>
                                                <ErrorMessage name="arrival_date" component="div" className={styles.bestRooms_form} />
                                            </div>
                                            <div>
                                            <div className={styles.bestRooms_form__date}>
                                                <div>Дата отъезда:</div>
                                                <Field name="departure_date" type="date" placeholder="Дата отъезда:" />
                                                <ErrorMessage name="departure_date" component="div" className={styles.bestRooms_form} />
                                            </div>
                                            </div>
                                            <div className= {styles.bestRooms_form__1stepButton}>
                                                <button  type="button" disabled={
                                                    props.errors.departure_date || !props.touched.arrival_date ? true : false}
                                                    onClick={() => setStep(step + 1)}> Далее </button>
                                            </div>
                                        </div>
                                    }
                                    {step === 2 && <div>
                                        <div>
                                            <Field name="numberOfRooms" placeholder="Укажите кол-во комнат:" />
                                            <ErrorMessage name="numberOfRooms" component="div" className={styles.bestRooms_form} />
                                        </div>
                                        <div>
                                            <Field name="numberOfGuests" placeholder="Укажите кол-во гостей:" />
                                            <ErrorMessage name="numberOfGuests" component="div" className={styles.bestRooms_form} />
                                        </div>
                                        <div className= {styles.bestRooms_form__buttons_group}>
                                            <button type="button" onClick={() => setStep(step - 1)}> Назад </button>
                                            <button type="button" disabled={
                                                props.errors.numberOfGuests || !props.touched.numberOfRooms ? true : false}
                                                onClick={() => setStep(step + 1)}> Далее </button>
                                        </div>
                                    </div>}
                                    {step === 3 && <div>
                                        <div>
                                            <Field name="client_name" placeholder="Ваше имя:" />
                                            <ErrorMessage name="client_name" component="div" className={styles.bestRooms_form} />
                                        </div>
                                        <div>
                                            <Field name="phone" placeholder="Контактный телефон:" />
                                            <ErrorMessage name="phone" component="div" className={styles.bestRooms_form} />
                                        </div>
                                        <div className= {styles.bestRooms_form__buttons_group}>
                                            <button type="button" onClick={() => setStep(step - 1)}> Назад </button>
                                            <button type="submit" disabled={props.isSubmitting}> Отправить </button>
                                        </div>
                                    </div>}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>}
        </div>
    )
}

