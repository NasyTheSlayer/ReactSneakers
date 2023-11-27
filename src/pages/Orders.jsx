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
        alert('Ошибка при запросе заказов')
      };
    })();
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {isLoading ? (
          (isLoading ? [...Array(8)] : orders)
            .map((item, index) => (
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
            <b className="mb-10">У вас нет заказов</b>
            <p>Вам нужно оформить заказ</p>
            <Link to="/react-sneakers/">
              <button>
                <img src="/react-sneakers/img/arrow.svg" alt="arrow" />
                Вернуться назад
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
