import React from "react";
// styles
import Styles from "./VariableSelectionMenu.module.css";
import "../../global.css";

const VariableSelectionMenu = ({setSelectedVariable}) => {

    return(<>
        <div className={Styles.VariableSelectionMenuModule}>
            <p className={Styles.VariableOption} onClick={() => setSelectedVariable(null)}>---</p>
            <p className={Styles.VariableOption} onClick={() => setSelectedVariable("h")}>♥️</p>
            <p className={Styles.VariableOption} onClick={() => setSelectedVariable("d")}>♦️</p>
            <p className={Styles.VariableOption} onClick={() => setSelectedVariable("s")}>♠️</p>
            <p className={Styles.VariableOption} onClick={() => setSelectedVariable("c")}>♣️</p>
        </div>
        </>)
};

export default VariableSelectionMenu;
