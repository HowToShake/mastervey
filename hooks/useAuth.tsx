import { useContext } from "react";
import AuthContext, { ContextState } from "../context/AuthContext";

export const useAuth = (): ContextState => useContext(AuthContext);
