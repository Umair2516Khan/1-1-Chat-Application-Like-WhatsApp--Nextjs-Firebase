import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth , db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, FieldValue, getDocs, getFirestore, where } from 'firebase/firestore';
import { Avatar, ListItemSecondaryAction } from '@mui/material';
import { useRouter } from "next/router";
import { useState } from 'react';

function Chat({id,users}) {
  const [user] = useAuthState(auth);
   
  // const name = db.collection("users").where("email","===",getRecipientEmail(users,user));
    const router=useRouter(); 
    const [recipientSnapshot]=useCollection(db.collection("users").where("email","==",getRecipientEmail(users,user)));
    const recipientEmail=getRecipientEmail(users,user);
    // console.log(recipientEmail);
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    
    // const nameRef=db.collection("users").where("email","==",getRecipientEmail(users,user));
    // const dbb=getFirestore();
    const nameRef = db.collection('users');
    //getDocs is used to fetch data from the collection where we want to...
    let book=[];
    const [username,setusername] = useState(" ");
    getDocs(nameRef).then((items)=>{
     items.docs.forEach((docs)=>{
       book.push({...docs.data()})
      book.forEach((value)=>{
       if(value.email==recipientEmail){
          setusername(value.userName)
             }

      })
     })
    })
    // console.log(username);

    const ChatCreate=()=>{
     router.push(`/chat/${id}`);
    }

  return (
    <Container onClick={ChatCreate}>
      {recipient?
      (<UserAvatar src={recipient?.photoURL} sx={{"height":"60px","width":"60px"}}/>):
      (<UserAvatar sx={{"height":"60px","width":"60px"}}>{recipientEmail[0]}</UserAvatar>)}
    {/* <p>{recipientEmail}</p> */}
    <UserDetails>
      <p style={{"fontStyle":"italic","fontFamily":"cursive"}}>{recipientEmail}</p>
    <p style={{"marginTop":"-10px","fontFamily":"sans-serif","fontSize":"1.1em"}}>{username}</p>
    </UserDetails>
    </Container>
  )
}

export default Chat

const Container = styled.div`
display : flex;
z-index: 1;
align-items: center;
cursor: pointer;
padding : 15px;
word-break: break-word;

:hover{
    background-color: #e9eaeb;
}
`;
const UserAvatar = styled(Avatar)`
margin-right: 10px;
`;

const UserDetails = styled.div`
display: flex;
flex-direction: column;

`;
// const Pic = styled.image``;
