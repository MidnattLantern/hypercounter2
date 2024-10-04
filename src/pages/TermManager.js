import React, { useState, useEffect } from "react";
import TermList from "./TermList/TermList";
import { v4 as uuidv4 } from 'uuid'; // convenient for term index
import { useExpression } from "../context/ExpressionContext";
import MagScrollProvider from "./magScroll/MagScrollProvider";

const TermManager = () => {
    const newTermIndex = uuidv4();
    const [focusTermIndex, setFocusTermIndex] = useState(null);
  const { expressionArray, addTerm, editTerm, deleteTerm } = useExpression();

const handleCreateTerm = () => {
  const newTerm = {
    term_coefficient: 1,
    term_variable: "",
    term_exponent: 1,
    term_index: newTermIndex,
    scroll_memory_coefficient: 3,
    scroll_memory_variable: 0,
    scroll_memory_exponent: 2
  };
  addTerm(newTerm);

  setFocusTermIndex(newTermIndex);
};

      const handleEditTermTest1 = (target) => {
        editTerm(target, {
          term_coefficient: 2,
          term_variable: "x", 
          term_exponent: 10,
          scroll_memory_coefficient: 1,
          scroll_memory_variable: 2,
          scroll_memory_exponent: 3
        })
      };
  
      const handleSelectTerm = async (targetCoefficient, targetValue, targetExponent, targetIndex) => {
        await setFocusTermIndex(null); // deselect
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

        <p>focusTermIndex: {focusTermIndex}</p>

      {focusTermIndex !== null ? <MagScrollProvider focusTermIndex={focusTermIndex}/> : null}
        

    </>)
};

export default TermManager;
