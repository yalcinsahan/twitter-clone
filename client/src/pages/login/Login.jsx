import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../../redux/auth-slice'
import styles from './login.module.css'

export default function Login() {

    const [userData, setUserData] = useState({ username: "", password: "" })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {

        if (isError) console.log(message)

        if (isSuccess || user) navigate('/')

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])


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
                type="text"
                placeholder='password'
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

            <button type='submit'>Log In</button>
        </form>
    )
}
