import { Clear, PhotoCamera } from '@mui/icons-material'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../../redux/auth-slice';
import { updateUser } from '../../services/user-service'
import styles from './edit-profile.module.css'

export default function EditProfile(props) {

    const dispatch = useDispatch()
    const [account, setAccount] = useState(props.account)

    useEffect(() => {
        document.body.style.overflow = "hidden"
    }, [])


    const saveChanges = async () => {
        await updateUser(account)
            .then(() => {
                props.setAccount(account)
                handleClose()

                const userFromLocal = JSON.parse(localStorage.getItem('user'));

                localStorage.setItem('user', JSON.stringify({ ...userFromLocal, headerPicture: account.headerPicture, profilePicture: account.profilePicture, name: account.name }));
                dispatch(refreshUser({ ...account, headerPicture: account.headerPicture, profilePicture: account.profilePicture, name: account.name }))

            })

    }


    const handleClose = () => {
        props.setEdit(false)
        document.body.style.overflow = "auto"
    }

    const convertBase64 = (file, type) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            if (type === "profile") {
                setAccount({ ...account, profilePicture: reader.result })
            }
            else if (type === "header") {
                setAccount({ ...account, headerPicture: reader.result })
            }
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return (
        <div className={styles['edit-profile']} >
            <div className={styles['edit-box']}>

                <div className={styles['header']}>
                    <Clear onClick={handleClose} style={{ cursor: "pointer" }} />
                    <h3>Edit profile</h3>
                    <button onClick={saveChanges}>Save</button>
                </div>

                <div>

                    <div className={styles['wallpaper']} >
                        <div className={styles['camera-icon']} >
                            <div>
                                <PhotoCamera />
                                <input
                                    type="file"
                                    onChange={(e) => convertBase64(e.target.files[0], "header")}
                                />
                            </div>
                        </div>
                        <img src={account.headerPicture} alt="" />
                    </div>


                    <div className={styles['profile']}>
                        <div className={styles['profile-div']} style={{ backgroundImage: `url(${account.profilePicture})` }}>
                            <div className={styles['camera-icon']} >
                                <div>
                                    <PhotoCamera />
                                    <input
                                        type="file"
                                        onChange={(e) => convertBase64(e.target.files[0], "profile")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className={styles.inputs}>
                    <div className={styles["input"]}>
                        <span>Name</span>
                        <input
                            type="text"
                            value={account.name}
                            onChange={(e) => setAccount({ ...account, name: e.target.value })}
                        />
                    </div>
                </div>


            </div>
        </div>
    )
}
