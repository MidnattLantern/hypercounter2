import React, { useState } from "react";
import TermList from "./TermList/TermList";
import { v4 as uuidv4 } from 'uuid'; // convenient for term index
import { useExpression } from "../context/ExpressionContext";
import MagScrollProvider from "./magScroll/MagScrollProvider";

const TermManager = () => {
    const newTermIndex = uuidv4();
    const [focusTermIndex, setFocusTermIndex] = useState(null);
  const { expressionArray, addTerm, deleteTerm } = useExpression();

const handleCreateTerm = () => {
  const newTerm = {
    term_coefficient: 1,
    term_variable: null,
    term_exponent: 1,
    term_index: newTermIndex,
    scroll_memory_coefficient: 3,
    scroll_memory_variable: 0,
    scroll_memory_exponent: 2
  };
  addTerm(newTerm);

  setFocusTermIndex(newTermIndex);
};
  
      const handleSelectTerm = async(targetIndex) => {
        await setFocusTermIndex(null); // for refresh
        setFocusTermIndex(targetIndex);
      };

      const handleEraseTerm = (target) => {
        deleteTerm(target);
        setFocusTermIndex(null);
      }

    return(<>

        <TermList
        focusTermIndex={focusTermIndex}
        expressionArray={expressionArray}
        handleCreateTerm={handleCreateTerm}
        handleSelectTerm={handleSelectTerm}
        handleEraseTerm={handleEraseTerm}
        />

      {focusTermIndex !== null ? <MagScrollProvider focusTermIndex={focusTermIndex}/> : null}
        
    </>)
};

export default TermManager;
