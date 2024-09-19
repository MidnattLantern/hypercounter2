import React, { useEffect } from "react";
import Styles from "./ScrollPilot.module.css";
import "../../global.css";
import useScrollSnap from "./useScrollSnap";

const ScrollPilot = ({setGlobalValue1}) => {
    const snapToCellValue = 3.1; // snap to neutral upon opening

    const { scrollContainerRef, selectedContent } = useScrollSnap({ snapToCell: snapToCellValue });

    useEffect(() => {
        setGlobalValue1(selectedContent)
    }, [selectedContent, setGlobalValue1]);

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
            <div className={`${Styles.ScrollButtonContainer} ${Styles.AlignScrollButtonForCoefficient}`}>
                <button className={Styles.ScrollButton} onClick={() => {scrollBy50Pixels(-1)}}>↑</button>
                <button className={Styles.ScrollButton} onClick={() => {scrollBy50Pixels(1)}}>↓</button>
            </div>
        </>);
    };

    return (<>

    <div className={Styles.SomeDiv}>
        <div ref={scrollContainerRef} className={Styles.ScrollPilotModule}>
            <div className={`${Styles.SomeContent} ${Styles.AlignForCoefficient}`}/>
            <div className={`${Styles.SomeContent} ${Styles.AlignForCoefficient}`}/>

            {[10, 3, 2, 1, 0, -1].map(id => (
                <div key={id} id={id} className={`${Styles.SomeContent} ${Styles.AlignForCoefficient}`}>
                    <p>{`${id}`}</p>
                </div>
            ))}

            <div className={`${Styles.SomeContent} ${Styles.AlignForCoefficient}`}/>
            <div className={`${Styles.SomeContent} ${Styles.AlignForCoefficient}`}/>
        </div>
        <div className={Styles.HighlightBox}/>
        {scrollButtons()}
    </div>

    <p>selected content: {selectedContent}</p>
    </>);
};

export default ScrollPilot;
