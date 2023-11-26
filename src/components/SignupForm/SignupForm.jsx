import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { passwordIsValid, invalidPasswordErrorMessage } from "../../utils/validators";
import Form from '../Form/Form';
import styles from '../Form/Form.module.css';
import cn from 'classnames';
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";
import { BMR } from "../../utils/equations";
import { getAgeFromBirthdate } from "../../utils/converters";

const SignupForm = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setError('');
    setPassword(event.target.value);
  }

  const handleConfirmPasswordChange = (event) => {
    setError('');
    setConfirmPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let errorOcurred = error !== '';

    if (!passwordIsValid(password)) {
      setError(invalidPasswordErrorMessage);
      errorOcurred = true;
    }

    if (password !== confirmPassword) {
      setError('The passwords do not match');
      errorOcurred = true;
    }

    if (!errorOcurred) {
      try {
        const registerData = await fetch(`http://46.146.211.12:25540/register?login=${email}&password=${password}`, {
          method: "GET",
        });
        if (!registerData.ok) {
          throw Error("Wrong email or password");
        }

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
        navigate('/');
      } catch(err) {
        console.log(err);
        setError('An error ocurred');
      };
    }
    setLoading(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className={styles.form__header}>
        Регистрация
      </h2>
      
      <div className={styles.form__item}>Эл. почта <span className={styles.input_required}>*</span></div>
      <input 
        type="email" 
        className={cn(styles.input, styles.form__item)}
        placeholder="Email address" 
        required 
        value={email}
        onChange={handleEmailChange}
      />

      <div className={styles.form__item}>Пароль <span className={styles.input_required}>*</span></div>
      <input 
        type="password" 
        className={cn(styles.input, styles.form__item)}
        placeholder="Password" 
        required 
        value={password}
        onChange={handlePasswordChange}
      />

      <div className={styles.form__item}>Подтвердите пароль <span className={styles.input_required}>*</span></div>
      <input 
        type="password" 
        className={cn(styles.input, styles.form__item)}
        placeholder="Password" 
        required 
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />

      <Button 
        className={styles.form__button} 
        variant={{isPrimary: true}}
        disabled={loading}
      >
        Зарегистрироваться
      </Button>

      <div className={styles.login_signup_link}>
        <div className={styles.login_signup_link__header}>Есть аккаунт?</div> 
        <ButtonLink link="/login">Вход</ButtonLink>
      </div>

      { error && <div className={styles.error}>{ error }</div> }
    </Form>
  );
}

export default SignupForm;