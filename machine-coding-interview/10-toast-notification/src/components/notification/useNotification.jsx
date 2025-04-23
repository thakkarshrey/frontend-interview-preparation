import { useRef, useState } from "react"
import Notification from "./Notification"

const useNotification = (position = "top-right") => {
    const [notifications, setNotifications] = useState([])
    let timerId = useRef([]);

    const notify = (notificationProps) => {
        clearTimeout(timerId.current[timerId.length - 1])
        const id = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        setNotifications((prevValue) => {
            return [...prevValue, {
                id,
                ...notificationProps
            }]
        })
        let timer = setTimeout(() => {
            setNotifications((prevValue) => prevValue.filter((e) => e.id !== id))
        }, notificationProps.duration || 3000);
        timerId.current.push(timer)
    }

    const handleNotificationClose = (index) => {
        setNotifications((prevValue) => {
            const temp_notifications = [...prevValue]
            temp_notifications.splice(index, 1)
            return temp_notifications
        })
    }

    const NotificationComponent = (
        <div className={`notification-container ${position.split("-")[0]} notification-container--${position}`}>
        {
            notifications?.map((notification, index) => {
                return <Notification key={notification.id} {...notification} onClose={() => handleNotificationClose(index)} isActive={isActive}/>
            })
        }
        </div>
    )


    return { NotificationComponent, notify }
}

export default useNotification