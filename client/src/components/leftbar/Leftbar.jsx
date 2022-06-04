import { EditOutlined, EmailOutlined, HomeOutlined, NotificationsOutlined, PersonOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './leftbar.module.css'

export default function Leftbar() {

    const { user } = useSelector(state => state.auth)
    const { leftbar } = useSelector(state => state.displays)
    const navigate = useNavigate()

    const [dialogVisibility, setDialogVisibility] = useState(false)

    if (leftbar) {
        return (
            <div className={styles.leftbar}>
                <div className={styles.top}>
                    <img onClick={() => navigate("/")} src="/icons/twitter.png" alt="" className={styles.logo} />

                    <div className={styles.links}>
                        <Link to="/" className={styles.link}>
                            <HomeOutlined />
                            <p>Home</p>
                        </Link>

                        <Link to="/notifications" className={styles.link}>
                            <NotificationsOutlined />
                            <p>Notifications</p>
                        </Link>

                        <Link to="/messages" className={styles.link}>
                            <EmailOutlined />
                            <p>Messages</p>
                        </Link>

                        <Link to={"/" + user?.username} className={styles.link}>
                            <PersonOutlined className={styles['link-icon']} />
                            <p>Profile</p>
                        </Link>
                    </div>

                    <div className={styles.tweeting}>
                        <EditOutlined className={styles['tweeting-logo']} />
                        <p>Tweet</p>
                    </div>
                </div>

                <div className={styles.bottom} >
                    <div className={styles.dialog} style={{ visibility: dialogVisibility ? "unset" : "hidden" }}>
                        <p onClick={() => navigate("/logout")}>
                            Log out @{user?.username}
                        </p>
                    </div>


                    <div className={styles.names} onClick={() => setDialogVisibility(!dialogVisibility)}>
                        <img src={user?.profilePicture} alt="" className={styles.profile} />
                        <div>
                            <p><b>{user?.name}</b></p>
                            <p>@{user?.username}</p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
