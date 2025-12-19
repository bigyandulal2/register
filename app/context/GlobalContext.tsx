"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface User {
  name: string;
  phone: string;
  email: string;
}

interface GlobalContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  email:string,
  setEmail:Dispatch<SetStateAction<string>>;
  otp:string,
  setOtp:Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // accessTOken for sending
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [email,setEmail]=useState<string>("");
  const [otp, setOtp] = useState<string>("");
 

  return (
    <GlobalContext.Provider value={{ user, setUser, accessToken, setAccessToken,email,setEmail,otp,setOtp }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};