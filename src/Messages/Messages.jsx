import React, { useContext, useEffect, useState,useRef } from "react";
import styles from "./messages.module.css";
import CommonNavbar from "../CommonNavbar/CommonNavbar";
import useFetch from "../useFetch";
import { UserContext,socket } from "../App";
import { members } from "../Context/MembersContext";
import { Messaging } from "../Context/MessagingContext";

const Messages = () => {
  const {messagedUsers,currentChat,setCurrentChat,handleDisplayChat,room,newChat,setNewChat} = useContext(Messaging)

  const { url, user } = useContext(UserContext);
  const { allMembers } = useContext(members);
  const [messageSent, setMessageSent] = useState();
  const [messageRecieved,setMessageRecieved] = useState();
  const underLastText = useRef()
  useEffect(()=>{
    socket.on("recieve_message",(data)=>{

        setMessageRecieved(data)
    })

    
  },[socket])
  useEffect(()=>{
        underLastText.current?.scrollIntoView({ behavior: "smooth" });
  },[])
   underLastText.current?.scrollIntoView({ behavior: "smooth" });
  
  useEffect(()=>{
  
  if (currentChat && messageRecieved && room === messageRecieved.room){
    setCurrentChat({
   ...currentChat,
   messages: [...currentChat.messages, messageRecieved],
  });
}

  


  },[messageRecieved])

  const {post:sendMessage} = useFetch(`${url}/sendAMessage`)
  async function handleSendAMessage() {
    const newMessage = {
      senderId: user.username,
      recieverId: currentChat.username,
      timeSent: new Date(),
      message: messageSent,
    };

    await socket.emit("send_message",{...newMessage,room})

    setCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
    });
    setMessageSent("");
    sendMessage(newMessage);
  }

  return (
    <>
      <div className="home-navbar">
        <CommonNavbar />
      </div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h2 className={styles.title}>Messages</h2>
          {/* <input className={styles.search} placeholder="Search..." /> */}
          {messagedUsers &&
            allMembers &&
            messagedUsers.map((user, index) => (
              <div
                key={index}
                className={styles.user}
                onClick={() => {
                  handleDisplayChat(user);
                }}
              >
                <img
                  src={`${url}/${
                    allMembers.find((member) => {
                      return member.username === user;
                    }).pfpPath
                  }`}
                  alt={user}
                  className={styles.userImage}
                />
                <span className={styles.userName}>{user}</span>
              </div>
            ))}
        </div>
        <div className={styles.chat}>
          {currentChat && (
            <>
              <div className={styles.chatHeader}>
                <div className={styles.chatHeaderInfo}>
                  <img
                    src={currentChat.pfp}
                    alt={currentChat.fullName}
                    className={styles.userImage}
                  />
                  <span className={styles.chatHeaderName}>
                    {currentChat.name}
                  </span>
                </div>
                <span className={styles.chatInfo}>i</span>
              </div>
              <div className={styles.chatMessages}>
                {currentChat.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${
                      msg.senderId === user.username
                        ? styles.userMessage
                        : styles.otherMessage
                    }`}
                  >
                    <div className={styles.messageText}>{msg.message}</div>
                    <div ref={underLastText}/>
                  </div>
                ))}
              </div>
              <div className={styles.chatInput}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="message..."
                  onChange={(e) => {
                    setMessageSent(e.target.value);
                  }}
                  value={messageSent}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendAMessage();
                  }}
                />
                <button
                  className={styles.sendButton}
                  onClick={handleSendAMessage}
                >
                  send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
