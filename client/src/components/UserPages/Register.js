import React, { useState, useContext, useEffect } from 'react'
import {useHistory} from 'react-router-dom';
import {GlobalContext} from '../../context/GlobalState'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles( {

    container:{
        display: 'flex',
        flexFlow:'column',
        justifyContent: 'center',
        alignItems:'center',
        minWidth:200,
        maxWidth: '40%',
        borderRadius:5,
        boxShadow: '0px 0px 5px 5px rgba(1,1,1, 0.25)',
        margin: '50px auto'
    },
    title:{
        marginTop:25,
    },
    text:{
        width:'80%',
        margin:' 10px 0'
    },
    error:{
        width:'80%',
        margin:'10px 0',
    },
    btn:{
       margin: '20px 0', 
    }
});


function Register() {
    const style = useStyles();
    const { clearError, authorizion ,registerUser, errorMsg } = useContext(GlobalContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const onSubmit = () => {
        const newUser ={
            name,
            email,
            password
        }
        registerUser(newUser);
        }

    useEffect(()=>{
        if(authorizion){
            setName('');
            setEmail('');
            setPassword('');
        history.push('/dashboard');
        }
    // eslint-disable-next-line
    },[authorizion]);

    useEffect(()=>{
        if(errorMsg)
            clearError();
    // eslint-disable-next-line
    },[]);

    return (
        <>
            <Container className={style.container}>
                <Typography variant='h4' component='div' className={style.title} > 
                    Register
                </Typography>
      
                {errorMsg && (
                    <Alert className={style.error} severity='error' >  
                        {errorMsg}
                    </Alert>
                )}

                <TextField 
                className={style.text} 
                required 
                label='Name' 
                value={name}
                onChange={(e) => setName(e.target.value)}  
                placeholder='Enter Your Name' 
                />
                
                <TextField 
                className={style.text} 
                required  
                label='E-mail' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
                placeholder='Enter Your E-mail' 
                />
                
                <TextField 
                className={style.text} 
                required  
                type='password' 
                label='Password' 
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter Your Password' 
                />
                <Button className={style.btn} onClick={() => onSubmit()} >
                        Submit
               </Button>
  
            </Container>
        </>
    )
}

export default Register
