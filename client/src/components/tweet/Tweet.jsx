import moment from 'moment'
import { ChatBubbleOutline, Favorite, FavoriteBorder, TransformOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import styles from './tweet.module.css'
import { updateTweet } from '../../services/tweet-service'
import { useState } from 'react'

export default function Tweet({ props }) {

    const { user } = useSelector(state => state.auth)

    const [tweet, setTweet] = useState({ ...props })

    const likeTweet = () => {

        updateTweet({ tweet, likeId: user._id }, user.accessToken)
            .then(response => {
                setTweet(response)
            })
    }

    const likeCheck = () => {
        const found = tweet.likes.find(element => element === user?._id)

        return found ? true : false;
    }

    return (
        <>
            <div className={styles.divider} />
            {tweet ? <div className={styles.tweet}>
                <img src={tweet.user.profilePicture} alt="" className={styles.profile} />
                <div className={styles.body}>
                    <p className={styles.info}><b>{tweet.user.name}</b> @{tweet.user.username} - {moment(tweet.createdAt).format("MMM D")}</p>
                    <p className={styles.text}>{tweet.text}</p>
                    {tweet.image && <img src={tweet.image} alt="" />}

                    <div className={styles.actions}>
                        <div className={styles.action}>
                            <ChatBubbleOutline />
                        </div>

                        <div className={`${styles.action} ${likeCheck() && styles.like}`}>
                            {likeCheck() ? <Favorite onClick={() => likeTweet()} /> : <FavoriteBorder onClick={() => likeTweet()} />}
                            <span>{tweet.likes.length}</span>
                        </div>

                        <div className={styles.action}>
                            <TransformOutlined />
                        </div>
                    </div>
                </div>
            </div> : <div></div>}
        </>
    )
}
