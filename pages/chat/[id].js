import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import ChatScreen from '../../components/ChatScreen';
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { setRef } from "@mui/material";
// import { GetServerSideProps } from "next/types";

function Chat({messages,chat}) {
  // console.log(chat.id);
  const router=useRouter();
  const chatID=chat.id;
  const routerID=router.query.id;

  // console.log("ROUTER ID IS : ");
  // console.log(routerID);
  // console.log("CHAT ID IS : ");
  // console.log(chatID);

  const [user] = useAuthState(auth);

  // getDocs(db.collection("chats")).then((items)=>{
  //   items.docs.forEach((value)=>{
  //     value.data().users.map((item)=>{
  //       // if(item!=user.email){
  //         console.log(item);
  //     //}
  //     })
  //   })
  // })
  
  let otherUser ='';

  for(let i=0;i<chat.users.length;i++){
    if(chat.users[i]!=user.email){
    otherUser=chat.users[i];}
  }
  // console.log(otherUser);

  const childRef=useRef(null);

  //on every reload we will get to the latest message with the help of this useEffect....
  useEffect(()=>{
   childRef.current.scrollIntoView({
    behavior : "auto",
    block : "start",
   })
  },[])

  return (
    <Container>
        <Head>
          {/* we can display the title by any of the following... */}
            <title>Chat with {getRecipientEmail(chat.users,user)}</title>
            {/* <title>Chat with {otherUser}</title> */}
        </Head>
        <Star>
        <Sidebar />
        </Star>
     <ChatContainer>
      <ChatScreen forwardedref={childRef} messages={messages} chat={chat} users={chat.users}/>
     </ChatContainer>
    </Container>
  )
}

export default Chat;

export async function getServerSideProps(context){
  //we are saving the id in ref
  const ref = db.collection("chats").doc(context.query.id);
  //PREP THE MESSAGES ON THE SERVER

  //here we are going in the collection of messages inside the particular id saved in ref and
  //then we are ordering the latest messages by using timestamp in ascending order and then
  //saving it in messageRef
  const messageRef = await ref.collection("messages").orderBy("timestamp","asc").get();
  
  //here we are maping over each message to give it an id
  const messages = messageRef.docs.map((docs)=>({
    id:docs.id,
    ...docs.data(),
    //then we will further map into that message data and covert timestamp into date and time form
  })).map((messages)=>({
    ...messages,
     timestamp: messages.timestamp.toDate().getTime(),
  }))
  //PREP THE CHAT ON THE SERVER
  const chatRes = await ref.get();
 const chat = {
  id:chatRes.id,
  ...chatRes.data(),
 }
 
 return {
  props : {
    messages : JSON.stringify(messages),
    chat : chat,
  }
 }
}

const Container = styled.div`
display: flex;
`;

const ChatContainer = styled.div`
flex : 2;
overflow: scroll;
height: 100vh;

::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`;
const Star = styled.div`
flex: 1;
@media (max-width : 1120px){
    display : none; 
}
`;