import styled from "styled-components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, IconButton } from "@mui/material";
import * as EmailValidator from 'email-validator';
import { auth , db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from './Chat';
import RecipientEmail from '../utils/getRecipientEmail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { createContext, useEffect, useState } from "react";
// import { addDoc } from "firebase/firestore";

const Sidebar = () => {
    const [user]=useAuthState(auth);
    //idhar hum yay kar rahay hein k hum querry set kar rahay hein jo k yay hai k chats ki
    // collection mai aisi koi email exist karti hai ya nhi jo user.email k barabar ho 
    const userChatRef = db.collection("chats").where('users','array-contains',user.email);
  //idhar wo querry useCollection hook mai send kardetay hein jo k eik boolean
  // value return karayga k querry true hai ya nhi  
    const [chatsSnapshot]=useCollection(userChatRef);
    


    const createChat = () =>{
        const input = prompt("ENTER AN EMAIL WITH WHICH YOU WANT TO CHAT");
    if (!input) return null;
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email){
        //here the chat will be entered into the db if doesn't already exist and is valid
        db.collection("chats").add({
            users : [user.email,input],
        }).then(()=>{alert("CHAT CREATED!!!")})
    }
}
    const chatAlreadyExists = (recipientEmail)=>{
        //here if the user already exists then this function will return ture value...
   return !! chatsSnapshot?.docs.find((chats)=>chats.data().users.find((user)=>user===recipientEmail)?.length > 0);}

const signOut = ()=>{
    auth.signOut();
    console.log("working");
}

   
  return (
    <Container>
        <Header >
            {/* <UseAvatar sx={{color : 'blue'}}/> */}
            {/* <UseAvatar sx={{fontSize : '35px'}}/> */}
            {/* <Button title="hiii"> */}
           {/* <Start> 
              <Star> */}
            <UserAvatar src={user.photoURL} sx={{"height":"58px","width":"60px"}} onClick={signOut} title="SIGN OUT"/>
            <p style={{"fontFamily":"cursive","fontWeight":"bolder","fontSize":"1.5rem","color":"#168E8C"}}>{user.displayName}</p>
            {/* <p>{user.email}</p>
            </Star>
            <SignOut sx={{fontSize : '35px'}} onClick={signOut} />
            </Start> */}
            {/* </Button> */}
            <IconContainer>
            <IconButton>
                <ChatIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
            </IconContainer>
        </Header>
        
        <Search>
            <SrchIcon />
            <SearchInput placeholder="Search chat"/>
        </Search>
        <SidebarSearch onClick={createChat}>
         Start a new chat
        </SidebarSearch>
        {/* LIST OF CHATS */}

        {/* yahan per chat ka component banay ga sirf tab agar wo chat already exist na kar rahi ho,
         isi liyay yahan per optical chainning bhi use hoti hai */}
        <SidebarSide>
        {chatsSnapshot?.docs.map((chat)=>(
            <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
        ))}
        </SidebarSide>
    </Container>
  );
}

export default Sidebar;

 
const Container = styled.div`
flex:0.5;
border: 1px solid whitesmoke;
height: 100vh;
overflow-y: scroll;
::-webkit-scrollbar{
    display: none;
}

//THIS IS FOR INTERNET EXPLORER AND MICROSOFT EDGE
-ms-overflow-style: none;

//THIS IS FOR FIREFORX
scrollbar-width: none;
`;
const Header = styled.div`
display: flex;
position: sticky;
top: 0;
z-index: 2;
justify-content: space-between;
align-items: center;
padding : 15px;
height: 80px;
border-bottom: 1px solid whitesmoke;
background-color: white;
>p{
    @media (max-width:415px) {
        font-size: 1rem;
    }
}
`;
// const SignOut = styled(ExitToAppIcon)`
// cursor: pointer;
// font-size: 35px;
// margin-left: 15px;
// :hover{
//     opacity: 0.6;
// }
// `;
const SrchIcon = styled(SearchIcon)`
cursor: pointer;
:hover{
    transform: scale(1.2,1.2);
    transition-duration: 10 sec;
}
`;
const IconContainer = styled.div``;
const Search=styled.div`
display: flex;
align-items: center;
padding : 20px;
`;
const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1;
`;
const SidebarSearch = styled(Button)`
width: 100%;
color: black;
&&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
}
`;
const UserAvatar = styled(Avatar)`
cursor: pointer;
margin-left: 15px;
height: 50px;
width: 50px;
:hover{
    opacity: 0.8;
}
`;

const SidebarSide=styled.div`
`;
// const Start = styled.div`
// display: flex;
// padding: 25px;
// `;
// const Star = styled.div`
// display: flex;
// flex-direction: column;
// `;