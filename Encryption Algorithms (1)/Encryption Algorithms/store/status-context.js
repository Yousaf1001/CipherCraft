import { createContext, useState } from "react";

export const StatusContext = createContext({
  isEncryption: null,
  isSDES: null,
  cipher: null,
  setSDES(val) {},
  generateCipher(val) {},
  setEncryption(val) {},
});

export const StatusProvider = (props) => {
  const [isEncryption, setIsEncryption] = useState(null);
  const [isSDES, setIsSDES] = useState(null);
  const [cipher, setCipher] = useState(null);
  const generateCipher = (val) => {
    setCipher(val);
  };
  const setSDES = (val) => {
    setIsSDES(val);
  };
  const setEncryption = (val) => setIsEncryption(val);
  return (
    <StatusContext.Provider
      value={{
        cipher,
        generateCipher,
        isSDES,
        isEncryption,
        setSDES,
        setEncryption,
      }}
    >
      {props.children}
    </StatusContext.Provider>
  );
};
