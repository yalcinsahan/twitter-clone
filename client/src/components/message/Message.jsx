import styles from './message.module.css'

export default function Message(props) {

    return (
        <div className={styles[props.own ? 'own' : 'message']}>
            {props.message.text}
        </div>
    )
}
