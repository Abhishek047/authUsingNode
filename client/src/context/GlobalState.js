import React , { createContext , useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'


const initState = {
    isAuthorized: false,
    //FOR LOCAL STORAGE
    token: localStorage.getItem('token'),
    // token: '',
    user: {
        _id: '',
        name: '',
        email: '',
    },
    errorMsg:'',
}


export const  GlobalContext = createContext(initState);

export const GlobalProvider = ({children}) =>{

    const config={
            headers:{
                'Content-Type' : 'application/json'
            }
        }


//REDUCER CALLING 
const [state, dispatch] = useReducer(AppReducer, initState);

//WITH THE ABOVE STATE WE CAN ACCESS THE STATE HERE TOO

//WRITE FUNCTION TO PERFORM

    //REGISTER USER
    async function registerUser(newUser){
        try {
            const res = await axios.post('api/users' ,newUser, config);
            dispatch({
                type:'REG_USER',
                payload: res.data
            });   
        } catch (err) {
            dispatch({
                type: 'REG_ERROR',
                payload: err.response.data
            });
        }
    }


    //CHECK USER
    async function checkUser(credentials){
        try{
        //RESPONSE IF THE USER EXIST OR NOT
        const res = await axios.post('api/auth' ,credentials , config);
            dispatch({
                type:'LOG_IN_USER',
                payload: res.data
            });   
        } catch (err) {
            dispatch({
                type: 'LOG_IN_ERROR',
                payload: err.response.data
            });
        }
    }


    // //CLEAR ERROR
    function clearError(){
        dispatch({
            type:'CLEAR_ERROR'
        })
    }
    
    //LOGOUT

    function logOut(){
        dispatch({
            type: 'LOG_OUT'
        });
    }

    //AUTHENTICATE THE EXISTING USER

    async function getUser(){
        if(state.token)
            config.headers['x-auth-token'] = state.token;

        try {
            const res = await axios.get('api/auth/user', config);
            dispatch({
                type: 'USER_LOADED',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'LOAD_ERROR',
                payload: err.response.data
            });
        }
    }

    return(
        <GlobalContext.Provider
        value={{
            passUser: state.user, 
            authorizion: state.isAuthorized,
            errorMsg: state.errorMsg,
            registerUser,
            checkUser,
            clearError,
            getUser,
            logOut,
        }}
        >
            {children}
        </GlobalContext.Provider>
    )

}