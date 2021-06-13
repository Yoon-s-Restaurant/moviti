import { useCallback, useState } from 'react';

const useDescriptionHover = (): [
  typeof hover,
  typeof setHover,
  typeof handleMouseOver,
  typeof handleMouseLeave
] => {
  const [hover, setHover] = useState(false);
  const handleMouseOver = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseLeave = useCallback((score: number) => {
    if (score === 0) {
      setHover(false);
    }
  }, []);

  return [hover, setHover, handleMouseOver, handleMouseLeave];
};

export default useDescriptionHover;
