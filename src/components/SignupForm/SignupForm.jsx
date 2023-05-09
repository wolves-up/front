import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }

  const handleSexChange = (event) => {
    setIsMale(event.target.value === 'male');
  }

  const handleBirthdateChange = (event) => {
    setBirthDate(event.target.value);
  }

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  }

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!passwordIsValid(password)) {
      setError(invalidPasswordErrorMessage);
      return;
    }

    if (password !== confirmPassword) {
      setError('The passwords do not match');
      return;
    }

    try {
      const userAuth = await createUserWithEmailAndPassword(auth, email, password);
      const nameToStore = name === '' ? 'user' : name;
      try {
        await setDoc(doc(db, 'users', userAuth.user.uid), {
          name: nameToStore,
          isMale,
          birthDate,
          height: +height,
          weight: +weight
        });
        dispatch(login({
          email: userAuth.user.email,
          id: userAuth.user.uid,
          name: nameToStore,
          isMale,
          birthDate,
          height: +height,
          weight: +weight
        }));
        setError('');
        navigate('/dashboard');
      } catch(err) {
        deleteUser(auth.currentUser);
        setError('An error ocurred');
      }
    } catch(err) {
      setError('An error ocurred');
    };
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

      <div className={styles.form__item}>Email</div>
      <input 
        type="email" 
        className={cn(styles.input, styles.form__item)}
        placeholder="Email address" 
        required 
        value={email}
        onChange={handleEmailChange}
      />

      <div className={styles.form__item}>Password</div>
      <input 
        type="password" 
        className={cn(styles.input, styles.form__item)}
        placeholder="Password" 
        required 
        value={password}
        onChange={handlePasswordChange}
      />

      <div className={styles.form__item}>Confirm password</div>
      <input 
        type="password" 
        className={cn(styles.input, styles.form__item)}
        placeholder="Password" 
        required 
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />

      <h3 class="section__header">Personal info</h3>

      <div className={styles.form__item}>Sex</div>
      <input 
        id="male" 
        type="radio" 
        name="sex" 
        className={cn(styles.input, styles.form__item_inline)}
        value="male"
        checked={isMale}
        onChange={handleSexChange}
      />       
      <label for="male">Male</label> 
      <input 
        id="female" 
        type="radio" 
        name="sex" 
        className={cn(styles.input, styles.form__item_inline)}
        value="female"
        checked={!isMale}
        onChange={handleSexChange}
      /> 
      <label for="female">Female</label>

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

      <Button className={cn(styles.form__button)} isPrimary>SIGN UP</Button>

      { error && <div className={styles.error}>{ error }</div> }
    </Form>
  );
}

export default SignupForm;