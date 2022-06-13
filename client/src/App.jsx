import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import Leftbar from './components/leftbar/Leftbar';
import Rightbar from './components/rightbar/Rightbar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Bottombar from './components/bottombar/Bottombar';
import Signup from './pages/signup/Signup';
import Messages from './pages/messages/Messages';
import Logout from './pages/logout/Logout';

function App() {

  return (
    <BrowserRouter>
      <>
        <div className={styles.app}>
          <Leftbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/homepage' element={<Home />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/:username' element={<Profile />} />
          </Routes>
          <Rightbar />
        </div>
        <Bottombar />
      </>
    </BrowserRouter>

  );
}

export default App;
