import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


interface AuthProps {
    children: React.ReactNode;
    authentication: Boolean;
}

interface RootState {
  auth: {
    status: boolean;
    userData: null | string[];
  };
}

const AuthLayout = ( { children, authentication = true } : AuthProps) => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state: RootState) => state.auth.status);
   
    useEffect(() => {
        if(authentication && authStatus !== authentication) {
            navigate("/login");
        }
        else if(!authentication && authStatus !== authentication) {
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, authentication, navigate])
  return (
    <div>
        { loader ? <p>Loading....</p> : children}
    </div>
  )
}

export default AuthLayout