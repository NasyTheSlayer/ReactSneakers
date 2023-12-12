import { useContext, useEffect, useState } from "react";
import axios from "axios";

import AppContext from "../../context/AppContext.jsx";
import { Info } from "../Info.jsx";

import styles from "./Drawer.module.scss";

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setisOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://655dc0e69f1e1093c599cd64.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setisOrderComplete(true);
      setCartItems([]);
    } catch (error) {
      alert("Помилка під час створення замовлення");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Кошик{" "}
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Разом:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Податок 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} грн.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформити замовлення <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Замовлення Оформлено!" : "Кошик порожній"}
            description={
              isOrderComplete
                ? `Ваше замовлення #${orderId} скоро буде передано кур'єрській доставці`
                : "Додайте хоча б одну пару кросівок, щоб зробити замовлення."
            }
            image={
              isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
