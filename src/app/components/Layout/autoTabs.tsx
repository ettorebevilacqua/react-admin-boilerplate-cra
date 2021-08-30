import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import { getParams, setParams, updateURL } from 'app/services/helper';

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
  const { key, tabs, onChange, visibles, ...rest } = props;
  const location = useLocation();
  const history = useHistory();
  const tabName = 'tabs' + (key || '');
  const currentTabState = (getParams(location, tabName) || '0') as string;
  const currentTabParse = parseInt(currentTabState[tabName]);
  const currentTab = isNaN(currentTabParse) ? 0 : currentTabParse;

  const [value, setValue] = React.useState(currentTab);

  const changeTab = (event, val) => {
    updateURL(history, { [tabName]: val }, tabName);
    onChange(val);
    setValue(val);
  };
  debugger;
  const classes = useStyles();
  return (
    <div className={classes.root} {...rest} style={{ marginTop: '14px' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={changeTab}
          aria-label="simple tabs example"
        >
          {tabs.map(
            (tab, idx) =>
              visibles[currentTab].indexOf(idx) > -1 && (
                <Tab key={idx} label={tab.label} {...a11yProps(idx)} />
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
