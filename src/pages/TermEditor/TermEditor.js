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
    // test
    const [memoryIndex1, setMemoryIndex1] = useState(3);
    const [memoryIndex2, setMemoryIndex2] = useState(0);
    const [memoryIndex3, setMemoryIndex3] = useState(2);

    useEffect(() => {
        if (focusTermIndex !== selectedIndex) {
            setSelectedCoefficient(focusTermCoefficient);
            setSelectedVariable(focusTermVariable);
            setSelectedExponent(focusTermExponent);
            setSelectedIndex(focusTermIndex);
        };
        if (focusTermCoefficient !== selectedCoefficient || 1) {
            handleEditTerm(selectedIndex, {
                term_coefficient: selectedCoefficient,
                term_variable: selectedVariable,
                term_exponent: selectedExponent,
                scroll_memory_coefficient: memoryIndex1
            })
        };
        if (focusTermVariable !== selectedVariable || null) {
            handleEditTerm(selectedIndex, {
                term_coefficient: selectedCoefficient,
                term_variable: selectedVariable,
                term_exponent: selectedExponent,
                scroll_memory_variable: memoryIndex2
            })
        };
        if (focusTermExponent !== selectedExponent || 1) {
            handleEditTerm(selectedIndex, {
                term_coefficient: selectedCoefficient,
                term_variable: selectedVariable,
                term_exponent: selectedExponent,
                scroll_memory_exponent: memoryIndex3
            })
        };
    }, [
        focusTermCoefficient,
        focusTermVariable,
        focusTermExponent,
        focusTermIndex,
        selectedIndex,
        handleEditTerm,
        selectedCoefficient,
        selectedExponent,
        selectedVariable,
        memoryIndex1,
        memoryIndex2,
        memoryIndex3
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
            selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
            memoryIndex1={memoryIndex1} setMemoryIndex1={setMemoryIndex1}
            memoryIndex2={memoryIndex2} setMemoryIndex2={setMemoryIndex2}
            memoryIndex3={memoryIndex3} setMemoryIndex3={setMemoryIndex3}
            />

            <button onClick={() => {handleEditTerm(selectedIndex, {
      term_coefficient: selectedCoefficient,
      term_variable: selectedVariable,
      term_exponent: selectedExponent,
      scroll_memory_coefficient: memoryIndex1,
      scroll_memory_variable: memoryIndex2,
      scroll_memory_exponent: memoryIndex3
            })}}>{selectedIndex}</button>

        </div>
    </>)
};

export default TermEditor;