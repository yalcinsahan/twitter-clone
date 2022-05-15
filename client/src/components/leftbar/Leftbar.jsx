import { EditOutlined, EmailOutlined, HomeOutlined, NotificationsOutlined, PersonOutlined, Search, Star } from '@mui/icons-material'
import { height, width } from '@mui/system'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './leftbar.module.css'

export default function Leftbar() {

    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const [dialog, setDialog] = useState(true)

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

                    <Link to={"/" + user.username} className={styles.link}>
                        <PersonOutlined className={styles['link-icon']} />
                        <p>Profile</p>
                    </Link>
                </div>

                <div className={styles.tweeting}>
                    <EditOutlined className={styles['tweeting-logo']} />
                    <p>Tweet</p>
                </div>
            </div>

            <div className={styles.bottom}>
                <img src={user.profilePicture} alt="" className={styles.profile} />
                <div>
                    <p><b>{user.name}</b></p>
                    <p>@{user.username}</p>
                </div>
            </div>

        </div>
    )
}
