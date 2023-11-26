import { login } from "../../redux/user/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from '../Form/Form';
import styles from '../Form/Form.module.css';
import cn from 'classnames';
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";

const LoginForm = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userAuth = await fetch(`http://46.146.211.12:25540/login?login=${email}&password=${password}`, {
        method: "GET",
        });
      if (userAuth.ok) {
        const token = await userAuth.text();
        localStorage.setItem('access_token', token);
      }
      else {
        throw Error("Wrong email or password");
      }
      navigate('/news');
    } catch(err) {
      setError('Invalid email or password');
    };
    setLoading(false);
  }

  return (
      <Form onSubmit={handleSubmit}>
        <h2 className={styles.form__header}>
          Вход
        </h2>

        <div className={styles.form__item}>Эл. почта</div>
        <input 
          type="email" 
          className={cn(styles.input, styles.form__item)}
          placeholder="Email address" 
          required 
          value={email}
          onChange={handleEmailChange}
        />

        <div className={styles.form__item}>Пароль</div>
        <input 
          type="password" 
          className={cn(styles.input, styles.form__item)}
          placeholder="Password" 
          required 
          value={password}
          onChange={handlePasswordChange}
        />

        <Button 
          className={styles.form__button} 
          variant={{isPrimary: true}}
          disabled={loading}
        >
          Войти
        </Button>

        <div className={styles.login_signup_link}>
          <div className={styles.login_signup_link__header}>Нет аккаунта?</div> 
          <ButtonLink link="/signup">Регистрация</ButtonLink>
        </div>

        { error && <div className={styles.error}>{ error }</div> }
      </Form>
  );
}

export default LoginForm;