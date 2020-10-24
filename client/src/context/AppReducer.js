export default(state ,action) =>{

    switch(action.type){
        case 'REG_ERROR':
        case 'LOG_IN_ERROR':
        localStorage.removeItem('token');
            return{
                ...state,
                user:{
                    _id: null,
                    email: null,
                    name: null
                },
                token: null,
                isAuthorized: false,
                errorMsg: action.payload.msg
            }
        case 'LOG_OUT':
            localStorage.removeItem('token');     
            return{
                ...state,
                user:{
                    _id: null,
                    email: null,
                    name: null
                },
                token: null,
                isAuthorized: false,
                errorMsg: null,
            }
        case 'USER_LOADED':
            return{
                ...state,
                user: {
                       _id: action.payload.id,
                       email: action.payload.email,        
                       name: action.payload.name
                },
                isAuthorized: true,
                errorMsg: null
            }
        case 'REG_USER':
        case 'LOG_IN_USER':
        localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                user: {
                       _id: action.payload.id,
                       email: action.payload.email,        
                       name: action.payload.name
                },
                token: action.payload.token,
                isAuthorized: true,
                errorMsg: null
            }
        case 'CLEAR_ERROR':
            return{
                ...state,
                errorMsg: null
            }
        default: 
        return{
            ...state
        }
    }
}