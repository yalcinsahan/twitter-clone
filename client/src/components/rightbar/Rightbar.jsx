import { Search } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import styles from './rightbar.module.css'

export default function Rightbar() {

    const { rightbar } = useSelector(state => state.displays)

    if (rightbar) {
        return (
            <div className={styles.rightbar}>
                <div className={styles.search}>
                    <Search />
                    <input type="text" placeholder='Search Twitter' />
                </div>

                <div className={styles.trends}>
                    <h3>Trends for you</h3>

                    <div className={styles.trend}>
                        <p>Sports</p>
                        <h3>#Adem</h3>
                        <p>27.3k Tweets</p>
                    </div>

                    <div className={styles.trend}>
                        <p>Sports</p>
                        <h3>#Adem</h3>
                        <p>27.3k Tweets</p>
                    </div>

                    <div className={styles.trend}>
                        <p>Sports</p>
                        <h3>#Adem</h3>
                        <p>27.3k Tweets</p>
                    </div>

                    <div className={styles.trend}>
                        <p>Sports</p>
                        <h3>#Adem</h3>
                        <p>27.3k Tweets</p>
                    </div>

                    <div className={styles.trend}>
                        <p>Sports</p>
                        <h3>#Adem</h3>
                        <p>27.3k Tweets</p>
                    </div>

                    <div className={styles.trend}>
                        <p>Sports</p>
                        <h3>#Adem</h3>
                        <p>27.3k Tweets</p>
                    </div>

                    <div className={styles.trend}>
                        <p>Sports</p>
                        <h3>#Adem</h3>
                        <p>27.3k Tweets</p>
                    </div>

                    <div className={styles.trend}>
                        <p>Sports</p>
                        <h3>#Adem</h3>
                        <p>27.3k Tweets</p>
                    </div>

                    <div className={styles.trend}>
                        <p>Sports</p>
                        <h3>#Adem</h3>
                        <p>27.3k Tweets</p>
                    </div>

                    <div className={styles.trend}>
                        <p>Sports</p>
                        <h3>#Adem</h3>
                        <p>27.3k Tweets</p>
                    </div>

                </div>
            </div>
        )
    }
}
