import { useCallback, useState } from 'react';

const useInput = (initValue: string): [typeof state, typeof onChange] => {
  const [state, setState] = useState(initValue);

  const onChange = useCallback((e) => {
    setState(e.target.value);
  }, []);
  return [state, onChange];
};

export default useInput;
