import React, { useEffect } from "react";
import Styles from "./ScrollPilot.module.css";
import "../../global.css";
import useScrollSnap from "./useScrollSnap";

const ScrollPilot3 = ({setGlobalValue3}) => {
    const snapToCellValue = 2.1; // snap to neutral upon opening
    const { scrollContainerRef, selectedContent } = useScrollSnap({ snapToCell: snapToCellValue });

    useEffect(() => {
        setGlobalValue3(selectedContent)
    }, [selectedContent, setGlobalValue3]);

    const scrollBy50Pixels = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                top: direction * 52, // 52 instead of 50 for CSS
                behavior: "smooth",
            })
        };
    };

    const scrollButtons = () => {
        return (<>
            <div className={`${Styles.ScrollButtonContainer} ${Styles.AlignScrollButtonForExponent}`}>
                <button className={Styles.ScrollButton} onClick={() => {scrollBy50Pixels(-1)}}>↑</button>
                <button className={Styles.ScrollButton} onClick={() => {scrollBy50Pixels(1)}}>↓</button>
            </div>
        </>);
    }

    return (<>

    <div className={Styles.SomeDiv}>
        <div ref={scrollContainerRef} className={Styles.ScrollPilotModule}>
            <div className={`${Styles.SomeContent} ${Styles.AlignForExponent}`}/>
            <div className={`${Styles.SomeContent} ${Styles.AlignForExponent}`}/>

            {[3, 2, 1, -1].map(id => (
                <div key={id} id={id} className={`${Styles.SomeContent} ${Styles.AlignForExponent}`}>
                    <p>{`${id}`}</p>
                </div>
            ))}

            <div className={`${Styles.SomeContent} ${Styles.AlignForExponent}`}/>
            <div className={`${Styles.SomeContent} ${Styles.AlignForExponent}`}/>
        </div>
        {scrollButtons()}
        <div className={Styles.HighlightBox}/>

    </div>

    <p>selected content: {selectedContent}</p>
    </>);
};

export default ScrollPilot3;
