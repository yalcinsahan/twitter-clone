import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../../redux/auth-slice'
import { changeBottom, changeLeft, changeRight } from '../../redux/display-slice'
import styles from './login.module.css'

export default function Login() {

    const [userData, setUserData] = useState({ username: "", password: "" })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {

        if (user) {
            navigate('/')
        }
        else {
            dispatch(changeLeft(false))
            dispatch(changeRight(false))
            dispatch(changeBottom(false))
        }

        dispatch(reset())

    }, [user, message, navigate, dispatch])


    const handleLogIn = (e) => {
        e.preventDefault()

        dispatch(login(userData))

    }

    return (
        <form onSubmit={(e) => handleLogIn(e)} className={styles.login}>

            <img src="/icons/twitter.png" alt="" />

            <h1>Log In</h1>

            <input
                type="text"
                placeholder='username'
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })} />

            <input
                type="password"
                placeholder='password'
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

            <button type='submit' disabled={!userData.username || !userData.password}>Log In</button>

            <div className={styles.router}>Don't have an account? <span onClick={() => navigate("/signup")}>Sign up</span></div>
        </form>
    )
}
