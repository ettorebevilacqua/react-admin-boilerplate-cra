import React, { useState } from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {
  Root,
  getHeader,
  getDrawerSidebar,
  getSidebarTrigger,
  getSidebarContent,
  getCollapseBtn,
  getContent,
  getFooter,
} from '@mui-treasury/layout';
import {
  getDefaultScheme,
  getStandardScheme,
  getFixedScheme,
  getContentBasedScheme,
  getCozyScheme,
  getMuiTreasuryScheme,
} from '@mui-treasury/layout/presets';

import NavContentEx from './components/NavContentEx';
import NavHeaderEx from './components/NavHeaderEx';
import HeaderEx from './components/HeaderEx';
import ContentForm from './components/ContentForm';
import ContentEx from './components/ContentEx';
import FooterEx from './components/FooterEx';

import './styles.css';

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const SidebarContent = getSidebarContent(styled);
const CollapseBtn = getCollapseBtn(styled);
const Content = getContent(styled);
const Footer = getFooter(styled);

const presets = {
  createDefaultLayout: getDefaultScheme(),
  createStandardLayout: getStandardScheme(),
  createFixedLayout: getFixedScheme(),
  createContentBasedLayout: getContentBasedScheme(),
  createCozyLayout: getCozyScheme(),
  createMuiTreasuryLayout: getMuiTreasuryScheme(),
};
const FormContent = ({ data, preset, setPreset, setLoading, setData }) => (
  <ContentForm
    preset={preset}
    onChangePreset={val => {
      setLoading(true);
      setPreset(val);
      setTimeout(() => setLoading(false), 500);
    }}
    data={data}
    onChangeData={setData}
  />
);

export function LayoutForms({ content }) {
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState('createStandardLayout');
  const [data, setData] = useState({
    header: true,
    nav: true,
    content: true,
    footer: true,
  });
  return loading ? (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant={'h2'}>Changing Preset...</Typography>
    </div>
  ) : (
    <StylesProvider injectFirst>
      <CssBaseline />
      <Root scheme={presets[preset]}>
        {({ state: { sidebar } }) => (
          <>
            <Header>
              <Toolbar>
                <SidebarTrigger sidebarId="primarySidebar" />
                {data.header && <HeaderEx />}
              </Toolbar>
            </Header>
            <DrawerSidebar sidebarId="primarySidebar">
              <SidebarContent>
                <NavHeaderEx collapsed={sidebar.primarySidebar.collapsed} />
                {data.nav && <NavContentEx />}
              </SidebarContent>
              <CollapseBtn />
            </DrawerSidebar>
            <Content>
              {content}
              {/* data.content && <ContentEx /> */}
            </Content>
            <Footer>{data.footer && <FooterEx />}</Footer>
          </>
        )}
      </Root>
    </StylesProvider>
  );
}
