import styles from './messages.module.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { io } from 'socket.io-client'
import Conversations from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import { ArrowBack, Send } from '@mui/icons-material'
import { changeBottom, changeDisplays, changeLeft, changeRight } from '../../redux/display-slice'
import { getUserById } from '../../services/user-service'

export default function Messages() {

    const { user } = useSelector(state => state.auth)
    const { rightbar } = useSelector(state => state.displays)
    const dispatch = useDispatch()


    const [conversations, setConversations] = useState()
    const [currentChat, setCurrentChat] = useState()
    const [messages, setMessages] = useState()
    const [message, setMessage] = useState()
    const [arrivalMessage, setArrivalMessage] = useState()
    const [friend, setFriend] = useState()
    const socket = useRef()
    const scrollRef = useRef();
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        dispatch(changeLeft(true))
        dispatch(changeBottom(true))
        dispatch(changeRight(false))
    }, [])

    useEffect(() => {
        socket.current = io("ws://localhost:8000");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {

        });
    }, [user]);

    useEffect(() => {
        getConversations()
    }, [user._id])

    useEffect(() => {
        getMessages()

        if (currentChat?._id) {
            dispatch(changeBottom(false))
        }
        else {
            dispatch(changeBottom(true))
        }

        const friendId = currentChat?.members.find((member) => member !== user._id)
        getUserById(friendId)
            .then((res) => {
                setFriend({ name: res.name, username: res.username, profilePicture: res.profilePicture })
            })

    }, [currentChat?._id])

    const getConversations = () => {
        axios.get("http://localhost:8000/conversations/" + user._id)
            .then(res => setConversations(res.data))
            .catch(err => console.log(err))
    }

    const getMessages = () => {
        axios.get("http://localhost:8000/messages/" + currentChat?._id)
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    }

    const handleSend = (e) => {
        e.preventDefault()

        scrollToBottom()

        if (message) {
            const receiverId = currentChat.members.find((member) => member !== user._id)

            socket.current?.emit("sendMessage", { senderId: user._id, receiverId: receiverId, text: message })

            axios.post("http://localhost:8000/messages", { sender: user._id, conversationId: currentChat._id, text: message })
                .then(res => {
                    setMessages([...messages, res.data])
                    setMessage("")
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className={styles["chat"]}>

            <div className={styles["wrapper"]}>
                <div className={`${styles["conversations"]} ${currentChat?._id && styles["hide-conservations"]}`}>
                    {conversations?.map((conversation) => (
                        <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                            <Conversations conversation={conversation} />
                        </div>
                    ))}
                </div>


                <div className={styles["messages"]}>

                    {currentChat?._id ? (
                        <>
                            <div className={styles["navbar"]}>
                                <ArrowBack className={styles["back-button"]} onClick={() => setCurrentChat(null)} />
                                <img src={user.profilePicture} alt="" />
                                <div>
                                    <b>{user.name}</b>
                                    <p>@{user.username}</p>
                                </div>
                            </div>

                            {messages?.map((message) => <Message message={message} own={user._id === message.sender} key={message._id} />)}
                            <div ref={scrollRef}></div>

                            <form className={styles["bottom"]} onSubmit={(e) => handleSend(e)}>
                                <input type="text" placeholder='Start a new message' value={message} onChange={(e) => setMessage(e.target.value)} />
                                <Send type="submit" className={styles["send"]} onClick={(e) => handleSend(e)} />
                            </form>
                        </>
                    ) : <div className={styles["info"]}>
                        <h3>Select a message</h3>
                        <p>Choose from your existing conversations, start a new one, or just keep swimming.</p>
                    </div>}
                </div>

            </div>


        </div>
    )
}
