import { useEffect, useRef, useState } from "react"
import "./Notification.css"

const typeMapper = {
    success : "✔",
    info : "❕",
    error : "🚫",
    warning : "⚠"
}

const animationMapper = {
    slide : "slideIn",
    pop : "popUp",
    fade : "fadeIn"
}

const Notification = ({type="success", message = "", animation = "slide", onClose = () => {}}) => {
    const closeButtonRef = useRef(null)

    useEffect(() => {
        if(closeButtonRef.current) closeButtonRef.current.focus()
    },[onClose])


    return <div 
    tabIndex={-1} 
    ref={closeButtonRef}
    className={`notification notification__${type} ${`notification__${animationMapper[animation]}`}`} 
    role={type === "error" || "warning" ? "alert" : "status"} 
    aria-live={type === "error" || "warning" ? "assertive" : "polite"}
    >
        <span className="notification__icon-type">{typeMapper[type]}</span>
        {message}
        <button className="notification__close-btn" onClick={() => {
            onClose()
        }}>❌</button>
    </div>
}

export default Notification