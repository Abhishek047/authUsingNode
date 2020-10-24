import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { GlobalContext } from '../../context/GlobalState'

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
    btn:{
       margin: '20px 0', 
    },
    error:{
        width:'80%',
        margin:'10px 0',
    },
});


function Login() {
    const {clearError, authorizion ,errorMsg, checkUser } = useContext(GlobalContext);
    const style = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(()=>{
        if(errorMsg)
            clearError();
        // eslint-disable-next-line
        },[]);

  useEffect(()=>{
        if(authorizion){
            setEmail('');
            setPassword('');
            history.push('/dashboard');
        }
    // eslint-disable-next-line
    },[authorizion])


    const onSubmit = (e) => {
        const credentials={
            email,
            password
        }
        checkUser(credentials);
    }

    return (
        <>
            <Container className={style.container}>
                <Typography 
                className={style.title}
                variant='h4' component='div' > 
                    LOGIN
                </Typography>

                {errorMsg && (
                    <Alert className={style.error} severity='error' >  
                        {errorMsg}
                    </Alert>
                )}

                <TextField 
                className={style.text} 
                required 
                label='E-mail' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
                placeholder='Enter Your E-mail' />
                <TextField 
                className={style.text} 
                required  
                type='password' 
                label='Password' 
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter Your Password' />
                <Button className={style.btn} onClick={() => onSubmit()} >
                        Submit
               </Button>
  
            </Container>
        </>
    )
}

export default Login
