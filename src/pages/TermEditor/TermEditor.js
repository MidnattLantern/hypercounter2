import React, { useEffect, useState } from "react";
// styles
import Styles from "./TermEditor.module.css";
import MagScrollProvider from "../magScroll/MagScrollProvider";

const TermEditor = ({ focusTermCoefficient, focusTermVariable, focusTermExponent, focusTermIndex, handleEditTerm }) => { // global states

    // local states
    const [selectedCoefficient, setSelectedCoefficient] = useState(null);
    const [selectedVariable, setSelectedVariable] = useState(null);
    const [selectedExponent, setSelectedExponent] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

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


    // html
    return (<>
        <div className={Styles.TermEditorModule}>

            <h1>{selectedCoefficient}{selectedVariable}^{selectedExponent}</h1>
            {DisplayTerm}
            <MagScrollProvider
            selectedCoefficient={selectedCoefficient} setSelectedCoefficient={setSelectedCoefficient}
            selectedVariable={selectedVariable} setSelectedVariable={setSelectedVariable}
            selectedExponent={selectedExponent} setSelectedExponent={setSelectedExponent}
            />
            <p>{selectedIndex}</p>

        </div>
    </>)
};

export default TermEditor;