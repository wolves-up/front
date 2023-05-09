
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import NotFoundPage from './pages/NotFoundPage';
import RequireAuth from './pages/RequireAuth';
import RequireUnauth from './pages/RequireUnauth';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<RequireUnauth loginButtonRequired><Main /></RequireUnauth>} />
          <Route path='/signup' element={<RequireUnauth><SignupForm /></RequireUnauth>} />
          <Route path='/login' element={<RequireUnauth><LoginForm /></RequireUnauth>} />
          <Route path='/dashboard' element={<RequireAuth></RequireAuth>} />
          <Route path='/recipes' element={<RequireAuth></RequireAuth>} />
          <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
