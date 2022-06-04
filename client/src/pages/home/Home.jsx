import { EditOutlined, PhotoOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTweet, getFollowingsTweets } from '../../services/tweet-service'
import { changeBottom, changeLeft, changeRight } from '../../redux/display-slice'
import Tweet from '../../components/tweet/Tweet'
import styles from './home.module.css'

export default function Home() {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [tweet, setTweet] = useState({ text: '', image: '' })
    const [tweets, setTweets] = useState([])

    const sendTweet = () => {
        createTweet({ ...tweet, user: user._id }, user.accessToken)
            .then(() => {
                setTweet({ text: '', image: '' })
                getFollowingsTweets([...user.followings, user._id], user.accessToken)
                    .then((response) => setTweets(response))
            })
    }

    useEffect(() => {
        if (!user) {
            return navigate("/login");
        }
        else {

            dispatch(changeLeft(true))
            dispatch(changeBottom(true))
            dispatch(changeRight(true))

            getFollowingsTweets([...user.followings, user._id], user.accessToken)
                .then((response) => setTweets(response))
        }
    }, [user, navigate, dispatch])


    const convertBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setTweet({ ...tweet, image: reader.result })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return (
        <div className={styles.home}>

            <div className={styles.header}>
                <img src={user && user.profilePicture} alt="" onClick={() => navigate(`${user.username}`)} />
                <h3>Home</h3>
            </div>

            <div className={styles['tweeting-area']}>

                <textarea
                    placeholder="What's happening?"
                    rows={tweet.text.length / 33 + 1}
                    value={tweet.text}
                    onChange={(e) => setTweet({ ...tweet, text: e.target.value })} />

                {tweet.image && <img src={tweet.image} alt="" />}

                {/*<div className={styles.divider}></div> */}
                <div className={styles['tweeting-area-bottom']}>
                    <input type="file" onChange={(e) => convertBase64(e.target.files[0])} />
                    <PhotoOutlined className={styles['upload-icon']} />
                    <button onClick={sendTweet}>Tweet</button>
                </div>
            </div>

            {/*tweets*/}
            {tweets.map((tweet) => {
                return (
                    <div key={tweet._id}>
                        <Tweet props={tweet} />
                    </div>
                )
            })}

            <div className={styles.tweeting}>
                <EditOutlined className={styles['tweeting-logo']} />
            </div>
        </div>
    )
}
