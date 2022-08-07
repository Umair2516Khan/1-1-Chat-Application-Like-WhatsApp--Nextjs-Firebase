import { Avatar, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MicIcon from '@mui/icons-material/Mic';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { addDoc, getDocs } from 'firebase/firestore';
import HomeIcon from '@mui/icons-material/Home';
import firebase from 'firebase/compat/app';
import Message from './Message';
import TimeAgo from "react-timeago";

function ChatScreen({users,messages,forwardedref}) {


  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input,setinput]=useState("");
  const [messagesRef]=useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp","asc"));
 //console.log("MESSAGEREF:")
  //console.log(messagesRef);

   const endOfMessageRef=useRef(null);

  const showMessages=()=>{
    // console.log("function working");
    if(messagesRef){
      // console.log("if statement working");
    return messagesRef.docs.map((message)=>(
        // console.log(message.data());
         <Message 
        key={message.id}
        user={message.data().user}
        message={
          {
            ...message.data(),
            timestamp:message.data().timestamp?.toDate().getTime(),
          }
        }
        />
    ))
    }
    else {
      console.log("ELSE STATEMENT WORKING");
      return JSON.parse(messages).map((message)=>(
        <Message
        key={message.id} user={message.user} message={message}
        />
      ))
    }
    };

  const [RecipientURL,setRecipientURL]=useState(" ");
  const [recipientLastSeen,setrecipientLastSeen]=useState(" ");
  const recipientEmail=getRecipientEmail(users,user);
  // console.log(recipientEmail);
getDocs(db.collection("users")).then((item)=>{
  item.docs.map((value)=>{
    if(value.data().email==recipientEmail){
    setRecipientURL(value.data().photoURL);
    setrecipientLastSeen(value.data().lastSeen.toDate());
  }
  })
});

// console.log(RecipientURL);
// console.log(recipientLastSeen);
 
const [recipientSnapshot]=useCollection(db.collection("users").where("email","==",recipientEmail));
const recipient=recipientSnapshot?.docs?.[0]?.data();

  // const [allusers,setallusers] = useState([]);

  // const [chatRef]=useCollection(db.collection("chats").where("users","array-contains",user.email));
  // const abc=chatRef?.docs.map((value)=>{
  //  return value.data().users;
  // })
  // console.log(allusers);
  // console.log(abc);
  // const recipientSnapshot=db.collection("users").where("email","==",getRecipientEmail(abc,user));
  // const [recipient]=useCollection(recipientSnapshot);

  
  
  //const recipientEmail=getRecipientEmail(users,user);
  //console.log(users);
    
  // const ScrollToBottom=()=>{
  //   endOfMessageRef.current
  // }

  // useEffect=(()=>{
  //   endOfMessageRef.current.scrollIntoView({
  //   behavor : "smooth",
  //   block : "start",
  //   })
  // },[Message]);

     const ScrollToNewestMessage=()=>{
      //ScrollIntoView() is a javascript function
       endOfMessageRef.current.scrollIntoView({
    behavor : "smooth",
    block : "start",
  });
}
  const sendMessage=(e)=>{
    //e.preventDefault() prevents from reloading 
    e.preventDefault();
   //updtaing the lastSeen(timestamp)
   db.collection("users").doc(user.uid).set({
      lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
   },{merge:true})

  //adding the message to the db
  db.collection("chats").doc(router.query.id).collection("messages").add({
    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    user : user.email,
    message:input,
    photoURL:user.photoURL,
  });
  
   setinput("");
   ScrollToNewestMessage();
  }

  // using this method so if there is big username so we can cut it upto 32 alphabets
  let recipientEmailE="";
  let recipientEmailEE="";
  let recipientEmailEEE="";

  for(let i=0;i<recipientEmail.length;i++){
    recipientEmailE=recipientEmailE+recipientEmail[i];
    if(i>24){
      recipientEmailE=recipientEmailE+".."
      break;}
  }
  
  for(let i=0;i<recipientEmail.length;i++){
    recipientEmailEE=recipientEmailEE+recipientEmail[i];
    if(i>18){
      recipientEmailEE=recipientEmailEE+".."
      break;}
  }

  for(let i=0;i<recipientEmail.length;i++){
    recipientEmailEEE=recipientEmailEEE+recipientEmail[i];
    if(i>13){
      recipientEmailEEE=recipientEmailEEE+".."
      break;}
  }
  // console.log(recipientEmailE);
//  console.log(recipientEmailEE);

  return (
    <Container>
     <Header>
      <Star>
        { recipient?
      (<UserAvatar sx={{"height":"53px","width":"55px"}} src={RecipientURL}/>):
      (<UserAvatar sx={{"height":"53px","width":"55px"}} >{recipientEmail[0]}</UserAvatar>)    
    }
      <HeaderInformation>
        <Header1>
      <h3 style={{"marginTop":"20px"}}>{recipientEmail}</h3>
      </Header1>
      
        <Header2>
      <h3 style={{"marginTop":"20px"}}>{recipientEmailE}</h3>
      </Header2>

      <Header3>
      <h3 style={{"marginTop":"20px"}}>{recipientEmailEE}</h3>
      </Header3>

      <Header4>
      <h3 style={{"marginTop":"20px"}}>{recipientEmailEEE}</h3>
      </Header4> 
      {/* {recipientSnapshot?(
      
      <p style={{"marginTop":"-3px","color":"gray"}}>Last active: {' '}
      
      {<TimeAgo date={recipientLastSeen}/>}
      </p>):(<p>Loading last active...</p>)
    } */}

    {recipientSnapshot?(
      <p style={{"marginBottom":"20px"}}>Last active : {recipient?.lastSeen?.toDate()?(<TimeAgo date={recipientLastSeen}/>):("Unavailable")}</p>
    ):(<p>Last active : Loading...</p>)}
      </HeaderInformation>
      </Star>
      <HeaderIcons>
      <IconButton title="BACK TO MENU">
          <HomeImg onClick={()=>{router.push('/')}} />
        </IconButton>
        <IconButton>
        <AttachFileImg />
        </IconButton>
        <IconButton>
          <MoreVertImg />
        </IconButton>
      </HeaderIcons>
     </Header>
     <MessageContainer>
      {showMessages()}
      <EndofMessage ref={endOfMessageRef}/>
      <EndofMessageOnReload ref={forwardedref}/>
      </MessageContainer>
      <InputContainer>
      <WhatsAppImg />
      <InputDiv value={input} placeholder="Type your message..." onChange={
        (e)=>{
          setinput(e.target.value)
        }
          }/>    
          <button hidden disabled={!input} type="submit" onClick={sendMessage}>SEND MESSAGE</button>
      <CameraImg />
      <MicImg />    
      </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div`

`;

const Header = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
position: sticky;
background-color: white;
top: 0;
z-index: 150;
padding: 11px;
border-bottom: 1px solid whitesmoke;
height: 80px;
`;

const UserAvatar = styled(Avatar)`
cursor: pointer;
margin-left: 15px;
`;

const HeaderInformation = styled.div`
margin-left: 15px;
>h3{
  @media (max-width: 341px) {
 display: none;
}
}
`;

const HeaderIcons=styled.div`
`;

const Star=styled.div`
display: flex;
align-items: center;
@media (max-width: 409px) {
 margin-left : -17px ;
}
`;

const MessageContainer=styled.div`
background-color: #e5ded8;
padding: 30px;
min-height: 90vh;
`;

const EndofMessage=styled.div`
margin-bottom: 75px;
`;

const EndofMessageOnReload=styled.div`
margin-bottom: 75px;
`;

const InputContainer=styled.form`
display: flex;
align-items: center;
padding : 10px;
background-color: white;
position:sticky;
bottom:0;
z-index: 100;
`;

const WhatsAppImg=styled(WhatsAppIcon)`

`;

const InputDiv=styled.input`
border:0;
outline : none;
flex: 1;
background-color:whitesmoke ;
color: black;
position: sticky;
bottom: 0px;
padding: 10px;
margin-left: 5px;
margin-right: 5px;
`;
const MicImg=styled(MicIcon)`
margin-right: 8px;
`;
const CameraImg=styled(CameraAltIcon)`
margin-left: 5px;
margin-right: 4px;
`;

const HomeImg=styled(HomeIcon)`
@media (max-width: 409px) {
 margin-right : -17px ;
}
`;

const AttachFileImg=styled(AttachFileIcon)`
@media (max-width: 440px) {
 display:none !important;
}
`;

const MoreVertImg=styled(MoreVertIcon)`
@media (max-width : 440px){
    display: none !important;
}
`;

const Header1=styled.div`
@media (max-width : 610px) {
  display: none !important;
}
`;

const Header2=styled.div`
display: none;
@media only screen and (max-width: 610px) and (min-width: 515px){
  display: block;
}
`;

const Header3=styled.div`
display: none;
@media (min-width: 357px) and (max-width:515px){
  display: block;
}
`;

const Header4=styled.div`
display: none;
@media (min-width: 270px) and (max-width:357px){
  display: block;
}
`;