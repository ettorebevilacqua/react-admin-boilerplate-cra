import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

// styles
import useStyles from './styles';

import MenuCard from '../../menuCard';
import { Helmet } from 'react-helmet-async';

const data = [
  {
    name: 'Apri una nuova indagine',
    link: '/app/user/indagini',
  },
  {
    name: 'Indagini aperte',
    link: '/app/user/indagini/list',
    hardLink: false,
  },
  {
    name: 'Genera repost annuale',
    link: '/app/user/repoAnno',
  },
];

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function IndaginiMenu() {
  const classes = useStyles();
  const [menu, setMenu] = useState(data);

  useEffect(() => {
    // const params = queryString.parse(props.location.search);

    const AddLink = {
      name: 'Crea Indagine',
      link: '/app/user/moduli',
      hardLink: false,
    };

    // 'isAdmin' in params && setMenu([AddLink, ...data]);
    setMenu([AddLink, ...data]);
  }, []);

  /* const commonStyle = {
    background: 'rgb(173 182 235)',
    height: '120px',
    width: '75%',
    marginTop: '26px',
    marginLeft: '15%',
    paddind: '8px',
  }; */

  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div className={classes.root}>
        <MenuCard items={menu} />
      </div>
    </>
  );
}

export default withRouter(IndaginiMenu);
