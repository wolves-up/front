import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { passwordIsValid, invalidPasswordErrorMessage } from "../../utils/validators";
import { doc, setDoc } from "firebase/firestore";
import Form from '../Form/Form';
import styles from '../Form/Form.module.css';
import cn from 'classnames';
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";
import { BMR } from "../../utils/equations";
import { getAgeFromBirthdate } from "../../utils/converters";

const SignupForm = () => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMale, setIsMale] = useState(true);
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(60);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

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

  const handleGenderChange = (event) => {
    setError('');
    setIsMale(event.target.value === 'male');
  }

  const handleBirthdateChange = (event) => {
    setError('');
    setBirthDate(event.target.value);
  }

  const handleHeightChange = (event) => {
    setError('');
    setHeight(+event.target.value);
  }

  const handleWeightChange = (event) => {
    setError('');
    setWeight(+event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let errorOcurred = error !== '';

    const bmr = BMR(isMale, getAgeFromBirthdate(new Date(birthDate)), height, weight);
    if (bmr < 0) {
      setError('Invalid height or weight');
      errorOcurred = true;
    }

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
        Create a new account!
      </h2>
      <div className={styles.form__item}>Name</div>
      <input 
        type="text" 
        className={cn(styles.input, styles.form__item)}
        placeholder="Your name" 
        value={name}
        onChange={handleNameChange}
      />

      <div className={styles.form__item}>Email <span className={styles.input_required}>*</span></div>
      <input 
        type="email" 
        className={cn(styles.input, styles.form__item)}
        placeholder="Email address" 
        required 
        value={email}
        onChange={handleEmailChange}
      />

      <div className={styles.form__item}>Password <span className={styles.input_required}>*</span></div>
      <input 
        type="password" 
        className={cn(styles.input, styles.form__item)}
        placeholder="Password" 
        required 
        value={password}
        onChange={handlePasswordChange}
      />

      <div className={styles.form__item}>Confirm password <span className={styles.input_required}>*</span></div>
      <input 
        type="password" 
        className={cn(styles.input, styles.form__item)}
        placeholder="Password" 
        required 
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />

      <h3 className={styles.section__header}>Personal info</h3>

      <div className={styles.form__item}>Gender</div>
      <div className="flex-wrapper">
        <div className={styles.radio__item}>
          <input 
            id="male" 
            type="radio" 
            name="gender" 
            className={cn(styles.input, styles.form__item_inline, styles.input_radio)}
            value="male"
            checked={isMale}
            onChange={handleGenderChange}
          />       
          <label for="male">Male</label> 
        </div>
        <div className={styles.radio__item}>
          <input 
            id="female" 
            type="radio" 
            name="gender" 
            className={cn(styles.input, styles.form__item_inline, styles.input_radio)}
            value="female"
            checked={!isMale}
            onChange={handleGenderChange}
          /> 
          <label for="female">Female</label>
        </div>
      </div>
      <div className={styles.form__item}>Birth date</div>
      <input 
        type="date" 
        className={cn(styles.input, styles.form__item)}
        value={birthDate}
        onChange={handleBirthdateChange}
      />

      <div className={styles.form__item}>Height (cm)</div>
      <input 
        type="number" 
        min="1" 
        max="300" 
        className={cn(styles.input, styles.form__item)}
        value={height}
        onChange={handleHeightChange}
      />

      <div className={styles.form__item}>Weight (kg)</div>
      <input 
        type="number" 
        min="1" 
        max="300" 
        className={cn(styles.input, styles.form__item)}
        value={weight}
        onChange={handleWeightChange}
      />

      <Button 
        className={styles.form__button} 
        variant={{isPrimary: true}}
        disabled={loading}
      >
        SIGN UP
      </Button>

      <div className={styles.login_signup_link}>
        <div className={styles.login_signup_link__header}>Already registered?</div> 
        <ButtonLink link="/login">Log in</ButtonLink>
      </div>

      { error && <div className={styles.error}>{ error }</div> }
    </Form>
  );
}

export default SignupForm;