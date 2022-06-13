import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from './conversations.module.css'

export default function Conversations(props) {

    const { user } = useSelector(state => state.auth)

    const [friend, setFriend] = useState()

    useEffect(() => {

        const friendId = props.conversation.members.find((member) => member !== user._id)

        axios.get("http://localhost:8000/users/" + friendId)
            .then(res => setFriend(res.data))
            .catch(err => console.log(err))

    }, [props, user])

    return (
        <>
            <div className={styles["conversation"]}>
                <img src={friend?.profilePicture} alt="" />
                <span><b>{friend?.name}</b></span>
                <span>@{friend?.username}</span>
            </div>
            <div className={styles["divider"]}></div>
        </>
    )
}
