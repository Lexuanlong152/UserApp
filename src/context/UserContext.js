import  { useState, createContext } from "react";

const UserContext = createContext({email : '' , auth : false });

const UserProvider = ({children}) =>{
    const [user,setUser] = useState({email : '' , auth : false });
    const login = (email,token) => {
        localStorage.setItem("token", token);
        setUser((user) => ({
            email : email,
            auth :true
        }))
    }
    const logout = () => {
        localStorage.removeItem("token");
        setUser((user) => ({
            email: '',
            auth : false
        }))
    }   

    return ( 
        <UserContext.Provider value={{ user, login, logout}}>
            {children}
        </UserContext.Provider>
    )

}

export { UserContext ,UserProvider};