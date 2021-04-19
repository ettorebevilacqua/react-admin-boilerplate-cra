import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import IconImageEye from '@material-ui/icons/RemoveRedEye';
import IconKeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Button, SimpleShowLayout, TextField, useGetOne } from 'react-admin';

const useStyles = makeStyles({
  field: {
    // These styles will ensure our drawer don't fully cover our
    // application when teaser or title are very long
    '& span': {
      display: 'inline-block',
      maxWidth: '20em',
    },
  },
});

const PostQuickPreviewButton = ({ id }) => {
  const [showPanel, setShowPanel] = useState(false);
  const classes = useStyles();
  const { data } = useGetOne('enti', id);

  const handleClick = () => {
    setShowPanel(true);
  };

  const handleCloseClick = () => {
    setShowPanel(false);
  };

  return (
    <>
      <Button onClick={handleClick} label="ra.action.show">
        <IconImageEye />
      </Button>
      <Drawer anchor="right" open={showPanel} onClose={handleCloseClick}>
        <div>
          <Button label="Close" onClick={handleCloseClick}>
            <IconKeyboardArrowRight />
          </Button>
        </div>
        <SimpleShowLayout record={data} basePath="/enti" resource="enti">
          <TextField source="id" />
          <TextField source="title" className={classes.field} />
          <TextField source="teaser" className={classes.field} />
        </SimpleShowLayout>
      </Drawer>
    </>
  );
};

export default PostQuickPreviewButton;
