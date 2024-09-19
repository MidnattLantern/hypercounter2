import React, { useEffect } from "react";
import Styles from "./ScrollPilot.module.css";
import "../../global.css";
import useScrollSnap from "./useScrollSnap";

const ScrollPilot2 = ({setGlobalValue2}) => {
    const snapToCellValue = 4.1; // snap to neutral upon opening

    const { scrollContainerRef, selectedContent } = useScrollSnap({ snapToCell: snapToCellValue });

    useEffect(() => {
        setGlobalValue2(selectedContent)
    }, [selectedContent, setGlobalValue2]);

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
            <div className={`${Styles.ScrollButtonContainer}`}>
                <button className={Styles.ScrollButton} onClick={() => {scrollBy50Pixels(-1)}}>↑</button>
                <button className={Styles.ScrollButton} onClick={() => {scrollBy50Pixels(1)}}>↓</button>
            </div>
        </>);
    };

    return (<>

    <div className={Styles.SomeDiv}>
        <div ref={scrollContainerRef} className={Styles.ScrollPilotModule}>
            <div className={Styles.SomeContent}/>
            <div className={Styles.SomeContent}/>

            {["h", "c", "d", "s", null].map(id => (
                <div key={id} id={id} className={Styles.SomeContent}>
                    <p>{`${id}`}</p>
                </div>
            ))}

            <div className={Styles.SomeContent}/>
            <div className={Styles.SomeContent}/>
        </div>
        <div className={Styles.HighlightBox}/>
        {scrollButtons()}
    </div>


    <p>selected content: {selectedContent}</p>
    </>);
};

export default ScrollPilot2;
