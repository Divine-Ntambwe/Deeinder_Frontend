import React, { useContext, useEffect, useState } from "react";
import styles from "./connections.module.css";
import { UserContext } from "../App";
import useFetch from "../useFetch";
import { members } from "../Context/MembersContext";
import CommonNavbar from "../CommonNavbar/CommonNavbar";
import { useNavigate } from "react-router-dom";
import { Messaging } from "../Context/MessagingContext";

const ConnectionRequestItem = ({ name, button1, button2, img, functions }) => (
  <div className={styles.requestItem}>
    <img src={img} alt="Profile" className={styles.profileImg} />
    <span className={styles.name}>{name}</span>
    <div className={styles.buttons}>
      <button
        onClick={button1 === "Message" ? functions[0] : functions[1]}
        className={`${styles.btn} ${button1 === "Pending" ? styles.disabled : ""}`}
      >
        {button1}
      </button>
      <button
        onClick={button2 === "Remove" ? functions[3] : button2 === "Remove Request"?functions[4]:functions[2]}
        className={`${styles.btn} ${button2 === "Pending" ? styles.disabled : ""}`}
      >
        {button2}
      </button>
    </div>
  </div>
);

const ConnectionRequests = () => {
  const { user, url } = useContext(UserContext);
  const nav = useNavigate();
  const { get } = useFetch(`${url}/connectionRequests/${user.username}`);
  const { allMembers } = useContext(members);
  const { put } = useFetch(`${url}/acceptedConnectionRequest/${user.username}`);
  const { deleteAPI: removeRequest } = useFetch(
    `${url}/removeConnectionRequest`
  );
  const { deleteAPI: cancelRequest } = useFetch(
    `${url}/cancelConnectionRequest`
  );
  const {handleDisplayChat} = useContext(Messaging)
  

  function handleGoToMessage(member) {
    nav("/messages");
    handleDisplayChat(member)

  }

  function handleRemoveConnectionRecieved(senderUsername) {
    removeRequest({ senderUsername, recieverUsername: user.username }, () => {
      setFetch(fetch + 1);
    });
  }

  function handleRemoveConnectionSent(recieverUsername) {
    console.log("IIIII")
    removeRequest({ senderUsername:user.username, recieverUsername }, () => {
      setFetch(fetch + 1);
    });
  }

  function handleAcceptConnection(senderUsername) {
    console.log(user.username)
    put({ senderUsername }, () => { 
      setFetch(fetch + 1);
    });
  }

  function handleCancelRequest(recieverUsername) {
    cancelRequest({ senderUsername:user.username, recieverUsername }, () => {
      setFetch(fetch + 1);
    });
  }

  function handleRemoveRequest(senderUsername){
    cancelRequest({ senderUsername, recieverUsername:user.username }, () => {
      setFetch(fetch + 1);
    });
  }

  const [connections, setConnections] = useState();
  const [fetch, setFetch] = useState(1);
  useEffect(() => {
    get((d) => {
      setConnections(d);
    });
  }, [fetch]);

  return (
    <>
      <div className="home-navbar">
        <CommonNavbar />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Connection Requests</h1>
        {/* <div className={styles.header}>
          <div className={styles.tabs}>
            All | Accepted requests | Unaccepted requests | Pending
          </div>
          <input type="text" className={styles.search} placeholder="Search" />
        </div> */}
        <div className={styles.requestsList}>
          {connections &&
            allMembers &&
            connections.map((connection) => (
              <>
                {connection.senderUsername === user.username && (
                  <ConnectionRequestItem
                    key={connection._id}
                    name={connection.recieverUsername}
                    functions={[
                      ()=>{handleGoToMessage(connection.recieverUsername)},
                      () => {
                        handleAcceptConnection(connection.senderUsername);
                      },
                      () => {
                        handleCancelRequest(connection.recieverUsername);
                      },
                      () => {
                        handleRemoveConnectionSent(
                          connection.recieverUsername
                        );
                      },
                      ()=>{
                        handleRemoveRequest(connection.senderUsername)
                      }
                    ]}
                    button1={connection.hasAccepted ? "Message" : "Pending"}
                    button2={
                      connection.hasAccepted ? "Remove" : "Cancel Request"
                    }
                    img={`${
                      allMembers.find((person) => {
                        return person.username === connection.recieverUsername;
                      }).pfpPath
                    }`}
                  />
                )}
                {connection.recieverUsername === user.username && (
                  <ConnectionRequestItem
                    key={connection._id}
                    name={connection.senderUsername}
                    functions={[
                      ()=>{handleGoToMessage(connection.senderUsername)},
                      () => {
                        handleAcceptConnection(connection.senderUsername);
                      },
                      () => {
                        handleCancelRequest(connection.recieverUsername);
                      },
                      () => {
                        handleRemoveConnectionRecieved(connection.senderUsername);
                      },
                      ()=>{
                        handleRemoveRequest(connection.senderUsername)
                      }
                    ]}
                    button1={connection.hasAccepted ? "Message" : "Accept"}
                    button2={
                      connection.hasAccepted ? "Remove" : "Remove Request"
                    }
                    img={`${
                      allMembers.find((person) => {
                        return person.username === connection.senderUsername;
                      }).pfpPath
                    }`}
                  />
                )}
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default ConnectionRequests;
