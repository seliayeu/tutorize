import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import SignIn from './pages/SignIn/index'
import Home from './pages/Home/index'
import SignUp from './pages/SignUp/index'
import { AuthContext } from './userContext'
import { Navigate, useLocation } from 'react-router';
// import userServices from './services/userServices';


const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthRequired alt="/signin"><Home /></AuthRequired>} />
        <Route path="/signin" element={<AuthRestricted alt="/"><SignIn /></AuthRestricted>} />
        <Route path="/signup" element={<AuthRestricted alt="/"><SignUp /></AuthRestricted>} />
      </Routes>
    </AuthProvider>

  );
}

const AuthProvider = ({ children }) => {
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const AuthRequired = ({ alt, children }) => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to={`${alt}`} state={location} replace />
  }

  return children
}

const AuthRestricted = ({ alt, children }) => {
  const auth = useContext(AuthContext) 
  const location = useLocation()

  if (auth.user && auth.user !== {}) {
    console.log(auth.user)
    return <Navigate to={`${alt}`} state={location} replace />
  }

  return children
}


export default App;
