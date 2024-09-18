import React, { useEffect, useState } from "react";
// styles
import Styles from "./TermEditor.module.css";
import "../../global.css";
import VariableSelectionMenu from "../../components/VariableSelectionMenu/VariableSelectionMenu";
import CoefficientSelectionMenu from "../../components/CoefficientSelectionMenu/CoefficientSelectionMenu";
import ExponentSelectionMenu from "../../components/ExponentSelectionMenu/ExponentSelectionMenu";

const TermEditor = ({ focusTermCoefficient, focusTermVariable, focusTermExponent, focusTermIndex, handleEditTerm }) => { // global states

    // local states
    const [selectedCoefficient, setSelectedCoefficient] = useState(null);
    const [selectedVariable, setSelectedVariable] = useState(null);
    const [selectedExponent, setSelectedExponent] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [displaySelecion, setDisplaySelection] = useState(null);

    // useEffect sync local states from global states inherited from parent (termManager.js)
    useEffect(() => {
        if (focusTermIndex !== selectedIndex) { // inherit focusTermIndex so that the editor can be reset to the new highlighted term from TermList.js
            setSelectedCoefficient(focusTermCoefficient);
            setSelectedVariable(focusTermVariable);
            setSelectedExponent(focusTermExponent);
            setSelectedIndex(focusTermIndex);
        };
        if (focusTermCoefficient !== selectedCoefficient || 1) { // does not update to 1 by default
            handleEditTerm({
                term_coefficient: selectedCoefficient,
                term_index: selectedIndex, // target
            })
        };
        if (focusTermVariable !== selectedVariable || null) { // does not update to null by default
            handleEditTerm({
                term_variable: selectedVariable,
                term_index: selectedIndex, // target
            })
        };
        if (focusTermExponent !== selectedExponent || 1) { // does not update to 1 by default
            handleEditTerm({
                term_exponent: selectedExponent,
                term_index: selectedIndex, // target
            })
        };
    }, [
        focusTermCoefficient, focusTermVariable, focusTermExponent, focusTermIndex,
        selectedIndex,
        handleEditTerm, selectedCoefficient, selectedExponent, selectedVariable
    ]);

    const DisplayTerm = () => {
        return(<>
            <div className={Styles.DisplayTerm}>
                {selectedCoefficient !== null ? (<>
                    {selectedExponent === 1 || selectedExponent === null ?
                        <h1>{selectedCoefficient}{selectedVariable}</h1> :
                        <h1>{selectedCoefficient}{selectedVariable}^{selectedExponent}</h1>
                    }
                </>) : (<>
                <h1>0</h1>
                </>)}
            </div>
        </>)
    };

    const TermEditorWindow = () => {
        return(<>
            <div className={Styles.TermEditorWindow}>
                <div className={Styles.TermSelectionPanel}>
                    <button className={`${Styles.ExpressionBox} ${displaySelecion === "coefficient" ? Styles.ActiveExpressionBox : null}`}
                    onClick={() => {setDisplaySelection("coefficient")}}>
                        {selectedCoefficient}
                    </button>
                    <button className={`${Styles.ExpressionBox} ${displaySelecion === "variable" ? Styles.ActiveExpressionBox : null}`}
                    onClick={() => {setDisplaySelection("variable")}}>
                        {selectedVariable}
                    </button>
                    <button className={`${Styles.ExpressionBox} ${displaySelecion === "exponent" ? Styles.ActiveExpressionBox : null}`}
                    onClick={() => {setDisplaySelection("exponent")}}>
                        {selectedExponent}
                    </button>
                </div>
                <div className={Styles.SelectionMenu}>
                    {DisplayOption()}
                </div>
            </div>
        </>)
    };

    const DisplayOption = () => {
        switch (displaySelecion) {
            case "coefficient":
                return(
                <div className={`${Styles.ScrollSelectionMenu} ${Styles.AlignForCoefficient}`}>
                    <CoefficientSelectionMenu setSelectedCoefficient={setSelectedCoefficient} />
                </div>
                )
            case "variable":
                return(
                <div className={`${Styles.ScrollSelectionMenu} ${Styles.AlignForVariable}`}>
                    <VariableSelectionMenu setSelectedVariable={setSelectedVariable} />
                </div>
                )
            case "exponent":
                return(
                    <div className={`${Styles.ScrollSelectionMenu} ${Styles.AlignForExponent}`}>
                        <ExponentSelectionMenu setSelectedExponent={setSelectedExponent} />
                    </div>
                )
            default:
                break;
        };
    };

    const CloseSelectionMenuButton = () => {
        return(<>
            {displaySelecion !== null ? (<>
                <button className={Styles.CloseSelectionMenuButton} onClick={() => {setDisplaySelection(null)}}>Close</button>
            </>) : (<>
                <button className={Styles.DisabedCloseSelectionMenuButton} onClick={() => {}}>---</button>
            </>)}
        </>)
    }

    // html
    return (<>
        <div className={Styles.TermEditorModule}>

            {selectedIndex !== null ? TermEditorWindow() : null}
            {CloseSelectionMenuButton()}

        </div>
    </>)
};

export default TermEditor;