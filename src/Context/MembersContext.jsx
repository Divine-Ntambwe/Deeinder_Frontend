import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import useFetch from '../useFetch'
import { UserContext } from '../App';
export const members = createContext()

function MembersContext({children}) {
   
    const {url,user} = useContext(UserContext)
    const { result,loading,get } = useFetch(
    `${url}/membersProfiles`
  );
  const [allMembers,setAllMembers] = useState(""),
  [exploreMembers,setExploreMembers] = useState("");
  


  useEffect(()=>{
    get((d)=>{
    setAllMembers([...d.filter((member)=>{return member.username !== user.username})])
    setExploreMembers([...d.filter((member)=>{return member.username !== user.username})])
    
    })
  },[])
  function handleGetSingleMember(username){
    if (allMembers) {
      return allMembers.find((person)=>{return person.username === username});
    }
  }

  function handleSearch(searchText,category){
    
    const searchedMembers =
      searchText === ""
        ? allMembers
        : allMembers.filter(
            (member) =>
              member.username.toLowerCase().includes(searchText) ||
              member.fullName.toLowerCase().includes(searchText)
          );
    category(searchedMembers)      
  }



  return (
    <members.Provider value={{allMembers,exploreMembers,loading,setExploreMembers,handleSearch,handleGetSingleMember}}>
        {children}
    </members.Provider>
  )
}

export default MembersContext