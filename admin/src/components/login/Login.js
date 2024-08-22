import { TextField } from '@mui/material';
import React from 'react';

const Login = () => {
    return (
        <div>
            아이디 <TextField placeholder='id'></TextField>
            비밀번호 <TextField type='password' placeholder='password'></TextField>
        </div>
    );
};

export default Login;