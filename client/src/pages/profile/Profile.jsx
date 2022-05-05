import { ArrowBack, CalendarMonth } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Tweet from '../../components/tweet/Tweet'
import styles from './profile.module.css'
import { useEffect, useState } from 'react'
import { followUser, getUser } from '../../services/user-service'
import { getTweets } from '../../services/tweet-service'
import { refreshUser } from '../../redux/auth-slice'
import EditProfile from '../../components/edit-profile/EditProfile'

export default function Profile() {

    const dispatch = useDispatch()
    const { username } = useParams()
    const { user } = useSelector(state => state.auth)

    const [edit, setEdit] = useState(false)
    const [tweets, setTweets] = useState([])
    const [followingStatus, setFollowingStatus] = useState("Follow")
    const [account, setAccount] = useState({
        name: '',
        username: '',
        likes: [],
        followers: [],
        followings: [],
        createdAt: '',
        headerPicture: '',
        profilePicture: ''
    })

    useEffect(() => {
        getUser(username)
            .then((res) => setAccount(res))
            .catch(err => console.log(err))

        getTweets(username)
            .then((res) => setTweets(res))
            .catch(err => console.log(err))

        if (user) {
            checkFollowing(user.followings)
        }
    }, [user, username])

    const handleFollow = async () => {
        const updatedFollowingList = await followUser(user, username)

        const userFromLocal = JSON.parse(localStorage.getItem('user'));

        localStorage.setItem('user', JSON.stringify({ ...userFromLocal, followings: updatedFollowingList }));
        dispatch(refreshUser({ ...user, followings: updatedFollowingList }))

        checkFollowing(updatedFollowingList)
    }

    const checkFollowing = (followings) => {
        if (followings.length == 0) {
            setFollowingStatus("Follow")
        }
        else {
            for (let i = 0; i < followings.length; i++) {
                if (followings[i] == username) {
                    setFollowingStatus("Following")
                    break;
                }
                else if (i == followings.length - 1) {
                    setFollowingStatus("Follow")
                }
            }
        }
    }

    return (
        <>
            {edit && <EditProfile edit={edit} setEdit={setEdit} account={user} setAccount={setAccount} />}
            {account.name
                ? <div className={styles["wrapper"]}>
                    <div className={styles.profile}>

                        {/*navbar*/}
                        <div className={styles.navbar}>
                            <ArrowBack />

                            <div>
                                <h3>{account.name}</h3>
                                <p>{tweets.length} Tweets</p>
                            </div>
                        </div>


                        {/*header*/}
                        <div className={styles.header}>
                            <img src={account.headerPicture} alt="" className={styles.wallpaper} />
                            <div>
                                <img src={account.profilePicture} alt="" className={styles['profile-pic']} />

                                {(user && account.username === user.username)
                                    ? <button onClick={(e) => setEdit(!edit)} className={styles['profile-button-following']}>Edit profile</button>
                                    : user && <button onClick={handleFollow} className={styles['profile-button-' + followingStatus.toLowerCase()]}>{followingStatus}</button>}
                            </div>
                        </div>

                        {/*info*/}
                        <div className={styles.info}>
                            <h3>{account.name}</h3>
                            <p>@{account.username}</p>

                            <div className={styles.date}>
                                <CalendarMonth />
                                <p>Joined September 2022</p>
                            </div>

                            <div className={styles.follow}>
                                <p><b>{account.followings.length}</b> Following</p>
                                <p><b>{account.followers.length}</b> Followers</p>
                            </div>
                        </div>

                        {/*buttons*/}
                        <div className={styles.buttons}>
                            <button>Tweets</button>
                            <button>Tweets & replies</button>
                            <button>Media</button>
                            <button>Likes</button>
                        </div>

                        {/*tweets*/}
                        {tweets.map((tweet) => {
                            return (
                                <div key={tweet._id}>
                                    <Tweet tweet={tweet} user={account} />
                                </div>
                            )
                        })}


                    </div>
                </div>
                : <div className={styles.wrapper}> <h3>This account doesn’t exist</h3></div>}
        </>
    )
}

