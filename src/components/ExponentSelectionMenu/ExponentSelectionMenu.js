import React from "react";
// styles
import Styles from "./ExponentSelectionMenu.module.css";
import "../../global.css";

const ExponentSelectionMenu = ({setSelectedExponent}) => {

    return(<>
        <div className={Styles.ExponentSelectionMenuModule}>
            <p className={Styles.ExponentOption} onClick={() => setSelectedExponent(3)}>3</p>
            <p className={Styles.ExponentOption} onClick={() => setSelectedExponent(2)}>2</p>
            <p className={Styles.ExponentOption} onClick={() => setSelectedExponent(1)}>1</p>
            <p className={Styles.ExponentOption} onClick={() => setSelectedExponent(-1)}>-1</p>
        </div>
    </>)
};

export default ExponentSelectionMenu;
