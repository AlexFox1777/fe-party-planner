import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import {ActionsContext} from '../contexts/ActionsContext';
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    flexDirection: 'column'
  },
  formShow: {
    backgroundColor: '#FEA47F',
    opacity: '0.7'
  }
}));

const CoolForm = styled.form`
  text-align: center;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 4px;
  width: 480px;
  display: flex;
  flex-direction: column;
`;

const CoolButton = styled.button`
  font-weight: bold;
  margin: 20px;
  padding: 5px 20px;
  border-radius: 6px;
`;

function Login(props) {
  const classes=useStyles();
  const isAuth = useSelector(state => state.auth.isAuth);
  const [user, setUser] = useState({username: '', password: ''});
  const [isRegister, setIsRegister] = useState(false);
  const {authActions: {login, register, welcomeBack, logout}} = useContext(
      ActionsContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const {exp} = jwt_decode(JSON.parse(localStorage.getItem('token')));
      const currentDate = Date.now() / 1000;
      exp > currentDate ? welcomeBack() : logout();
    }
  }, []);

  useEffect(() => {
    isAuth && props.history.push('/dashboard');
  }, [isAuth]);

  useEffect(() => {
    if (props.location.pathname === '/') {
      setIsRegister(false);
    } else if (props.location.pathname === '/register') {
      setIsRegister(true);
    }
  }, [props.location.pathname]);

  const handleChange = event => {
    console.log(user, 'userbefore');
    setUser({...user, [event.target.name]: event.target.value});
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (isRegister) {
      register(user);
    } else {
      login(user);
    }
  };

  return (
      <div className={classes.container}>
        {console.log(user, 'userafter')}
        <Typography component='h1'>{isRegister ? 'Register' : 'Login'}</Typography>
        <CoolForm onSubmit={event => handleSubmit(event)} className={classes.formShow}>
          <TextField id='username' name='username' value={user.username}
                     onChange={handleChange} label='Username' margin='normal'
                     variant='filled'/>
          <TextField id='password' name='password' type='password'
                     value={user.password} onChange={handleChange}
                     label='Password' margin='normal' variant='filled'/>
          {/*<label>*/}
          {/*  Username:*/}
          {/*  <input*/}
          {/*      type="text"*/}
          {/*      name="username"*/}
          {/*      value={user.username}*/}
          {/*      onChange={event => handleChange(event)}*/}
          {/*  />*/}
          {/*</label>*/}
          {/*<label>*/}
          {/*  Password:*/}
          {/*  <input*/}
          {/*      type="text"*/}
          {/*      name="password"*/}
          {/*      value={user.password}*/}
          {/*      onChange={event => handleChange(event)}*/}
          {/*  />*/}
          {/*</label>*/}
          <Button color='primary' type='submit'>{isRegister ? 'Register' : 'Login'}</Button>
          {/*<CoolButton>{isRegister ? 'Register' : 'Login'}</CoolButton>*/}
        </CoolForm>
      </div>
  );
}

export default Login;
