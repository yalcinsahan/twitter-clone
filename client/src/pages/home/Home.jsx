import { EditOutlined, PhotoOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTweet, getFollowingsTweets } from '../../services/tweet-service'
import Tweet from '../../components/tweet/Tweet'
import styles from './home.module.css'

export default function Home() {

    const { user } = useSelector(state => state.auth)

    let navigate = useNavigate();

    const [tweet, setTweet] = useState({ text: '', image: '' })
    const [tweets, setTweets] = useState([])

    const sendTweet = () => {
        createTweet({ ...tweet, ownerUsername: user.username, ownerName: user.name, ownerProfilePicture: user.profilePicture }, user.accessToken)
            .then(() => {
                setTweet({ text: '', image: '' })
                getFollowingsTweets([...user.followings, user.username], user.accessToken)
                    .then((response) => setTweets(response))
            })
    }

    useEffect(() => {
        if (!user) {
            return navigate("/login");
        }
        else {
            getFollowingsTweets([...user.followings, user.username], user.accessToken)
                .then((response) => setTweets(response))
        }
    }, [user, navigate])


    const convertBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result)
            setTweet({ ...tweet, image: reader.result })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return (
        <div className={styles.home}>

            <div className={styles.header}>
                <img src={user.profilePicture} alt="" />
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
                        <Tweet tweet={tweet} />
                    </div>
                )
            })}

            <div className={styles.tweeting}>
                <EditOutlined className={styles['tweeting-logo']} />
            </div>
        </div>
    )
}
