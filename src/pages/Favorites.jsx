import { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context/AppContext";
import { Link } from 'react-router-dom';

function Favorites({ items }) {
  const { favorites, onAddToFavorite } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мої закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <Card
              key={item.id}
              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
            />
          ))
        ) : (
          <div className='favoriteEmpty'>
            <img
              className="mb-30"
              width={70}
              height={70}
              src="/react-sneakers/img/not-favorite.jpg"
              alt="Sad smile"
            />
            <b className="mb-10">Закладок немає</b>
            <p>Ви нічого не додавали до закладок</p>
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

export default Favorites;
