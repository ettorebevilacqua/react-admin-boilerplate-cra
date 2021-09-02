import './config';
import { Axios } from '@data-provider/axios';
import { providers } from '@data-provider/core';

const loginProvider = new Axios({
  id: 'user/login',
  url: '/auth/login',
  tags: ['users'],
});

const userProvider = new Axios({
  id: 'user/get',
  url: '/users/:id',
  tags: ['users', 'need-auth'],
});

/* ConfiguserProvider.config({
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGVkNjBhMmI1YTcxMzY0MWEyNGU5NGUiLCJpYXQiOjE2MjY3NjYwODYsImV4cCI6MTYyNjc4MDQ4NiwidHlwZSI6ImFjY2VzcyJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGViMWIwN2Q2NzQ1ODY4NzA3ZGU1YTMiLCJpYXQiOjE2MjY3NjY0MDcsImV4cCI6MTYyNjc4MDgwNywidHlwZSI6ImFjY2VzcyJ9.QFuflzI1P02MDqsJslM3jHkYcpmGZOK59NtKVpaHQVQ',
  },
}); */
// const is401 = error => error && error.code && error.code === 401;
const getAuthHeader = token => ({
  headers: {
    Authorization: 'Bearer ' + token,
  },
});

export const authBear = token => {
  providers.getByTag('axios').config(getAuthHeader(token));
};

export const configWithAuth = data => {
  const token =
    data && data.tokens && data.tokens.access && data.tokens.access.token;
  // const idUser = data && data.user && data.user.id;
  authBear(token);
  return data;
};

const grabRequest = (prom, cb) =>
  new Promise((resolve, reject) =>
    prom
      .then(resp => resolve(cb ? cb(resp) : resp))
      .catch(
        error => reject(error),
        /*  error && error.code
            ? { code: error.code, message: error.message, auth: is401(error) }
            : { code: 0, message: error },
        ), */
      ),
  );

export const login = (user, password) =>
  grabRequest(
    loginProvider.create({
      email: user,
      password,
    }),
    configWithAuth,
  );

export const getUser = id => userProvider.query({ urlParams: { id } }).read();
/* .then(data => {
      console.log('user result', data);
    })
    .catch(error => {
      console.log('Reading user was rejected with error', error);
    });
    */

export const refreshToken = refreshToken =>
  new Axios({
    id: 'login',
    url: '/auth/refresh-tokens',
    tags: ['users', 'auth'],
  })
    .create({ refreshToken })
    .then(data => {
      console.log('token has Refresh', data);
    })
    .catch(error => {
      console.log('error on refresh token', error);
    });
