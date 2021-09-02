declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    customShadows: {
      widget: React.CSSProperties['boxShadow'];
      widgetDark: React.CSSProperties['boxShadow'];
      widgetWide: React.CSSProperties['boxShadow'];
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    customShadows: {
      widget: React.CSSProperties['boxShadow'];
      widgetDark: React.CSSProperties['boxShadow'];
      widgetWide: React.CSSProperties['boxShadow'];
    };
  }
}

export {};
