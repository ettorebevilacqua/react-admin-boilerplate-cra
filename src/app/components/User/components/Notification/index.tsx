import React from 'react';
import { Button } from '@material-ui/core';

import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TicketIcon from '@material-ui/icons/LocalOffer';
import DeliveredIcon from '@material-ui/icons/BusinessCenter';
import FeedbackIcon from '@material-ui/icons/SmsFailed';
import DiscIcon from '@material-ui/icons/DiscFull';
import ReportIcon from '@material-ui/icons/Report';
import MessageIcon from '@material-ui/icons/Email';
import DefenceIcon from '@material-ui/icons/Error';
import CustomerIcon from '@material-ui/icons/AccountBox';
import ShippedIcon from '@material-ui/icons/Done';
import UploadIcon from '@material-ui/icons/Publish';

import { useTheme, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';
import tinycolor from 'tinycolor2';

// styles
import useStyles from './styles';

// components
import { Typography } from '../Wrappers';

const typesIcons = {
  'e-commerce': <ShoppingCartIcon />,
  notification: <NotificationsIcon />,
  offer: <TicketIcon />,
  info: <ThumbUpIcon />,
  message: <MessageIcon />,
  feedback: <FeedbackIcon />,
  customer: <CustomerIcon />,
  shipped: <ShippedIcon />,
  delivered: <DeliveredIcon />,
  defence: <DefenceIcon />,
  report: <ReportIcon />,
  upload: <UploadIcon />,
  disc: <DiscIcon />,
};

interface Props {
  variant?: any;
  type?: any;
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  className?: any;
  shadowless?: any;
  typographyVariant?: any;
  message?: any;
  extraButtonClick?: any;
  extraButton?: any;
}

export default function Notification({
  variant,
  type,
  color = 'primary',
  className,
  shadowless,
  typographyVariant,
  message,
  extraButton,
  extraButtonClick,
}: Props) {
  var classes = useStyles();
  const theme: Theme = useTheme();

  const icon = getIconByType(type);
  const iconWithStyles = React.cloneElement(icon, {
    style: {
      color: theme.palette[color].main,
    },
  });

  return (
    <div
      className={classnames(classes.notificationContainer, className, {
        [classes.notificationContained]: variant === 'contained',
        [classes.notificationContainedShadowless]: shadowless,
      })}
      style={{
        backgroundColor:
          (variant === 'contained' && tinycolor(theme.palette[color].main).setAlpha(0.25).toRgbString()) || '',
        borderColor: (variant === 'contained' && theme.palette[color].main) || 'none',
        borderLeft: (variant === 'contained' && `4px solid ${theme.palette[color].main}`) || 'none',
      }}
    >
      <div
        className={classnames(classes.notificationIconContainer, {
          [classes.notificationIconContainerContained]: variant === 'contained',
          [classes.notificationIconContainerRounded]: variant === 'rounded',
        })}
        style={{
          backgroundColor: variant === 'rounded' && tinycolor(theme.palette[color].main).setAlpha(0.15).toRgbString(),
        }}
      >
        {iconWithStyles}
      </div>
      <div className={classes.messageContainer}>
        <Typography
          className={classnames({
            [classes.containedTypography]: variant === 'contained',
          })}
          variant={typographyVariant}
          size={variant !== 'contained' && !typographyVariant && 'md'}
        >
          {message}
        </Typography>
        {extraButton && extraButtonClick && (
          <Button onClick={extraButtonClick} disableRipple className={classes.extraButton}>
            {extraButton}
          </Button>
        )}
      </div>
    </div>
  );
}

// ####################################################################
function getIconByType(type = 'offer') {
  return typesIcons[type];
}
