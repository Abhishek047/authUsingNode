import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../../context/GlobalState'



const useStyles = makeStyles({
    btn:{
      textDecoration: 'none',
      color: 'white',
    }

});

function Desktop() {
    const { authorizion,  passUser, logOut} = useContext(GlobalContext);
    const style = useStyles();
    return (
        <div>
        {
        authorizion ? 
            (
            <>
                <Button color="inherit">Welcome {passUser.name}</Button> 
                <Button color="inherit" onClick={()=>{logOut()}} >LogOut</Button> 
            </> 
            ) :
            (
            <>
                <Button>
                    <Link to="/register" className={style.btn}>SignUp</Link>
                </Button>

                <Button>
                    <Link to="/login" className={style.btn}>Login</Link>
                </Button>
            </> 
            )
        }        
        </div>
    )
}

export default Desktop
