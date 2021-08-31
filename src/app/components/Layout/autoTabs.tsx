import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import { getParams, updateURL } from 'app/services/helper';

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
  },
}));

export const getParamTab = (location, _tabsName) => {
  const currentTabState = (getParams(location, _tabsName) || '0') as string;
  const currentTabParse = parseInt(currentTabState[_tabsName]);
  return isNaN(currentTabParse) ? 0 : currentTabParse;
};

export const AutoTabs: React.FC<any> = (props): JSX.Element => {
  const { tabsName, tabs, value, onChange, visibles, ...rest } = props;
  const location = useLocation();
  const history = useHistory();
  const _tabsName = tabsName || 'tabs';

  const changeTab = val => {
    const currentTab = getParamTab(location, _tabsName);
    if (currentTab === val) return;
    updateURL(history, { [_tabsName]: val }, _tabsName);
    onChange && onChange(val);
  };

  React.useEffect(() => {
    const currentTab = getParamTab(location, _tabsName);
    if (value !== currentTab) {
      updateURL(history, { [_tabsName]: value }, _tabsName);
    }
  }, [value]);

  const classes = useStyles();
  return (
    <div className={classes.root} {...rest} style={{ marginTop: '14px' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={(event, val) => value !== val && changeTab(val)}
          aria-label="simple tabs example"
        >
          {tabs.map(
            (tab, idx) =>
              visibles[value].indexOf(idx) > -1 && (
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
