import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = ()=>{
  const [ user, setUser ] = useState({
    email: '', password: ''
  })

  const onChangeInput = e =>{
    const { name, value } = e.target
    setUser({ ...user, [name]:value })
    console.log(name, value)
  }

  const loginSubmit = async e =>{
    e.preventDefault();
    try {
      await axios.post('/user/login', {...user});

      window.location.href = "/";
    } catch (error) { alert( error.response.data.msg ) }
  }

  return(
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} onComplete="on" />

        <input type="password" name="password" required placeholder="Senha" value={user.password} onChange={onChangeInput} onComplete="on" />

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Cadastro</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;