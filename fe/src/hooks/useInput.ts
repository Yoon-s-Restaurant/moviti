import { useCallback, useState } from 'react';

const useInput = (initValue: string): [typeof state, typeof onChange] => {
  const [state, setState] = useState(initValue);

  const onChange = useCallback(
    (e) => {
      setState(e.target.value);
    },
    [state]
  );
  return [state, onChange];
};

export default useInput;
