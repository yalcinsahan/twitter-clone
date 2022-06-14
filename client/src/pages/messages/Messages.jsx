import styles from './messages.module.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import Conversations from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import { ArrowBack, Send } from '@mui/icons-material'
import { changeBottom, changeLeft, changeRight } from '../../redux/display-slice'
import { getConversations, getMessages, postMessage } from '../../services/chat-service'

export default function Messages() {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const [conversations, setConversations] = useState()
    const [currentChat, setCurrentChat] = useState()
    const [messages, setMessages] = useState()
    const [message, setMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState()
    const socket = useRef()
    const scrollRef = useRef();

    useEffect(() => {
        dispatch(changeLeft(true))
        dispatch(changeBottom(true))
        dispatch(changeRight(false))
    }, [dispatch])

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

        getConversations(user._id)
            .then(res => setConversations(res))

    }, [user]);


    useEffect(() => {

        setMessage("")

        getMessages(currentChat?._id)
            .then(res => setMessages(res))

        currentChat?._id ? dispatch(changeBottom(false)) : dispatch(changeBottom(true))

    }, [currentChat?._id, dispatch])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault()

        if (message) {
            const receiverId = currentChat.members.find((member) => member !== user._id)

            socket.current?.emit("sendMessage", { senderId: user._id, receiverId: receiverId, text: message })

            postMessage({ sender: user._id, conversationId: currentChat._id, text: message })
                .then(res => {
                    setMessages([...messages, res])
                    setMessage("")
                })
        }
    }

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

                            <div className={styles["chat-body"]}>
                                {messages?.map((message) => <Message message={message} own={user._id === message.sender} key={message._id} />)}
                                <div ref={scrollRef}></div>

                                <form className={styles["bottom"]} onSubmit={(e) => handleSend(e)}>
                                    <input type="text" placeholder='Start a new message' value={message} onChange={(e) => setMessage(e.target.value)} />
                                    <Send type="submit" className={styles["send"]} onClick={(e) => handleSend(e)} />
                                </form>
                            </div>
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
