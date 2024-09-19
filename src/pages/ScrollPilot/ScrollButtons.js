import React from "react";
import Styles from "./ScrollPilot.module.css";

const ScrollButtons = ({ onScrollUp, onScrollDown }) => {
    return (<>
        <div className={`${Styles.ScrollButtonContainer}`}>
            <button className={Styles.ScrollButton} onClick={onScrollUp}>↑</button>
            <button className={Styles.ScrollButton} onClick={onScrollDown}>↓</button>
        </div>
    </>);
};

export default ScrollButtons;