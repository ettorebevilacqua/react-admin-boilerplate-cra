import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
// import Header from 'components/catalogo/layout/header';

import Logo from 'images/logo.png';

// context

const useStyles = makeStyles({
  card: {
    width: 220,
    height: 321,
    background: '#b0c2fd',
    border: '1px solid #0c1531',
    borderRadius: 5,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    boxShadow: '0 24px 36px rgba(131, 164, 163, .15)',
    transition: 'all 0.3s ease-out',
    textDecoration: 'none',
    margin: '15px',
    '&:hover': {
      border: '1px solid #88888;',
      background: '#dddddd',

      '& $overlay': {
        transform: 'scale(4) translateZ(0)',
      },
      '& $circle': {
        borderColor: '#051b17',
        background: props => bgColors[props.bgSelectorIndex].bgColor,
        '&:after': {
          background: '#126654',
        },
      },
      '& $p': {
        color: '#111',
      },
      transform: 'translateY(-5px) scale(1.025) translateZ(0)',
      boxShadow:
        '0 24px 36px rgba(0,0,0,0.11), 0 24px 46px rgba(220, 233, 255, 0.48)',
    },
    '&:active': {
      transform: 'scale(1) translateZ(0)',
      boxShadow:
        '0 15px 24px rgba(0,0,0,0.11),0 15px 24px rgba(220, 233, 255, 0.48)',
    },
  },

  circle: {
    width: 131,
    height: 131,
    borderRadius: '50%',
    background: '#e9dada',
    border: (props: any) => {
      const { bgColor } = bgColors[props.bgSelectorIndex];
      return `2px solid ${bgColor}`;
    },
    '& > svg': {
      zIndex: 10000,
      transform: 'translateZ(0)',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    transition: 'all 0.3s ease-out',
    '&:after': {
      content: '""',
      width: 118,
      height: 118,
      display: 'block',
      position: 'absolute',
      background: props => bgColors[props.bgSelectorIndex].bgColor,
      borderRadius: '50%',

      transition: 'opacity 0.3s ease-out',
    },
  },
  svg: {
    zIndex: 10000,
    transform: 'translateZ(0)',
  },
  overlay: {
    top: 80,
    left: 52,
    width: 116,
    height: 116,
    zIndex: 0,
    position: 'absolute',
    // background: props => bgColors[props.bgSelectorIndex].bgColor,
    transition: 'transform 0.3s ease-out',
    borderRadius: '50%',
  },
  cardContent: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  p: {
    fontSize: 17,
    color: '#4C5656',
    marginTop: 30,
    zIndex: 1000,
    transition: 'color 0.3s ease-out',
  },
  logoInner: {
    maxWidth: 400,
  },
});

const bgColors = [
  {
    //   bgColor: '#ffd861',
    //   bgColorLight: '#ffeeba',
    //   textColorHover: '#4C5656',
    //   boxShadowColor: 'rgba(255, 215, 97, 0.48)',
    bgColor: '#E6F4F1',
    bgColorLight: '#A9CEC2',
    textColorHover: '#4C5656',
    boxShadowColor: 'rgba(220, 233, 255, 0.48)',
  },
  {
    bgColor: '#E6F4F1',
    bgColorLight: '#A9CEC2',
    textColorHover: '#4C5656',
    boxShadowColor: 'rgba(220, 233, 255, 0.48)',
    // bgColor: '#B8F9D3',
    // bgColorLight: '#e2fced',
    // textColorHover: '#4C5656',
    // boxShadowColor: 'rgba(184, 249, 211, 0.48)',
  },
  {
    bgColor: '#E6F4F1',
    bgColorLight: '#A9CEC2',
    textColorHover: '#4C5656',
    boxShadowColor: 'rgba(220, 233, 255, 0.48)',
    // bgColor: '#CEB2FC',
    // bgColorLight: '#F0E7FF',
    // textColorHover: '#fff',
    // boxShadowColor: 'rgba(206, 178, 252, 0.48)',
  },
  {
    bgColor: '#E6F4F1',
    bgColorLight: '#A9CEC2',
    textColorHover: '#4C5656',
    boxShadowColor: 'rgba(220, 233, 255, 0.48)',
    // bgColor: '#DCE9FF',
    // bgColorLight: '#f1f7ff',
    // textColorHover: '#4C5656',
    // boxShadowColor: 'rgba(220, 233, 255, 0.48)',
  },
];
const svgs = [
  <svg key={0} width="60px" height="60px" viewBox="0 0 64 64">
    <g>
      <path d="m23 12h-2a4 4 0 0 0 -4 4v1.24a7.982 7.982 0 0 0 10 0v-1.24a4 4 0 0 0 -4-4z" />
      <path d="m16 23h12v8h-12z" />
      <path d="m16 51h8v4h-8z" />
      <path d="m28 51h8v4h-8z" />
      <path d="m40 51h8v4h-8z" />
      <g fill="#111">
        <path d="m52 10h-21.059a9 9 0 0 0 -17.882 0h-1.059a3 3 0 0 0 -3 3v46a3 3 0 0 0 3 3h40a3 3 0 0 0 3-3v-46a3 3 0 0 0 -3-3zm-30-6a6.992 6.992 0 0 1 5.849 10.835 5 5 0 0 0 -4.849-3.835h-2a5 5 0 0 0 -4.849 3.835 6.992 6.992 0 0 1 5.849-10.835zm4 12.736a6.961 6.961 0 0 1 -8 0v-.736a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3zm27 42.264a1 1 0 0 1 -1 1h-40a1 1 0 0 1 -1-1v-46a1 1 0 0 1 1-1h1.059a9 9 0 0 0 17.882 0h21.059a1 1 0 0 1 1 1z" />
        <path d="m25 8a3 3 0 1 0 -3 3 3 3 0 0 0 3-3zm-3 1a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" />
        <path d="m28 32h-12a1 1 0 0 1 -1-1v-8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1zm-11-2h10v-6h-10z" />
        <path d="m48 24h-14a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z" />
        <path d="m48 28h-14a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z" />
        <path d="m48 32h-14a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z" />
        <path d="m49 38h-33a1 1 0 0 1 0-2h33a1 1 0 0 1 0 2z" />
        <path d="m49 42h-33a1 1 0 0 1 0-2h33a1 1 0 0 1 0 2z" />
        <path d="m49 46h-33a1 1 0 0 1 0-2h33a1 1 0 0 1 0 2z" />
        <path d="m24 56h-8a1 1 0 0 1 -1-1v-4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1zm-7-2h6v-2h-6z" />
        <path d="m36 56h-8a1 1 0 0 1 -1-1v-4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1zm-7-2h6v-2h-6z" />
        <path d="m48 56h-8a1 1 0 0 1 -1-1v-4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1zm-7-2h6v-2h-6z" />
      </g>
    </g>
  </svg>,
  <svg
    key={1}
    height="60px"
    viewBox="0 0 481.83088 481"
    width="60px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m322.097656 322.359375c-7.578125 7.574219-15.796875 14.480469-24.5625 20.640625l131.121094 131.121094 45.199219-45.203125-131.117188-131.117188c-6.164062 8.761719-13.070312 16.980469-20.640625 24.558594zm0 0"
      fill="#111"
    />
    <g fill="#111">
      <path d="m288.175781 104.105469c-2.121093.003906-4.160156-.839844-5.65625-2.34375-40.292969-39.957031-101.992187-48.820313-151.902343-21.824219-3.878907 2.113281-8.742188.6875-10.855469-3.195312-2.117188-3.878907-.6875-8.738282 3.191406-10.855469 56.148437-30.351563 125.550781-20.375 170.878906 24.5625 2.289063 2.285156 2.972657 5.726562 1.734375 8.714843-1.238281 2.988282-4.15625 4.9375-7.390625 4.941407zm0 0" />
      <path d="m95.839844 104.105469c-3.238282.003906-6.164063-1.945313-7.402344-4.9375-1.242188-2.992188-.554688-6.441407 1.738281-8.726563 2.710938-2.707031 5.496094-5.28125 8.359375-7.730468 3.359375-2.871094 8.410156-2.476563 11.28125.882812 2.871094 3.355469 2.476563 8.40625-.878906 11.277344-2.542969 2.175781-5.023438 4.46875-7.441406 6.878906-1.496094 1.511719-3.53125 2.359375-5.65625 2.355469zm0 0" />
      <path d="m479.511719 423.238281-126.582031-126.558593c44.53125-68.707032 40.5625-158.101563-9.882813-222.59375-50.441406-64.492188-136.25-89.875-213.660156-63.203126-77.410157 26.671876-129.371094 99.519532-129.386719 181.398438-.171875 70.4375 38.304688 135.296875 100.210938 168.90625s137.257812 30.550781 196.238281-7.964844l126.527343 126.554688c3.125 3.121094 8.1875 3.121094 11.3125 0l45.199219-45.203125c3.125-3.121094 3.125-8.1875 0-11.308594zm-411.925781-106.542969c-65.929688-65.917968-69.015626-171.8125-7.039063-241.457031 61.976563-69.648437 167.511719-78.882812 240.640625-21.058593 73.132812 57.824218 88.484375 162.644531 35.003906 239.011718-11.804687 16.820313-26.445312 31.457032-43.261718 43.265625-69.910157 49.148438-165.058594 40.804688-225.34375-19.761719zm361.070312 146.113282-118.902344-118.90625c1.285156-1 2.503906-2.085938 3.765625-3.117188 1.082031-.890625 2.160157-1.769531 3.199219-2.679687 3.792969-3.25 7.503906-6.585938 11.011719-10.089844 3.503906-3.503906 6.839843-7.199219 10.085937-11.007813.914063-1.0625 1.792969-2.144531 2.679688-3.199218 1.03125-1.265625 2.121094-2.480469 3.121094-3.769532l118.925781 118.878907zm0 0" />
    </g>
  </svg>,
  <svg key={2} width="60px" height="60px" viewBox="0 0 64 64">
    <path
      d="m7 23 10-10h40v10h4v-10a4 4 0 0 0 -4-4h-23.892a4 4 0 0 1 -2.058-.57l-8.1-4.86a4 4 0 0 0 -2.058-.57h-13.892a4 4 0 0 0 -4 4v24h4z"
      fill="#111"
    />
    <path
      d="m57 23h-23.7a4 4 0 0 0 -2.353.765l-8.9 6.47a4 4 0 0 1 -2.347.765h-16.7v26a4 4 0 0 0 4 4h50a4 4 0 0 0 4-4v-34zm-15 32a13 13 0 1 1 13-13 13 13 0 0 1 -13 13z"
      fill="#111"
    />
    <path
      d="m42 55a13 13 0 1 0 -13-13 13 13 0 0 0 13 13zm-8-14a1 1 0 0 1 1-1h4a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 0 -1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1-1v-4a1 1 0 0 0 -1-1h-4a1 1 0 0 1 -1-1z"
      fill="#fff"
    />
    <g fill="#111">
      <path d="m57 8h-23.892a3.01 3.01 0 0 1 -1.544-.427l-8.1-4.861a5 5 0 0 0 -2.572-.712h-13.892a5.006 5.006 0 0 0 -5 5v50a5.006 5.006 0 0 0 5 5h50a5.006 5.006 0 0 0 5-5v-44a5.006 5.006 0 0 0 -5-5zm3 49a3 3 0 0 1 -3 3h-50a3 3 0 0 1 -3-3v-25h15.7a4.968 4.968 0 0 0 2.941-.957l8.9-6.469a2.981 2.981 0 0 1 1.759-.574h26.7zm-52-33h10v-10h38v8h-22.7a4.968 4.968 0 0 0 -2.941.957l-8.9 6.469a2.981 2.981 0 0 1 -1.759.574h-11.7zm1.414-2 6.586-6.586v6.586zm48.586 0v-10h-41.414l-10.586 10.586v7.414h-2v-23a3 3 0 0 1 3-3h13.892a3.01 3.01 0 0 1 1.544.427l8.1 4.861a5 5 0 0 0 2.572.712h23.892a3 3 0 0 1 3 3v9z" />
      <path d="m8 54h12v2h-12z" />
      <path d="m8 51h12v2h-12z" />
      <path d="m8 48h6v2h-6z" />
      <path d="m49 39h-4v-4a2 2 0 0 0 -2-2h-2a2 2 0 0 0 -2 2v4h-4a2 2 0 0 0 -2 2v2a2 2 0 0 0 2 2h4v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4h4a2 2 0 0 0 2-2v-2a2 2 0 0 0 -2-2zm0 4h-4a2 2 0 0 0 -2 2v4h-2v-4a2 2 0 0 0 -2-2h-4v-2h4a2 2 0 0 0 2-2v-4h2v4a2 2 0 0 0 2 2h4z" />
      <path d="m42 28a14 14 0 1 0 14 14 14.015 14.015 0 0 0 -14-14zm0 26a12 12 0 1 1 12-12 12.013 12.013 0 0 1 -12 12z" />
      <path d="m10 26h10v2h-10z" />
      <path d="m22 16h2v2h-2z" />
      <path d="m26 16h26v2h-26z" />
      <path d="m22 19h2v2h-2z" />
      <path d="m22 22h2v2h-2z" />
      <path d="m26 19h26v2h-26z" />
    </g>
  </svg>,
  <svg
    key={3}
    height="60px"
    viewBox="0 0 480 480.25828"
    width="60px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#111">
      <path d="m104.128906 440.257812c0-26.507812-21.488281-48-48-48-26.507812 0-48 21.492188-48 48v32h96zm0 0" />
      <path d="m88.128906 360.257812c0 17.671876-14.328125 32-32 32s-32-14.328124-32-32c0-17.671874 14.328125-32 32-32s32 14.328126 32 32zm0 0" />
      <path d="m104.128906 120.257812c0-26.507812-21.488281-48-48-48-26.507812 0-48 21.492188-48 48v32h96zm0 0" />
      <path d="m88.128906 40.257812c0 17.671876-14.328125 32-32 32s-32-14.328124-32-32c0-17.671874 14.328125-32 32-32s32 14.328126 32 32zm0 0" />
      <path d="m424.128906 392.257812c-26.507812 0-48 21.492188-48 48v32h96v-32c0-26.507812-21.488281-48-48-48zm0 0" />
      <path d="m456.128906 360.257812c0 17.671876-14.328125 32-32 32s-32-14.328124-32-32c0-17.671874 14.328125-32 32-32s32 14.328126 32 32zm0 0" />
      <path d="m424.128906 72.257812c-26.507812 0-48 21.492188-48 48v32h96v-32c0-26.507812-21.488281-48-48-48zm0 0" />
      <path d="m456.128906 40.257812c0 17.671876-14.328125 32-32 32s-32-14.328124-32-32c0-17.671874 14.328125-32 32-32s32 14.328126 32 32zm0 0" />
    </g>
    <path
      d="m81.898438 390.59375c12.851562-10.824219 17.566406-28.527344 11.804687-44.308594-5.761719-15.785156-20.773437-26.285156-37.574219-26.285156-16.800781 0-31.8125 10.5-37.574218 26.285156-5.761719 15.78125-1.046876 33.484375 11.804687 44.308594-18.554687 9.617188-30.210937 28.765625-30.230469 49.664062v40h112v-40c-.019531-20.898437-11.675781-40.046874-30.230468-49.664062zm-49.769532-30.335938c0-13.253906 10.746094-24 24-24s24 10.746094 24 24c0 13.253907-10.746094 24-24 24s-24-10.746093-24-24zm64 104h-80v-24c0-22.089843 17.910156-40 40-40s40 17.910157 40 40zm0 0"
      fill="#111"
    />
    <path
      d="m81.898438 70.59375c12.851562-10.824219 17.566406-28.527344 11.804687-44.308594-5.761719-15.785156-20.773437-26.285156-37.574219-26.285156-16.800781 0-31.8125 10.5-37.574218 26.285156-5.761719 15.78125-1.046876 33.484375 11.804687 44.308594-18.554687 9.617188-30.210937 28.765625-30.230469 49.664062v40h112v-40c-.019531-20.898437-11.675781-40.046874-30.230468-49.664062zm-49.769532-30.335938c0-13.253906 10.746094-24 24-24s24 10.746094 24 24c0 13.253907-10.746094 24-24 24s-24-10.746093-24-24zm64 104h-80v-24c0-22.089843 17.910156-40 40-40s40 17.910157 40 40zm0 0"
      fill="#111"
    />
    <path
      d="m449.898438 390.59375c12.851562-10.824219 17.566406-28.527344 11.804687-44.308594-5.761719-15.785156-20.773437-26.285156-37.574219-26.285156-16.800781 0-31.8125 10.5-37.574218 26.285156-5.761719 15.78125-1.046876 33.484375 11.804687 44.308594-18.554687 9.617188-30.210937 28.765625-30.230469 49.664062v40h112v-40c-.019531-20.898437-11.675781-40.046874-30.230468-49.664062zm-49.769532-30.335938c0-13.253906 10.746094-24 24-24s24 10.746094 24 24c0 13.253907-10.746094 24-24 24s-24-10.746093-24-24zm64 104h-80v-24c0-22.089843 17.910156-40 40-40s40 17.910157 40 40zm0 0"
      fill="#111"
    />
    <path
      d="m449.898438 70.59375c12.851562-10.824219 17.566406-28.527344 11.804687-44.308594-5.761719-15.785156-20.773437-26.285156-37.574219-26.285156-16.800781 0-31.8125 10.5-37.574218 26.285156-5.761719 15.78125-1.046876 33.484375 11.804687 44.308594-18.554687 9.617188-30.210937 28.765625-30.230469 49.664062v40h112v-40c-.019531-20.898437-11.675781-40.046874-30.230468-49.664062zm-49.769532-30.335938c0-13.253906 10.746094-24 24-24s24 10.746094 24 24c0 13.253907-10.746094 24-24 24s-24-10.746093-24-24zm64 104h-80v-24c0-22.089843 17.910156-40 40-40s40 17.910157 40 40zm0 0"
      fill="#111"
    />
    <path d="m48.128906 176.257812h16v128h-16zm0 0" fill="#111" />
    <path d="m416.128906 176.257812h16v128h-16zm0 0" fill="#111" />
    <path d="m128.128906 424.257812h224v16h-224zm0 0" fill="#111" />
    <path d="m128.128906 104.257812h224v16h-224zm0 0" fill="#111" />
  </svg>,
];

function SimpleCard(props) {
  const classes = useStyles(props);
  let Svg = svgs[props.bgSelectorIndex];
  const { item } = props;
  return (
    <Grid item>
      <div className={classes.card}>
        <div className={classes.overlay}></div>
        <div className={classes.circle}>{svgs[props.bgSelectorIndex]}</div>

        <Typography className={classes.p} style={{ textAlign: 'center' }}>
          {item.name}
        </Typography>
      </div>
    </Grid>
  );
}

const useTStyles = makeStyles({
  link: {
    textDecoration: 'unset',
  },
});

export default function AnalyticsCards(props) {
  const classes = useTStyles(props);

  return (
    <React.Fragment>
      <Box
        style={{
          maxWidth: 450,
          textAlign: 'center',
          margin: '20px auto',
          padding: 20,
        }}
      >
        {/* <img src={Logo} style={{ maxWidth: '100%' }} /> */}
      </Box>
      <Grid container item spacing={4} justify="center">
        {props.items.map((item, i) => {
          return (
            <Link key={i} to={item.link || ''} className={classes.link}>
              <SimpleCard bgSelectorIndex={i} item={item} />
            </Link>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
