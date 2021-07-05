import { useContext } from 'react'
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const logoutUser = async () => {
    await axios.get('/user/logout');
    localStorage.clear();
    window.location.href = '/'
  }

  const adminRouter = () => {
    return (
      <>
        <li><Link to="/create_product">Criar Produto</Link></li>
        <li><Link to="/category">Categorias</Link></li>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <>
        <li><Link to="/history">Histórico de compras</Link></li>
        <li><Link to="" onClick={logoutUser}>Sair</Link></li>
      </>
    )
  }

  return (
    <header>
      <div className="menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      </div>
      <div className="logo">
        <h1>
          <Link to="/">
            {isAdmin ? 'Dashboard' : "api"}
          </Link>
        </h1>
      </div>
      <ul>
        <li><Link to="/">{isAdmin ? 'Produtos' : 'Loja'}</Link></li>
        {isAdmin && adminRouter()}
        {
          isLogged ? loggedRouter() : <li><Link to="/login">Login</Link></li>
        }
        <li className="menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </li>
      </ul>
      {
        isAdmin ? '' :
          <div className="cart-icon">
            <span>{ cart.length }</span>
            <Link to="/cart">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </Link>
          </div>
      }


    </header>
  )
}

export default Header;

// menu = <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
// close = <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
// cart = <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>