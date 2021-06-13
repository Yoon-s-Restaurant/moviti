const mediaQuery = (minWidth: number) => {
  return `
    @media(min-width : ${minWidth}px) 
    `;
};

export default mediaQuery;

const BreakPoint = {
  md: 550,
  lg: 800,
  xlg: 1150,
};

export { BreakPoint };
