import { useEffect, useState } from 'react';
import { useInjectReducer } from 'utils/redux-injectors';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export type PropsHookLoader = {
  slice: any;
  actionPayload?: string | object | null;
  values?: any;
};

/**
 *
 * @param slice - Current Slice
 * @param actionPayload - id risorsa or query, on missing check url param id, if missing get emity query: {}
 * @returns
 */
export default function useLoader(slice, actionPayload?, values?) {
  useInjectReducer({ key: slice.name, reducer: slice.slice.reducer });
  const selector: any = useSelector(slice.selects.selectState);
  const params: any = useParams();

  const payloadRead = !!actionPayload ? actionPayload : params?.id ? params.id : {};
  const action = typeof payloadRead === 'object' ? slice.actions.query : slice.actions.get;
  const [payload] = useState(payloadRead);

  useEffect(() => {
    values || action(payload);
  }, [action, payload, values]);

  const stateSelector = !values
    ? selector
    : {
        data: values,
        isFetching: false,
        saved: null,
        isError: false,
        errorMessage: '',
      };
  // const { data, isFetching, saved, isError, errorMessage } = selector;
  return stateSelector;
}
