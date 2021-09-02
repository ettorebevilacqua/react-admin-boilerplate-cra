import React from 'react';
import { withStyles, Badge as BadgeBase, Typography as TypographyBase, Button as ButtonBase } from '@material-ui/core';
import classnames from 'classnames';
import { useTheme, makeStyles } from '@material-ui/core/styles';

// styles
var useStyles = makeStyles(() => ({
  badge: {
    fontWeight: 600,
    height: 16,
    minWidth: 16,
  },
}));

interface Badgeprops {
  children: any;
  colorBrightness?: any;
  color?: any;
  badgeContent: number | null;
}
function Badge({ children, colorBrightness, color, badgeContent }: Badgeprops) {
  var classes = useStyles();
  var theme = useTheme();
  var Styled = createStyled({
    badge: {
      backgroundColor: getColor(color, theme, colorBrightness),
    },
  });

  return (
    <Styled>
      {styledProps => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge),
          }}
          badgeContent={badgeContent}
        >
          {children}
        </BadgeBase>
      )}
    </Styled>
  );
}

interface TProps {
  children: any;
  weight?: any;
  size?: any;
  colorBrightness?: any;
  color?: any;
  variant?:
    | 'inherit'
    | 'button'
    | 'overline'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'srOnly'
    | undefined;
  className?: any;
  component?: any;
  gutterBottom?: boolean;
  href?: string;
  onClick?: () => void;
}

function Typography({
  children,
  weight,
  size,
  colorBrightness,
  color,
  variant,
  component,
  gutterBottom,
  href,
  onClick,
}: TProps) {
  var theme = useTheme();

  return (
    <TypographyBase
      style={{
        color: getColor(color, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(size, variant, theme),
      }}
      component={component}
      gutterBottom={gutterBottom}
      onClick={onClick}
      href={href}
    >
      {children}
    </TypographyBase>
  );
}
interface Bprops {
  children: any;
  color?: any;
  className?: any;
  component?: any;
  select?: any;
  href?: any;
  variant?: any;
  style?: any;
  onClick?: () => void;
}
function Button({ children, color, className, component, select, href, variant, style, onClick }: Bprops) {
  var theme = useTheme();

  var Styled = createStyled({
    root: {
      color: getColor(color, theme),
    },
    contained: {
      backgroundColor: getColor(color, theme),
      boxShadow: theme.customShadows.widget,
      color: `${color ? 'white' : theme.palette.text.primary} !important`,
      '&:hover': {
        backgroundColor: getColor(color, theme, 'light'),
        boxShadow: theme.customShadows.widget,
      },
      '&:active': {
        boxShadow: theme.customShadows.widgetWide,
      },
    },
    outlined: {
      color: getColor(color, theme),
      borderColor: getColor(color, theme),
    },
    select: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  });

  return (
    <Styled>
      {({ classes }) => (
        <ButtonBase
          classes={{
            contained: classes.contained,
            root: classes.root,
            outlined: classes.outlined,
          }}
          component={component}
          href={href}
          variant={variant}
          style={style}
          onClick={onClick}
          className={classnames(
            {
              [classes.select]: select,
            },
            className,
          )}
        >
          {children}
        </ButtonBase>
      )}
    </Styled>
  );
}

export { Badge, Typography, Button };

// ########################################################################

function getColor(color, theme, brigtness = 'main') {
  if (color && theme.palette[color] && theme.palette[color][brigtness]) {
    return theme.palette[color][brigtness];
  }
}

function getFontWeight(style) {
  switch (style) {
    case 'light':
      return 300;
    case 'medium':
      return 500;
    case 'bold':
      return 600;
    default:
      return 400;
  }
}

function getFontSize(size, variant = '', theme) {
  var multiplier;

  switch (size) {
    case 'sm':
      multiplier = 0.8;
      break;
    case 'md':
      multiplier = 1.5;
      break;
    case 'xl':
      multiplier = 2;
      break;
    case 'xxl':
      multiplier = 3;
      break;
    default:
      multiplier = 1;
      break;
  }

  var defaultSize =
    variant && theme.typography[variant] ? theme.typography[variant].fontSize : theme.typography.fontSize + 'px';

  return `calc(${defaultSize} * ${multiplier})`;
}

function createStyled(styles: any, options?: any) {
  var Styled = function (props) {
    const { children, ...other } = props;
    return children(other);
  };

  return withStyles(styles, options)(Styled);
}
