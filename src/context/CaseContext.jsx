import { createContext, useContext, useState } from "react";
import { cases as initialCases } from "../data/mockData";

const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
  const [cases, setCases] = useState(initialCases);

  const addCase = (newCase) => {
    setCases([...cases, newCase]);
  };

  return (
    <CaseContext.Provider value={{ cases, addCase }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCases = () => useContext(CaseContext);
