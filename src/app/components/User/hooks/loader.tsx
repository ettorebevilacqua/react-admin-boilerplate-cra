import { useEffect, useState } from 'react';
import { useInjectReducer } from 'utils/redux-injectors';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export type PropsHookLoader = {
  slice: any;
  actionPayload?: string | object | null;
};

/**
 *
 * @param slice - Current Slice
 * @param actionPayload - id risorsa or query, on missing check url param id, if missing get emity query: {}
 * @returns
 */
export default function useLoader(slice, actionPayload?) {
  useInjectReducer({ key: slice.name, reducer: slice.slice.reducer });
  const selector: any = useSelector(slice.selects.selectState);
  const params: any = useParams();

  const payloadRead = !!actionPayload ? actionPayload : params?.id ? params.id : {};
  const action = typeof payloadRead === 'object' ? slice.actions.query : slice.actions.get;
  const [payload] = useState(payloadRead);

  useEffect(() => {
    action(payload);
  }, [action, payload]);
  // const { data, isFetching, saved, isError, errorMessage } = selector;
  return selector;
}
