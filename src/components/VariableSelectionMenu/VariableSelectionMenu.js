import React from "react";
// styles
import Styles from "./VariableSelectionMenu.module.css";
import "../../global.css";

const VariableSelectionMenu = ({setSelectedVariable}) => {

    return(<>
        <div className={Styles.VariableSelectionMenuModule}>
            <p className={Styles.VariableOption} id={""} onClick={() => setSelectedVariable(null)}>---</p>
            <p className={Styles.VariableOption} id={"h"} onClick={() => setSelectedVariable("h")}>♥️</p>
            <p className={Styles.VariableOption} id={"d"} onClick={() => setSelectedVariable("d")}>♦️</p>
            <p className={Styles.VariableOption} id={"s"} onClick={() => setSelectedVariable("s")}>♠️</p>
            <p className={Styles.VariableOption} id={"c"} onClick={() => setSelectedVariable("c")}>♣️</p>
        </div>
        </>)
};

export default VariableSelectionMenu;
