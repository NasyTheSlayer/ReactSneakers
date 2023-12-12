import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Link } from 'react-router-dom';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://655dc0e69f1e1093c599cd64.mockapi.io/orders");
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false)
      } catch (error) {
        alert('Помилка при запиті замовлень')
      };
    })();
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мої замовлення</h1>
      </div>
      <div className="d-flex flex-wrap">
        {orders.length > 0 ? (
          orders.map((item, index) => (
              <Card 
                key={index}
                loading={isLoading}
                {...item}
              />
            ))
        ) : (
          <div className='emptyOrders'>
            <img
              className="mb-30"
              width={70}
              height={70}
              src="/react-sneakers/img/not-orders.jpg"
              alt="Sad smile"
            />
            <b className="mb-10">У вас немає замовлень</b>
            <p>Вам потрібно оформити замовлення</p>
            <Link to="/react-sneakers/">
              <button>
                <img src="/react-sneakers/img/arrow.svg" alt="arrow" />
                Повернутися назад
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
