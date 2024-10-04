import React, { useState, useEffect } from "react";
import TermEditor from "./TermEditor/TermEditor";
import TermList from "./TermList/TermList";
import { v4 as uuidv4 } from 'uuid'; // convenient for term index
import { useExpression } from "../context/ExpressionContext";

const TermManager = () => {
    const newTermIndex = uuidv4();
    const [focusTermCoefficient,setFocusTermCoefficient] = useState(null);
    const [focusTermVariable, setFocusTermVariable] = useState(null);
    const [focusTermExponent, setFocusTermExponent] = useState(null);
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

  setFocusTermCoefficient(1);
  setFocusTermVariable("");
  setFocusTermExponent(1);
  setFocusTermIndex(newTermIndex);
};
  
    useEffect(() => {
        setFocusTermCoefficient(focusTermCoefficient);
        setFocusTermVariable(focusTermVariable);
        setFocusTermExponent(focusTermExponent);
    }, [focusTermCoefficient, focusTermVariable, focusTermExponent]);

      const handleEditTerm = (target, updatedTerm) => {
        editTerm(target, updatedTerm)
      };

  
      const handleSelectTerm = (targetCoefficient, targetValue, targetExponent, targetIndex) => {
        setFocusTermCoefficient(targetCoefficient);
        setFocusTermVariable(targetValue);
        setFocusTermExponent(targetExponent);
        setFocusTermIndex(targetIndex);
      };

      const handleEraseTerm = (target) => {
        deleteTerm(target)
        setFocusTermCoefficient(null);
        setFocusTermVariable(null);
        setFocusTermExponent(null);
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


        <TermEditor
        focusTermCoefficient={focusTermCoefficient}
        focusTermVariable={focusTermVariable}
        focusTermExponent={focusTermExponent}
        focusTermIndex={focusTermIndex}
        handleEditTerm={handleEditTerm}
        />

    </>)
};

export default TermManager;
