import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/react-sneakers/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="headerLogo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин найкращих кросівок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30">
          <img
            className="cu-p"
            width={18}
            height={18}
            src="img/cart.svg"
            alt="Basket"
          />
          <span className="cu-p">0 грн</span>
        </li>
        <li>
          <Link to="/favorites">
            <img
              className="mr-20 cu-p"
              width={18}
              height={18}
              src="img/heart.svg"
              alt="Favorites"
            />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img
              className="cu-p"
              width={18}
              height={18}
              src="img/user.svg"
              alt="User"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
