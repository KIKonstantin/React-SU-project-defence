import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Profile(){
    // TODO: send get request to all _owner: favorite books and added comments
    // TODO: send a put request to users profile
    const { onProfile } = useAuthContext();
    useEffect(() => {
        onProfile();
    }, [onProfile]);
    return(
        <h1 style={{color:'white',fontSize:'3rem'}}>My PROFILE</h1>
    )
}