import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, withTypes } from 'react-final-form';

import { useSelector, useDispatch } from 'react-redux';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';
import { Notification, useTranslate, useLogin, useNotify } from 'react-admin';
import { useLocation, useHistory } from 'react-router-dom';

import authProvider from '../authProvider';
import { loginUser, userSelector, clearState } from 'app/slice/userSlice';
import { lightTheme } from './themes';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background:
      'linear-gradient( #19005ee4, rgba(255,255,255,0.4)), url(https://source.unsplash.com/random/1600x900)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  card: {
    minWidth: 300,
    marginTop: '6em',
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  hint: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.grey[500],
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    marginTop: '1em',
  },
  actions: {
    padding: '0 1em 1em 1em',
  },
}));

const renderInput = ({
  meta: { touched, error } = { touched: false, error: undefined },
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

const { Form } = withTypes();

const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, isError, errorMessage } = useSelector(userSelector);

  const [loading, setLoading] = useState(false);

  const translate = useTranslate();
  const classes = useStyles();
  const notify = useNotify();
  const history = useHistory();

  useEffect(() => {
    /*  if (isError) {
        dispatch(clearState());
        // history.push('/login');
      } */
  }, [dispatch, history, isError]);

  const handleSubmit = auth => {
    // dispatch(clearState());
    setLoading(true);
    const username = { ...auth }.username;
    const fakeAuth = { username: 'fake@example.com', password: 'password1' };
    const pushLogin = () => {
      authProvider.login(auth);
    };
    dispatch(loginUser(auth));
    /*  login(
        auth,
        location.pathname,
        // location.state ? location.state.nextPathname : '/app/user',
      )
        .then(dataLogin => {
          const userPlane = localStorage.getItem('userPlane');
          if (!userPlane) {
            pushLogin();
            localStorage.setItem('userPlane', 'gold');
            history.push('/app/user/plane/');
            window.location.assign('/app/user/plane#/');
            return true;
          }
          pushLogin();
          //  if (localStorage.setItem('userPlane', username);
          history.push(location.pathname);
          window.location.assign(location.pathname);
        })
        .catch((error: Error) => {
          setLoading(false);
          notify(
            typeof error === 'string'
              ? error
              : typeof error === 'undefined' || !error.message
              ? 'ra.auth.sign_in_error'
              : error.message,
            'warning',
            {
              _:
                typeof error === 'string'
                  ? error
                  : error && error.message
                  ? error.message
                  : undefined,
            },
          );
        }); */
  };

  const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'richiesto' || translate('ra.validation.required');
    }
    if (!values.password) {
      errors.password = 'richiesto' || translate('ra.validation.required');
    }
    return errors;
  };
  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.main}>
            <Card className={classes.card}>
              <div className={classes.avatar}>
                <Avatar className={classes.icon}>
                  <LockIcon />
                </Avatar>
              </div>
              <div className={classes.hint}>Hint: demo / demo</div>
              <div className={classes.form}>
                <div className={classes.input}>
                  <Field
                    autoFocus
                    name="username"
                    // @ts-ignore
                    component={renderInput}
                    label={'User' || translate('ra.auth.username')}
                    disabled={isFetching}
                  />
                </div>
                <div className={classes.input}>
                  <Field
                    name="password"
                    // @ts-ignore
                    component={renderInput}
                    label={'password' || translate('ra.auth.password')}
                    type="password"
                    disabled={isFetching}
                  />
                </div>
              </div>
              <div
                style={{ displat: 'block', textAlign: 'center', color: 'red' }}
              >
                {isError && <p>{errorMessage}</p>}
                {isFetching && <p>loading</p>}
              </div>
              <CardActions className={classes.actions}>
                <div style={{ displat: 'block' }}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={isFetching}
                    fullWidth
                  >
                    {loading && <CircularProgress size={25} thickness={2} />}
                    {'login' || translate('ra.auth.sign_in')}
                  </Button>
                </div>
              </CardActions>
            </Card>
          </div>
        </form>
      )}
    />
  );
};

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = props => (
  <ThemeProvider theme={createMuiTheme(lightTheme)}>
    <Login {...props} />
  </ThemeProvider>
);

export default LoginWithTheme;
