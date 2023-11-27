import { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context/AppContext";
import { Link } from 'react-router-dom';

function Favorites({ items }) {
  const { favorites, onAddToFavorite } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мои закладки</h1>
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
              src="img/not-favorite.jpg"
              alt="Sad smile"
            />
            <b className="mb-10">Закладок нет</b>
            <p>Вы ничего не добавляли в закладки</p>
            <Link to="/react-sneakers/">
              <button>
                <img src="img/arrow.svg" alt="arrow" />
                Вернуться назад
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
