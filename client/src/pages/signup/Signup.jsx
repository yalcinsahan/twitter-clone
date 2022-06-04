import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset } from '../../redux/auth-slice'
import { changeBottom, changeLeft, changeRight } from '../../redux/display-slice'
import authService from '../../services/auth-service'
import styles from './signup.module.css'

export default function Signup() {

    const [userData, setUserData] = useState({ name: "", username: "", email: "", password: "", dateOfBirth: "" })
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

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

    }, [user, navigate, dispatch])


    const handleSignup = (e) => {
        e.preventDefault()

        if (userData.name && userData.username && userData.email && userData.password && userData.dateOfBirth) {
            authService.signup(userData)
                .then(() => {
                    setSuccess(true)
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000);
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <>
            {!success ? (
                <form onSubmit={(e) => handleSignup(e)} className={styles.signup}>

                    <img src="/icons/twitter.png" alt="" />

                    <h1>Signup</h1>

                    <input
                        type="text"
                        placeholder='name'
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })} />

                    <input
                        type="text"
                        placeholder='username'
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })} />

                    <input
                        type="email"
                        placeholder='email'
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })} />

                    <input
                        type="text"
                        placeholder='password'
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

                    <input
                        type="date"
                        value={userData.dateOfBirth}
                        onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })} />

                    <button type='submit'>Signup</button>
                </form>
            ) :
                <div className={styles['success-container']}>
                    <div className={styles['success-message']}>
                        <h3>Registration successful.</h3>
                        <p>The login screen is loading....</p>

                        <div className="spinner-container">
                            <div className={styles["loading-spinner"]}>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
