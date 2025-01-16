import { createContext, useContext, useState } from "react";

export const AuthContext = createContext([]);
console.log("i am AuthContext")
export const useAuth = function () {return useContext(AuthContext)};
