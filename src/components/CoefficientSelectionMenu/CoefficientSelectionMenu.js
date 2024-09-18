import React from "react";
// styles
import Styles from "./CoefficientSelectionMenu.module.css";
import "../../global.css";

const CoefficientSelectionMenu = ({setSelectedCoefficient}) => {

    return(<>
        <div className={Styles.CoefficientSelectionMenuModule}>
            <p className={Styles.CoefficientOption} id={10} onClick={() => setSelectedCoefficient(10)}>10</p>
            <p className={Styles.CoefficientOption} id={3} onClick={() => setSelectedCoefficient(3)}>3</p>
            <p className={Styles.CoefficientOption} id={2} onClick={() => setSelectedCoefficient(2)}>2</p>
            <p className={Styles.CoefficientOption} id={1} onClick={() => setSelectedCoefficient(1)}>1</p>
            <p className={Styles.CoefficientOption} id={0} onClick={() => setSelectedCoefficient(0)}>0</p>
            <p className={Styles.CoefficientOption} id={-1} onClick={() => setSelectedCoefficient(-1)}>-1</p>
        </div>
    </>)
};

export default CoefficientSelectionMenu;
