import React, { useState } from "react";
import ScrollPilot from "./ScrollPilot";
import ScrollPilot2 from "./ScrollPilot2";
import ScrollPilot3 from "./ScrollPilot3";
import Styles from "./ScrollPilot.module.css";

const ScrollPilotProvider = () => {
    const [globalValue1, setGlobalValue1] = useState(null);
    const [globalValue2, setGlobalValue2] = useState(null);
    const [globalValue3, setGlobalValue3] = useState(null);
    const [focusPilot, setFocusPilot] = useState(null);

    const renderFocusedComponent = () => {
        switch(focusPilot) {
            case 1:
                return <ScrollPilot setGlobalValue1={setGlobalValue1}/>;
            case 2:
                return <ScrollPilot2 setGlobalValue2={setGlobalValue2}/>;
            case 3:
                return <ScrollPilot3 setGlobalValue3={setGlobalValue3}/>;
            default:
                return null
        }
    }

    return(<>
    <p>globalValue1: {globalValue1}</p>
    <p>globalValue2: {globalValue2}</p>
    <p>globalValue3: {globalValue3}</p>

    <div className={Styles.ScrollPilotProviderModule}>
        <div className={Styles.ItemContainer}>
            <p className={`${Styles.ItemProvider} ${focusPilot === 1 ? Styles.ItemProviderActive : null}`} onClick={() => {setFocusPilot(1)}}>{globalValue1}</p>
            <p className={`${Styles.ItemProvider} ${focusPilot === 2 ? Styles.ItemProviderActive : null}`} onClick={() => {setFocusPilot(2)}}>{globalValue2}</p>
            <p className={`${Styles.ItemProvider} ${focusPilot === 3 ? Styles.ItemProviderActive : null}`} onClick={() => {setFocusPilot(3)}}>{globalValue3}</p>
        </div>
        {renderFocusedComponent()}
    </div>

    <button onClick={() => {setFocusPilot(null)}}>close</button>
    </>)
};

export default ScrollPilotProvider;
