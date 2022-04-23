import { useState } from "react";
const useToogle = (defaultValue) => {
  const [visible, setVisible] = useState(defaultValue);
  const toogleVisible = () => {
    setVisible((currentValue) => !currentValue);
  };
  return [visible, toogleVisible];
};
export default useToogle;
