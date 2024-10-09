// technologies
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useExpression } from "../../context/ExpressionContext";
//^

// global components
import TermList from "../TermList/TermList";
import MagScrollProvider from "../magScroll/MagScrollProvider";
//^

const TermManager = () => {
  // states
  const newTermIndex = uuidv4();
  const [focusTermIndex, setFocusTermIndex] = useState(null);
  const { expressionArray, addTerm, deleteTerm } = useExpression();
  //^

  // handle actions
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
    await setFocusTermIndex(null);
    setFocusTermIndex(targetIndex);
  };

  const handleEraseTerm = (target) => {
    deleteTerm(target);
    setFocusTermIndex(null);
  }
  //^

  // local components
  const TermListComponent = () => {
    return(<>
      <TermList
      focusTermIndex={focusTermIndex}
      expressionArray={expressionArray}
      handleCreateTerm={handleCreateTerm}
      handleSelectTerm={handleSelectTerm}
      handleEraseTerm={handleEraseTerm}
      />
    </>)
  }

  const FocusTermIndexComponent = () => {
    return(<>
      {focusTermIndex !== null ? (<>
      <MagScrollProvider focusTermIndex={focusTermIndex}/>
      </>) : (<>
      
      </>)}
    </>)
  }
  //^

  // complete XTML
  return(<>
    {TermListComponent()}
    {FocusTermIndexComponent()}
  </>)
};

export default TermManager;