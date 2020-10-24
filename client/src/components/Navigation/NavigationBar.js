import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Desktop from './Desktop'
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
    title:{
        flexGrow: 1,
    },
    btn:{
      textDecoration: 'none',
      color: 'white',
    }

});


function NavigationBar() {

    const style = useStyles();

    return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={style.title} >
            Anything
          </Typography>

            <Desktop />
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default NavigationBar
