import React, { useRef } from 'react'
import "./Register.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //パスワードと確認用パスワードが一致しているかどうかを確認
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("パスワードが一致しません");
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value
        }
        await axios.post("/auth/register", user)
        navigate('/login');
      }catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div>
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className='loginLogo'>Real SNS</h3>
                    <span className="loginDesc">本格的なSNSを、自分の手で。</span>
                </div>
                <div className="loginRight">
                  <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                    <p className="loginMessage">新規登録はこちら</p>
                    <input type="text" className="loginInput" placeholder='ユーザー名' required ref={username}/>
                    <input type="email" className="loginInput" placeholder='Eメール' required ref={email}/>
                    <input type="password" className="loginInput" placeholder='パスワード' required minLength="6" ref={password}/>
                    <input type="password" className="loginInput" placeholder='確認用パスワード' required minLength="6" ref={passwordAgain}/>
                    <button className='loginButton' type='submit'>サインアップ</button>                
                    <button className="loginRegister">ログイン</button>
                  </form>
                </div>
            </div>
        </div>
    </div>
  )
}
