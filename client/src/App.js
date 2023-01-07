import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import SignIn from './pages/SignIn/index'
import Home from './pages/Home/index'
import SignUp from './pages/SignUp/index'
import { UserContext } from './userContext'
import { Navigate, useLocation } from 'react-router';
import userServices from './services/userServices';


const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<UserRequired alt="/signin"><Home /></UserRequired>} />
        <Route path="/signin" element={<UserRestricted alt="/"><SignIn /></UserRestricted>} />
        <Route path="/signup" element={<UserRestricted alt="/"><SignUp /></UserRestricted>} />
      </Routes>
    </UserProvider>

  );
}

const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState()

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
      setUser(localStorage.getItem("username"));
    }
  }, []);


  const login = (user) => (
    setUser(user)
  );

  const logout = (user) => {
    setUser(null)
  }

  const value = { user, login, logout }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const UserRequired = ({ alt, children }) => {
  const auth = useContext(UserContext)
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to={`${alt}`} state={location} replace />
  }

  return children
}

const UserRestricted = ({ alt, children }) => {
  const auth = useContext(UserContext) 
  const location = useLocation()

  if (auth.user && auth.user !== {}) {
    console.log(auth.user)
    return <Navigate to={`${alt}`} state={location} replace />
  }

  return children
}


export default App;
