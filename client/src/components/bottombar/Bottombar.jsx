import { SearchOutlined, HomeOutlined, NotificationsOutlined, EmailOutlined } from '@mui/icons-material'
import styles from './bottombar.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Bottombar() {

    const navigate = useNavigate()
    const { bottombar } = useSelector(state => state.displays)

    return (
        bottombar ? (
            <div className={styles.bottombar}>
                <HomeOutlined onClick={() => navigate("/")} />
                <SearchOutlined />
                <NotificationsOutlined />
                <EmailOutlined onClick={() => navigate("/messages")} />
            </div>
        ) : <div></div>
    )

}
