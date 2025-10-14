import React,{useEffect,useState,useContext} from 'react'
import { createContext } from 'react'
import { UserContext,socket } from '../App';
import useFetch from '../useFetch';
import { members } from './MembersContext';
export const Messaging = createContext();
function MessagingContext({children}) {
  const { url, user } = useContext(UserContext);
  const { get: getMessages } = useFetch(`${url}/messages/${user.username}`);
  const [allMessages, setAllMessages] = useState();
  const [messagedUsers, setMessagedUsers] = useState();
  const { allMembers } = useContext(members);
  const [currentChat, setCurrentChat] = useState("");
  const [newChat,setNewChat] = useState("")

     useEffect(() => {
        getMessages((d) => {
          setAllMessages(d);
          let users = [];
          d.forEach((m) => {
            users.push(m.senderId, m.recieverId);
          });
          users = users.filter((name) => {
            return name !== user.username;
          });
          setMessagedUsers([...new Set(users)]);
        
        });
      }, [currentChat,newChat]);
    

    const [room,setRoom] = useState()  

    function handleDisplayChat(reciever) {
    const messages = allMessages.filter((message) => {
      return message.recieverId === reciever || message.senderId === reciever;
    });
    const member = allMembers.find((member) => {
      return member.username === reciever;
    });

    const roomId = [reciever,user.username].sort().join("-");

    setRoom(roomId);
    socket.emit("join_room",roomId)
    
    setCurrentChat({
      pfp: `${member.pfpPath}`,
      name: member.fullName,
      username: member.username,
      messages,
    });

  }
  return (
    <div>
        <Messaging.Provider value={{handleDisplayChat,allMessages,messagedUsers,currentChat,setCurrentChat,room,newChat,setNewChat}}>

        {children}
        </Messaging.Provider>
    </div>
  )
}

export default MessagingContext