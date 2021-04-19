import React, { useState, useCallback } from 'react';
import { useFormState } from 'react-final-form';
import { ReferenceInput, SelectInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import PostQuickCreateButton from './quickCreateButton';
import PostQuickPreviewButton from './quickPreviewButton';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
});

const spySubscription = { values: true };

const RelatedInputAddList = props => {
  const { optionText, labelCreate, ...refInputProps } = props;
  const classes = useStyles();
  const [version, setVersion] = useState(0);
  const { values } = useFormState({ subscription: spySubscription });
  const handleChange = useCallback(() => setVersion(version + 1), [version]);

  return (
    <div className={classes.root}>
      <ReferenceInput key={version} {...refInputProps}>
        <SelectInput optionText={optionText} />
      </ReferenceInput>
      <PostQuickCreateButton
        resource={props.reference}
        source={props.source}
        optionText={optionText}
        labelCreate={labelCreate || 'Create'}
        onChange={handleChange}
      />
      {!!values.id_ente && 1 == 0 && (
        <PostQuickPreviewButton id={values.id_ente} />
      )}
    </div>
  );
};

export default RelatedInputAddList;
