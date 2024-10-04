import Styles from "./ScrollPilot.module.css";
import { useEffect, useState } from "react";
import MagScroll from "./MagScroll";
import { ReactComponent as ProviderDecoratorLeft} from "../../assets/provider-decorator-left.svg";
import { ReactComponent as ProviderDecoratorRight} from "../../assets/provider-decorator-right.svg";

const MagScrollProvider = ({
    selectedCoefficient,
    setSelectedCoefficient,
    memoryIndex1,
    setMemoryIndex1,

    selectedVariable,
    setSelectedVariable,
    memoryIndex2,
    setMemoryIndex2,

    selectedExponent,
    setSelectedExponent,
    memoryIndex3,
    setMemoryIndex3,

    selectedIndex
}) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [globalValue1, setGlobalValue1] = useState(null);
    const [globalValue2, setGlobalValue2] = useState(null);
    const [globalValue3, setGlobalValue3] = useState(null);
//    const [memoryIndex1, setMemoryIndex1] = useState(3);
//    const [memoryIndex2, setMemoryIndex2] = useState(0);
//    const [memoryIndex3, setMemoryIndex3] = useState(2);
    const [focusPilot, setFocusPilot] = useState(null);
    const library1 = [10, 3, 2, 1, 0, -1];
    const library2 = [null, "♦️", "♥️", "♠️", "♣️"];
    const library3  = [3, 2, 1, -1];

    useEffect(() => {


        const handleMount = () => {
            setGlobalValue1(selectedCoefficient);
            setGlobalValue2(selectedVariable);
            setGlobalValue3(selectedExponent);
            setHasLoaded(true);
        }
        handleMount();
    }, [selectedCoefficient, selectedVariable, selectedExponent]);

    const handleUnselect = () => {
        setFocusPilot(null);
    };
    const handleSetFocusPilot = async (target) => {
        await handleUnselect();
        setFocusPilot(target);
    };

    const handleSetGlobalValue1 = (value) => {
        setGlobalValue1(value);
        setSelectedCoefficient(value);
    };
    const handleSetGlobalValue2 = (value) => {
        setGlobalValue2(value);
        setSelectedVariable(value);
    };
    const handleSetGlobalValue3 = (value) => {
        setGlobalValue3(value);
        setSelectedExponent(value);
    };

//    const [tableData, setTableData] = useState([]);

    /*
    const handleSubmit = () => {

        const jsonData = [
            { Key: 'globalValue1', Value: globalValue1 },
            { Key: 'globalValue2', Value: globalValue2 },
            { Key: 'globalValue3', Value: globalValue3 },
        ];

        setTableData(jsonData);
        console.log("Submitted data:", tableData);
    };
    */

    const renderFocusedComponent = () => {
        switch(focusPilot){
            case 1:
                return(
                    <MagScroll globalValue={globalValue1} setGlobalValue={handleSetGlobalValue1} memoryIndex={memoryIndex1} setMemoryIndex={setMemoryIndex1} library={library1} selectedIndex={selectedIndex}/>
                );
            case 2:
                return(
                    <MagScroll globalValue={globalValue2} setGlobalValue={handleSetGlobalValue2} memoryIndex={memoryIndex2} setMemoryIndex={setMemoryIndex2} library={library2} selectedIndex={selectedIndex}/>
                );
            case 3:
                return(
                    <MagScroll globalValue={globalValue3} setGlobalValue={handleSetGlobalValue3} memoryIndex={memoryIndex3} setMemoryIndex={setMemoryIndex3} library={library3} selectedIndex={selectedIndex}/>
                );
            default:
                return <div className={Styles.UnselectedContainer}></div>;
        };
    };

    return(hasLoaded ? <>

            <div>
                <button className={Styles.SelectLibraryButton} onClick={() => {handleSetFocusPilot(1)}}>{globalValue1}</button>
                <button className={Styles.SelectLibraryButton} onClick={() => {handleSetFocusPilot(2)}}>{globalValue2 !== ""  ? globalValue2 : <>-</>}</button>
                <button className={Styles.SelectLibraryButton} onClick={() => {handleSetFocusPilot(3)}}>{globalValue3}</button>
                <button className={Styles.SelectLibraryButton} onClick={() => {handleSetFocusPilot(0)}}>Close</button>
            </div>

            <div className={Styles.ProviderContainer}>
                <div className={Styles.ProviderContainerDecoratorContainer}><ProviderDecoratorLeft className={Styles.ProviderContainerDecorator} /></div>
                    {renderFocusedComponent()}
                <div className={Styles.ProviderContainerDecoratorContainer}><ProviderDecoratorRight className={Styles.ProviderContainerDecorator} /></div>
            </div>

    </> : <p>loading</p>)
};

export default MagScrollProvider;
