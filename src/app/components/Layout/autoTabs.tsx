import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

// const moduliProvider = moduliProvider;
export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const AutoTabs: React.FC<any> = (props): JSX.Element => {
  const { tabs, onChange, value, visibles, ...rest } = props;
  const classes = useStyles();
  return (
    <div className={classes.root} {...rest} style={{ marginTop: '14px' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={onChange}
          aria-label="simple tabs example"
        >
          {tabs.map(
            (tab, idx) =>
              visibles[value].indexOf(idx) > -1 && (
                <Tab label={tab.label} {...a11yProps(idx)} />
              ),
          )}
        </Tabs>
      </AppBar>
      {tabs.map((tab, idx) => (
        <TabPanel key={idx} value={value} index={idx}>
          {tab.comp()}
        </TabPanel>
      ))}
    </div>
  );
};
