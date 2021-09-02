import { useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useFormikContext } from 'formik';

const FormikOnChange = ({ delay, onChange }) => {
  const { values } = useFormikContext();
  const isFirstRun = useRef(true);
  const debouncedOnChange = _.debounce(onChange, delay);

  useDeepCompareEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      onChange(values, true);
      return;
    }

    if (delay > 0) {
      debouncedOnChange(values);
    } else {
      onChange(values, isFirstRun.current);
    }
  }, [values || {}]);

  return null;
};

FormikOnChange.propTypes = {
  delay: PropTypes.number, // ms
  onChange: PropTypes.func.isRequired,
};

FormikOnChange.defaultProps = {
  delay: 0,
};

export default FormikOnChange;
