import React from "react";

const Notification = ({ message }) => {
    if (message === '') {
        return null;
    }
    
    return (
        <div className={message.includes('Error') ? 'error' : 'notification'}>
        {message}
        </div>
    );
    }

export default Notification