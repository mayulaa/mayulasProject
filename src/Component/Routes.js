import React, { Component } from 'react';
import {Redirect, Route} from "react-router-dom";
import jwt from "jwt-decode";

export const AuthRoute =({component: Component, ...rest})=>{
    console.log(rest);
    return <Route
    {...rest}
    render={(props)=>{
        const succesLogin=localStorage.getItem("login_Token")

        try{
            var decoded=jwt(succesLogin) 
            console.log(decoded);

            if(decoded.user){
                return <Redirect to ="/gallery" />
            }
            return <Component {...props} {...rest} />
    
            }
            catch(err){
             console.log(err);
            return <Component {...props} {...rest} />

            }
        
           }}
    />
}

export const PrivateRoute =({component: Component, ...rest})=>{
    return <Route
    {...rest}
    render={(props)=>{
        const succesLogin=localStorage.getItem("login_Token")

        try{
            var decoded=jwt(succesLogin) 
            console.log(decoded);
            if(decoded.user){
                return <Component {...props} {...rest} />
            }
            return <Redirect to="/login" />
            }
            catch(err){
             console.log(err);
             return <Redirect to ="/login" />
            }
        
    }}
    />
}
