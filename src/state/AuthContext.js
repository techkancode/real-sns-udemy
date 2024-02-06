import React from 'react';
import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";

//最初のユーザー状態を定義
const initialState = {
    user : {
        _id : "65449b2c4a34fb7e6ced7d91",
        username : "kantacode",
        email : "kantacode@gmail.com",
        password : "abcdef",
        profilePicture : "/person/1.jpeg",
        coverPicture : "",
        followers : [],
        followings : [],
        isAdmin : false
    },
    isFetching : false,
    error : false
}

//状態をグローバルに管理する(グローバルコンテキスト)
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    return (
        <AuthContext.Provider
            value = {{
                user : state.user,
                isFetching : state.isFetching,
                error : state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}