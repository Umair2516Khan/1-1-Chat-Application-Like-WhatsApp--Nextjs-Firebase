const getRecipientEmail = (users,userLoggedIn)=>{
    // console.log(users);
    // console.log(userLoggedIn.email);
    // console.log(users?.filter((value)=> (value !== userLoggedIn?.email))[0]);
     return users?.filter((value)=> (value !== userLoggedIn?.email))[0];
    }

export default getRecipientEmail;