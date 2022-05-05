import { SearchOutlined, HomeOutlined, NotificationsOutlined, EmailOutlined } from '@mui/icons-material'
import styles from './bottombar.module.css'

export default function Bottombar() {
    return (
        <div className={styles.bottombar}>
            <HomeOutlined />
            <SearchOutlined />
            <NotificationsOutlined />
            <EmailOutlined />
        </div>
    )
}
