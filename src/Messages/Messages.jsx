import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./messages.module.css";
import CommonNavbar from "../CommonNavbar/CommonNavbar";
import useFetch from "../useFetch";
import { UserContext, socket } from "../App";
import { members } from "../Context/MembersContext";
import { Messaging } from "../Context/MessagingContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Messages = () => {
  const {
    messagedUsers,
    setMessagedUsers,
    currentChat,
    setCurrentChat,
    handleDisplayChat,
    room,
    newChat,
    setNewChat,
    handleSearchMessagesUsers,
  } = useContext(Messaging);

  const { url, user } = useContext(UserContext);
  const { allMembers } = useContext(members);
  const [messageSent, setMessageSent] = useState();
  const [messageRecieved, setMessageRecieved] = useState();
  const underLastText = useRef();
  const chat = useRef();
  const sidebar = useRef();
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data);
    });
  }, [socket]);

   
  useEffect(() => {
    underLastText.current?.scrollIntoView({ behavior: "smooth" });
    if (window.matchMedia("(max-width: 768px)").matches && currentChat) {
      chat.current.style.display = "flex";
      sidebar.current.style.display = "none";
    }
  }, []);
  underLastText.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (currentChat && messageRecieved && room === messageRecieved.room) {
      setCurrentChat({
        ...currentChat,
        messages: [...currentChat.messages, messageRecieved],
      });
    }
  }, [messageRecieved]);

  const { post: sendMessage, data, error } = useFetch(`${url}/sendAMessage`);
  async function handleSendAMessage() {
    const newMessage = {
      senderId: user.username,
      recieverId: currentChat.username,
      timeSent: new Date(),
      message: btoa(messageSent),
    };

    sendMessage(newMessage);
    if (error) return alert("Error No Network");
    await socket.emit("send_message", { ...newMessage, room });

    setCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
    });
    setMessageSent("");
  }

  const search = (e) => {
    const value = e.target.value.toLowerCase();
    // setSearchText(value);
    handleSearchMessagesUsers(value, setMessagedUsers);
  };

  return (
    <div className={styles.messagesPage}>
      <div className="home-navbar">
        <CommonNavbar />
      </div>
      <div className={styles.container}>
        <div className={styles.sidebar} ref={sidebar}>
          <h2 className={styles.title}>Messages</h2>
          <input
            style={{ width: "100%" }}
            type="text"
            className="search"
            placeholder="Search"
            onChange={search}
          />
          <br />
          <br />
          {messagedUsers &&
            allMembers &&
            messagedUsers.map((user, index) => (
              <div
                key={index}
                className={styles.user}
                onClick={() => {
                  handleDisplayChat(user);
                  chat.current.style.display = "flex";
                  if (window.matchMedia("(max-width: 768px)").matches) {
                    sidebar.current.style.display = "none";
                  }
                }}
              >
                <img
                  src={`${
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
        <div className={styles.chat} ref={chat}>
          {currentChat && (
            <>
              <div className={styles.chatHeader}>
                <div className={styles.chatHeaderInfo}>
                  <ArrowBackIcon
                    className={styles.back}
                    style={{ paddingRight: "5px", fontSize: "2em" }}
                    onClick={() => {
                      chat.current.style.display = "none";
                      sidebar.current.style.display = "block";
                      setCurrentChat("")
                    }}
                  />
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
                    <div className={styles.messageText}>
                      {atob(msg.message) || msg.message}
                    </div>
                    <div ref={underLastText} />
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
    </div>
  );
};

export default Messages;
