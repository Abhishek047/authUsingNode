import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import {GlobalContext} from '../../context/GlobalState'

function DashBoard() {
    const { authorizion } = useContext(GlobalContext);
    const history = useHistory();

    useEffect(()=>{
        if(!authorizion)
        {   
            console.log(authorizion);
            history.push('/');
        }
    // eslint-disable-next-line
    },[authorizion]);

    return (
        <div>
        DashBoard            
        </div>
    )
}

export default DashBoard
