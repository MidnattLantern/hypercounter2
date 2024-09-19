import React, { useState } from "react";
import ScrollPilot from "./ScrollPilot";
import ScrollPilot2 from "./ScrollPilot2";
import ScrollPilot3 from "./ScrollPilot3";

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
                return <p>Select a component</p>
        }
    }

    return(<>
    <p>globalValue1: {globalValue1}</p>
    <p>globalValue2: {globalValue2}</p>
    <p>globalValue3: {globalValue3}</p>

    {renderFocusedComponent()}

        <button onClick={() => {setFocusPilot(1)}}>component 1</button>
        <button onClick={() => {setFocusPilot(2)}}>component 2</button>
        <button onClick={() => {setFocusPilot(3)}}>component 3</button>
        <button onClick={() => {setFocusPilot(null)}}>close</button>
    
    </>)
};

export default ScrollPilotProvider;
