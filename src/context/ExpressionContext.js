import React, { createContext, useState, useContext } from 'react';

const ExpressionContext = createContext();
export const ExpressionProvider = ({ children }) => {
  const [expressionArray, setExpressionArray] = useState([
/* The structure of an object
    {
      term_coefficient: 1,
      term_variable: "", 
      term_exponent: 1,
      term_index: 'uuid-index', // unique term index
      scroll_memory_coefficient: 3,
      scroll_memory_variable: 0,
      scroll_memory_exponent: 2
    }
*/
  ]);

  const addTerm = (newTerm) => {
    setExpressionArray((prevArray) => [...prevArray, newTerm]);
  };

  const editTerm = (index, updatedTerm) => {
    setExpressionArray((prevArray) =>
      prevArray.map((term) =>
        term.term_index === index ? { ...term, ...updatedTerm } : term
      )
    );
  };

  const deleteTerm = (index) => {
    setExpressionArray((prevArray) =>
      prevArray.filter((term) => term.term_index !== index)
    );
  };

  return (
    <ExpressionContext.Provider
    value={{ expressionArray, addTerm, editTerm, deleteTerm }}
    >
      {children}
    </ExpressionContext.Provider>
  );
};

// Custom hook to use the context
export const useExpression = () => {
  return useContext(ExpressionContext);
};