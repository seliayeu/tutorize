import { createContext } from "react"

export const UserContext = createContext({ 
  user: {},
  login: () => null,
  logout: () => null,
});