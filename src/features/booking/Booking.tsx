import styles from './Booking.module.css';

export const Booking = () => {

    return (
        <div className={styles.Booking_container}>
            <div className={styles.Booking_container__exit}></div>
            <div className={styles.Booking_container__wrap}>
                <div className={styles.Booking_container__fields}>
                    <h2>Бронирование</h2>
                    <div>Заезд-отъезд</div>
                    <div>Кол-во взрослых</div>
                    <div>Кол-во детей</div>
                    <div>Возраст детей</div>
                    <div>Ваше имя</div>
                    <div>Ваш телефон</div>

                </div>
                <div className={styles.Booking_container__checkbox}>
                    <input type="checkbox" value="newsletter"></input>
                    <label htmlFor="subscribeNews">Вы даете согласие на обработку своих персональных данных</label>
                </div>
                <div>
                    <button>Отправить</button>
                </div>
                
            </div>
        </div>
    );
}
