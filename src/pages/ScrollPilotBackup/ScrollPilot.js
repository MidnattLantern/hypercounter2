import React, { useEffect, useRef, useState } from "react";
import Styles from "./ScrollPilot.module.css";
import "../../global.css";

const ScrollPilot = () => {
    const scrollContainerRef = useRef(null); // To reference the <div>
    const [selectedContent, setSelectedContent] = useState(null);


    // Function to handle the snapping logic
    const handleScroll = () => {
        if (scrollContainerRef.current) { // save resources if this DOM doesn't exist

            // Get the container's scroll position and size
            const container = scrollContainerRef.current;
            const { scrollTop, clientHeight } = container;

            // Get all the box elements
            const boxes = container.querySelectorAll(`.${Styles.SomeContent}`);
            
            // Calculate the center position of the container
            const containerCenter = scrollTop + clientHeight / 2;

            let closestBox = null;
            let closestBoxDistance = Infinity;


            // Loop through all boxes to find the closest one to the center
            boxes.forEach((box) => {
                const boxTop = box.offsetTop;
                const boxHeight = box.offsetHeight;
                const boxCenter = boxTop + boxHeight / 2;
                
                // Calculate the distance between box center and container center
                const distance = Math.abs(containerCenter - boxCenter);
                
                if (distance < closestBoxDistance) {
                    closestBoxDistance = distance;
                    closestBox = box;
                    console.log("test:",closestBoxDistance);
                };
            });

            // Snap to the closest box
            if (closestBox) {
                container.scrollTo({
                    top: closestBox.offsetTop - (clientHeight / 2 - closestBox.offsetHeight / 2) -0.0, // scroll-bar can distrupt the centre distance
                    behavior: "smooth"
                });
            };

            if (closestBoxDistance === 0) { // trigger assignment when closestBoxDistance is 0
                console.log("trigger assignment");
                console.log("assign:", closestBox.id);
                setSelectedContent(closestBox.id);
            }

        };
    };

    useEffect(() => {
        //keyboard
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    scrollUpBy50Pixels();
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    scrollBy50Pixels();
                    break;
                default:
                    break;
                }
            };
        window.addEventListener('keydown', handleKeyDown);

        const container = scrollContainerRef.current; // need to target the <div> DOM element
        let timeoutId; // To enable timer reset while scrolling

        const scrollListener = () => { // For debouncing
            if (timeoutId) { // prevent magsnap while trackpad is being moved
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => { // adding `timeoutId =` enable timer reset (reset when scrolling)
                handleScroll();
            }, 250);
        };

        // Add the scroll event listener
        if (container) {
            container.addEventListener("scroll", scrollListener);
        }

        // Cleanup the event listener and timeout on component unmount
        return () => {
            if (container) {
                container.removeEventListener("scroll", scrollListener);
            }
            if (timeoutId) {
                clearTimeout(timeoutId); // Clean up the timeout when the component unmounts
            }
        };
    }, []);

    const scrollBy50Pixels = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                top: 52, // 52 instead of 50 for CSS
                behavior: "smooth",
            })
        };
    };

    const scrollUpBy50Pixels = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                top: -52, // 52 instead of 50 for CSS
                behavior: "smooth",
            })
        };
    };

    return (<>

    <div className={Styles.SomeDiv}>
        <div ref={scrollContainerRef} className={Styles.ScrollPilotModule}>
            <div className={Styles.SomeContent}/>
            <div className={Styles.SomeContent}/>
            <div id={1} className={Styles.SomeContent}><p>t1</p></div>
            <div id={2} className={Styles.SomeContent}><p>t2</p></div>
            <div id={3} className={Styles.SomeContent}><p>t3</p></div>
            <div id={4} className={Styles.SomeContent}><p>t4</p></div>
            <div id={5} className={Styles.SomeContent}><p>t5</p></div>
            <div id={6} className={Styles.SomeContent}><p>t6</p></div>
            <div id={7} className={Styles.SomeContent}><p>t7</p></div>
            <div className={Styles.SomeContent}/>
            <div className={Styles.SomeContent}/>
        </div>
        <div className={Styles.HighlightBox}/>

        <div className={Styles.ScrollButtonContainer}>
            <button className={Styles.ScrollButton} onClick={scrollUpBy50Pixels}>↑</button>
            <button className={Styles.ScrollButton} onClick={scrollBy50Pixels}>↓</button>
        </div>
    </div>

    <p>selected content: {selectedContent}</p>
    </>);
};

export default ScrollPilot;
