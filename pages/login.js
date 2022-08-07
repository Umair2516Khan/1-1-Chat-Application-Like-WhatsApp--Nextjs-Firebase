import styled from 'styled-components';
import Head from 'next/head';
import { Button } from '@mui/material';
import { auth , provider } from '../firebase';
import Image from 'next/image';
import GoogleLogo from '../public/assets/GoogleLogo.png';
import FirebaseLogo from '../public/assets/FirebaseLogo.png';
import NextjsLogo from '../public/assets/NextJsLogo.png';
import StyledComponentsLogo from '../public/assets/StyledComponentsLogo.png';
import ReactjsLogo from '../public/assets/ReactjsLogo.jpg';
import WhatsappLogo from '../public/assets/WhatsappLogo.png';

function Login() {
    const signIn=()=>{
        auth.signInWithPopup(provider).catch(alert);
        console.log("sign in also working");
    }
  return (
    <Container>
        <Head>
            <title>Login</title>
        </Head>
        <LoginContainer>
            <Logo><Image src={WhatsappLogo} alt="Whatsapp Logo" height="190" width="210"/></Logo>
            <Btn>
            <Button sx={{color:"black","fontSize":"1.6em"}} variant="outlined" onClick={signIn}>SIGN IN WITH GOOGLE 
            <Image src={GoogleLogo} alt='GoogleLogo' height='40' width='40'/></Button>
            </Btn>
            <Developer>Developed By UMAIR KHAN</Developer>
            <p> </p>
                <br></br>
            <Tech >
                <Img1><Image src={ReactjsLogo} alt="Reactjs Logo" height="90" width="80" /></Img1>
                <Img2><Image src={NextjsLogo} alt="Nextjs Logo" height="50" width="100"/></Img2>
                <Img3><Image src={FirebaseLogo} alt="Firebase Logo" height="40" width="120"/></Img3>
                <Img4><Image src={StyledComponentsLogo} alt="Styled components Logo" height="90" width="100" /></Img4>
            </Tech>
        </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
display: grid;
place-items:center;
height: 100vh;
background-color: whitesmoke;

`;
const LoginContainer = styled.div`
display: flex;
flex-direction: column;
height : 40rem;
width: 28rem;
/* padding : 100px; */
background-color: white;
border-radius: 5px;
box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
position: relative;

>p{
    margin-top: 5em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    /* font-weight: bold; */
    font-size: 1.7em;
    /* padding-top:2em; */
    padding-left: 1.8em;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    color: white;
    background-color: green;
    /* background-clip: content-box; */
}
`;
const Logo = styled.div`
height: 170px;
width: 170px;
margin-top: 0.5rem;
margin-left: 8.5rem;
`;

const Developer = styled.div`
margin-top: 3rem;
font-size: 2em;
font-style: italic;
font-weight: bolder;
font-family: Arial, Helvetica, sans-serif;
color: #1B5B52;
/* margin-bottom:2em; */
/* padding-top: 2em; */
position: absolute;
top: 22rem;
right: 0.5em;
`;
const Btn=styled.div`
margin-left:2.5rem ;
margin-top: 5rem;
`;

const Tech=styled.div`
position: absolute;
bottom: 0px;
display: flex;
`;

const Img1=styled.div`
margin: 5px;
margin-bottom: 2em;
`;

const Img2=styled.div`
margin: 5px;
margin-bottom: 2em;
`;

const Img3=styled.div`
margin: 5px;
margin-bottom: 2em;
`;

const Img4=styled.div`
margin: 5px;
margin-bottom: 2em;
`;