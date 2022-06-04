import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './logout.module.css'
import { logout } from '../../redux/auth-slice'
import { useEffect } from 'react'

export default function Logout() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (!user) navigate("/login")
    }, [user, navigate])

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        <div className={styles.logout}>
            <div className={styles.box}>
                <img src="icons/twitter.png" alt="" />

                <h1>Log out of Twitter?</h1>
                <p>You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.</p>

                <button className={styles["logout-button"]} onClick={handleLogout}>Log out</button>
                <button className={styles["cancel-button"]} onClick={() => navigate(-1)}>Cancel</button>
            </div>
        </div>
    )
}
