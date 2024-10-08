import Styles from "./ScrollPilot.module.css";
import { useEffect, useState } from "react";
import MagScroll from "./MagScroll";
import { ReactComponent as ProviderDecoratorLeft} from "../../assets/provider-decorator-left.svg";
import { ReactComponent as ProviderDecoratorRight} from "../../assets/provider-decorator-right.svg";
import { useExpression } from "../../context/ExpressionContext";

const MagScrollProvider = ({
    focusTermIndex,
}) => {
    const { expressionArray, editTerm } = useExpression();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [localCoefficient, setLocalCoefficient] = useState(null);
    const [localVariable, setLocalVariable] = useState(null);
    const [localExponent, setLocalExponent] = useState(null);
    const [localScrollMemoryCoefficient, setLocalScrollMemoryCoefficient] = useState(3);
    const [localScrollMemoryVariable, setLocalScrollMemoryVariable] = useState(0);
    const [localScrollMemoryExponent, setLocalScrollMemoryExponent] = useState(2);
    const [focusPilot, setFocusPilot] = useState(null);
    const library1 = [10, 3, 2, 1, 0, -1];
    const library2 = [null, "♦️", "♥️", "♠️", "♣️"];
    const library3  = [3, 2, 1, -1];

    useEffect(() => {
        if (!hasLoaded) {
            const handleMount = () => {
                const findTermByIndex = () => {
                    return expressionArray.find(term => term.term_index === focusTermIndex);
                    };
                const term = findTermByIndex(focusTermIndex);
                setLocalCoefficient(term.term_coefficient);
                setLocalVariable(term.term_variable);
                setLocalExponent(term.term_exponent);
                setLocalScrollMemoryCoefficient(term.scroll_memory_coefficient);
                setLocalScrollMemoryVariable(term.scroll_memory_variable);
                setLocalScrollMemoryExponent(term.scroll_memory_exponent);
                setHasLoaded(true);
            };
            handleMount();
        };
    }, [expressionArray, focusTermIndex, hasLoaded]);

    const handleUnselect = () => {
        setFocusPilot(null);
    };
    const handleSetFocusPilot = async (target) => {
        await handleUnselect();
        setFocusPilot(target);
    };

    const syncWithGlobalContext = () => {
        editTerm(focusTermIndex, {
            term_coefficient: localCoefficient,
            term_variable: localVariable,
            term_exponent: localExponent,
            scroll_memory_coefficient: localScrollMemoryCoefficient,
            scroll_memory_variable: localScrollMemoryVariable,
            scroll_memory_exponent: localScrollMemoryExponent,
        })
    };

    const handlesetLocalCoefficient = async (value, index) => {
        await setLocalCoefficient(value);
        await editTerm(focusTermIndex, {
            term_coefficient: value,
            scroll_memory_coefficient: index,
        })
    };
    const handlesetLocalVariable = async (value, index) => {
        await setLocalVariable(value);
        await editTerm(focusTermIndex, {
            term_variable: value,
            scroll_memory_variable: index,
        })
    };
    const handlesetLocalExponent = async (value, index) => {
        await setLocalExponent(value);
        await editTerm(focusTermIndex, {
            term_exponent: value,
            scroll_memory_exponent: index,
        })
    };
    const handleClose = () => {
        setFocusPilot(null);
        handleSetFocusPilot(0);
    };

    const renderFocusedComponent = () => {
        switch(focusPilot){
            case 1:
                return(
                    <MagScroll globalValue={localCoefficient} setGlobalValue={handlesetLocalCoefficient} memoryIndex={localScrollMemoryCoefficient} setMemoryIndex={setLocalScrollMemoryCoefficient} library={library1} />
                );
            case 2:
                return(
                    <MagScroll globalValue={localVariable} setGlobalValue={handlesetLocalVariable} memoryIndex={localScrollMemoryVariable} setMemoryIndex={setLocalScrollMemoryVariable} library={library2} />
                );
            case 3:
                return(
                    <MagScroll globalValue={localExponent} setGlobalValue={handlesetLocalExponent} memoryIndex={localScrollMemoryExponent} setMemoryIndex={setLocalScrollMemoryExponent} library={library3} />
                );
            default:
                return <div className={Styles.UnselectedContainer}></div>;
        };
    };

    return(hasLoaded ? <div className={Styles.ProviderContainer}>

            <div>
                <button className={Styles.SelectLibraryButton} onClick={() => {handleSetFocusPilot(1)}}>{localCoefficient}</button>
                <button className={Styles.SelectLibraryButton} onClick={() => {handleSetFocusPilot(2)}}>{localVariable !== null ? localVariable : <>-</>}</button>
                <button className={Styles.SelectLibraryButton} onClick={() => {handleSetFocusPilot(3)}}>{localExponent}</button>
            </div>

        <div className={Styles.WrapFocusedComponent}>
            <div className={Styles.ProviderContainerDecoratorContainer}><ProviderDecoratorLeft className={Styles.ProviderContainerDecorator} /></div>
            {renderFocusedComponent()}
            <div className={Styles.ProviderContainerDecoratorContainer}><ProviderDecoratorRight className={Styles.ProviderContainerDecorator} /></div>
        </div>

    </div> : <p>loading</p>)
};

export default MagScrollProvider;
