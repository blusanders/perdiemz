import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../message/MessageProvider";
import "./Message.css";
import { useHistory } from "react-router-dom";

export const TourForm = () => {
    const { addMessage } = useContext(MessageContext);

    //set blank state message obj
    const [message, setMessage] = useState({
        userId: parseInt(sessionStorage.getItem("nutshell_user")),
        text: "",
        timestamp: ""
    });

    const history = useHistory();
    useEffect(() => {
    }, []);

    const handleControlledInputChange = (event) => {
        
        //make a copy
        const newMessage = { ...message };
        let selectedVal = event.target.value;
        newMessage[event.target.id] = selectedVal;
        newMessage.timestamp=Date.now()
        setMessage(newMessage);
    };

const handleClickSaveMessage = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form

    const text = message.text;
    console.log("text: " + text);
    if (text === "" ) {
        window.alert("Please enter a message");
    } else {
        console.log("Add Message: " + message.text + " " + message.timestamp);
        const newMessage = { ...message };
        setMessage(newMessage);  //make copy of state obj and add to json db
        addMessage(message)
        .then(setMessage({  //reset state obj as blank to zero out add form
            userId: parseInt(sessionStorage.getItem("nutshell_user")),
            text: "",
            timestamp: ""
        }))
    }
};

    return (
        <form className="messageForm">
            <fieldset>
            <div className="form-group">
                {/* <label htmlFor="text">New Message:</label> */}
                <textarea
                    type="text"
                    id="text"
                    onChange={handleControlledInputChange}
                    className="form-control"
                    placeholder="New Message"
                    value={message.text}
                />
            </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleClickSaveMessage}>
            Post
            </button>
        </form>
    );
    };
