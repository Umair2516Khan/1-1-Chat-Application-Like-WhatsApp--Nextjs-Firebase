import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
const Message=({message,user})=>{ 

  const [userLoggedIn]=useAuthState(auth);
  const TypeOfMsg=user==userLoggedIn.email?Sender: Receiver;
  const [state,setState]=useState(0);
  const ref=useRef(0);
  useEffect(()=>{
  ref.current=state;
  },[state])
return(
  
  <TypeOfMsg>
    {message.message}
    <Timestamp>{message.timestamp?(moment(message.timestamp).format("LT")):("...")}</Timestamp>
  </TypeOfMsg>
)
}
export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
width: fit-content;
position: relative;
min-width: 60px;
margin : 10px;
margin-top: 40px;
padding : 15px;
border-radius: 8px;
text-align: right;
padding-bottom: 26px;
`;

const Sender=styled(MessageElement)`
margin-left: auto;
background-color: #dcf8c6 ;
`;

const Receiver=styled(MessageElement)`
background-color:whitesmoke ;
text-align: left;
`;

const Timestamp = styled.span`
padding : 10px;
position: absolute;
bottom : 0px;
right: 0px;
font-size: 9px;
color: gray;
text-align: right;
`;
