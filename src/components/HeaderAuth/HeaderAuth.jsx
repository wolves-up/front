import styles from './HeaderAuth.module.css';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { logout, selectUser } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const HeaderAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem('access_token');

  const handleClick = () => {
    signOut(auth).then(() => {
      dispatch(() => { localStorage.clear(); });
      navigate('/');
    })
  }

  return (
    <header className={styles.header}>
      {user ? (
        <Button onClick={handleClick} variant={{ isLogout: true }}>
          Выход
        </Button>
      ) : (
        <Button onClick={handleClick} variant={{ isLogout: true }}>
          Вход
        </Button>
      )}
    </header>
  );
}

export default HeaderAuth;