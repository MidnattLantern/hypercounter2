// src/TermList.tsx
import React from "react";
//styles
import Styles from "./TermList.module.css";

const TermList = ({focusTermIndex, expressionArray, handleCreateTerm, handleSelectTerm, handleEraseTerm}) => {

  const EraseButton = () => {
    return(<>
      {focusTermIndex !== null ? (<>
        <button className={Styles.TermButton} onClick={() => {handleEraseTerm(focusTermIndex)}}>Erase term</button>
      </>) : (<>
        <button className={Styles.DisabledTermButton} onClick={() => {}}>---</button>
      </>)}
    </>)
  }

  return (<>
    <div className={Styles.TermListModule}>
      <table className={Styles.TermListTable} tabIndex="0">

        {expressionArray.map(entity => (<>
          <button
          key={entity.term_index}
          id={entity.term_index}
          tabIndex="-1"
          className={`${Styles.TermButton} ${focusTermIndex === entity.term_index ? Styles.SelectedTerm : null}`}
          onClick={() =>
          {handleSelectTerm(
            entity.term_coefficient,
            entity.term_variable,
            entity.term_exponent,
            entity.term_index
          )}}
          >


{entity.term_coefficient}{entity.term_variable}^{entity.term_exponent}

          </button>

        </>))}

        <button className={Styles.TermButton} onClick={() => {handleCreateTerm()}}>+ New Term </button>
      </table>

      {EraseButton()}

    </div>
    </>);
};

export default TermList;
