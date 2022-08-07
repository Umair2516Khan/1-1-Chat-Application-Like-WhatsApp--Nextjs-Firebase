import { Circle } from 'better-react-spinkit';
import Image from "next/image";
import LoadingLogo from "../public/assets/LogoLoading.png"
function Loading() {
  return (
    <center style={{display : "grid", placeItems : "center",height : "100vh"}}>
        <div>
            <Image src={LoadingLogo}
            alt="loading" height="150" width="450"
            style={{marginBottom: 10,height:200}}
            />
            <Circle color="black" size={60}/>
        </div>
    </center>
  )
}

export default Loading