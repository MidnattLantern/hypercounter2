import React from "react";
// styles
import Styles from "./ExponentSelectionMenu.module.css";
import "../../global.css";

const ExponentSelectionMenu = ({setSelectedExponent}) => {

    return(<>
        <div className={Styles.ExponentSelectionMenuModule}>
            <p className={Styles.ExponentOption} id={3} onClick={() => setSelectedExponent(3)}>3</p>
            <p className={Styles.ExponentOption} id={2} onClick={() => setSelectedExponent(2)}>2</p>
            <p className={Styles.ExponentOption} id={1} onClick={() => setSelectedExponent(1)}>1</p>
            <p className={Styles.ExponentOption} id={-1} onClick={() => setSelectedExponent(-1)}>-1</p>
        </div>
    </>)
};

export default ExponentSelectionMenu;
