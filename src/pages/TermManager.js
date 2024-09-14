import React, { useState, useCallback, useEffect } from "react";
import TermEditor from "./TermEditor/TermEditor";
import TermList from "./TermList/TermList";
import { v4 as uuidv4 } from 'uuid'; // convenient for term index

const TermManager = () => {
    const newTermIndex = uuidv4();
    const [focusTermCoefficient,setFocusTermCoefficient] = useState(null);
    const [focusTermVariable, setFocusTermVariable] = useState(null);
    const [focusTermExponent, setFocusTermExponent] = useState(null);
    const [focusTermIndex, setFocusTermIndex] = useState(null);
    const [expressionArray, setExpressionArray] = useState([]);
  
    useEffect(() => {
        setFocusTermCoefficient(focusTermCoefficient);
        setFocusTermVariable(focusTermVariable);
        setFocusTermExponent(focusTermExponent);
    }, [focusTermCoefficient, focusTermVariable, focusTermExponent]);

        // handlers
        const handleCreateTerm = useCallback(() => {
          setExpressionArray(prevArray => [
              ...prevArray,
              {
                  term_coefficient: 1,
                  term_variable: "", // use "" instead of null
                  term_exponent: 1,
                  term_index: newTermIndex
              }
          ]);
          setFocusTermCoefficient(1);
          setFocusTermVariable("");
          setFocusTermExponent(1);
          setFocusTermIndex(newTermIndex);
      }, [newTermIndex]);

      const handleEditTerm = useCallback((updatedTerm) =>
        { setExpressionArray(prevArray =>
            prevArray.map(entity => 
            entity.term_index === updatedTerm.term_index ?
            {...entity, ...updatedTerm } // updated
            :
            entity // unchanged
        ))
      }, []);
  
      const handleSelectTerm = useCallback((targetCoefficient, targetValue, targetExponent, targetIndex) => {
        setFocusTermCoefficient(targetCoefficient);
        setFocusTermVariable(targetValue);
        setFocusTermExponent(targetExponent);
        setFocusTermIndex(targetIndex);
      }, []);
  
      const handleEraseTerm = useCallback((targetIndex) => {
        setExpressionArray(prevArray => prevArray.filter(entity => entity.term_index !== targetIndex));
        setFocusTermCoefficient(null);
        setFocusTermVariable(null);
        setFocusTermExponent(null);
        setFocusTermIndex(null);
      }, [])

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
