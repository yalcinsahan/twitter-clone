import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import styles from './app.module.css';
import Leftbar from './components/leftbar/Leftbar';
import Rightbar from './components/rightbar/Rightbar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Bottombar from './components/bottombar/Bottombar';
import Signup from './pages/signup/Signup';

function App() {

  const { user } = useSelector(state => state.auth)

  return (
    <BrowserRouter>
      <>
        <div className={styles.app}>
          {user && <Leftbar />}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/homepage' element={<Home />} />
            <Route path='/:username' element={<Profile />} />
          </Routes>
          {user && <Rightbar />}
        </div>
        {user && <Bottombar />}
      </>
    </BrowserRouter>

  );
}

export default App;
