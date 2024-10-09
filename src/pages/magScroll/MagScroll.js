// technologies
import { useCallback, useEffect, useRef, useState } from "react";
import { useExpression } from "../../context/ExpressionContext";
//^

// graphics
import Styles from "./ScrollPilot.module.css";
import { ReactComponent as HighLighterAsset } from "../../assets/highlighter.svg";
import { ReactComponent as ClearIcon} from "../../assets/clear-icon.svg";
//^

const MagScroll = ({ globalValue, setGlobalValue, memoryIndex, selectedIndex, setMemoryIndex, library }) => {
    // states
    const { editTerm } = useExpression();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [showHighlighter, setShowHighlighter] = useState(false);
    const [localValue, setLocalValue] = useState(null);
    const [localLibrary, setLocalLibrary] = useState([]);
    const scrollContainerRef = useRef(null);
    const localLibraryItemsRef = useRef([]);
    const [scrollToValue, setScrollToValue] = useState(true);
    //^

    // handle actions
    const handleSetValue = useCallback((value, index) => {
        const scrollableDiv = document.getElementById((index - 2).toString());
        if (scrollableDiv) {
            scrollableDiv.scrollIntoView({behavior: "smooth"})
        };
        setLocalValue(value);
        setGlobalValue(value, index);
        setMemoryIndex(index);
        editTerm(selectedIndex, value);
    }, [setGlobalValue, setMemoryIndex, editTerm, selectedIndex]);

    const handleScroll = useCallback(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const { scrollTop } = container;

            localLibrary.forEach((value, index) => {
                const item = localLibraryItemsRef.current[index];
                if (item) {
                    const { offsetTop } = item;
                    const closestValue = offsetTop - scrollTop - 100;
                    if (closestValue < 25 && closestValue > -26) {
                        handleSetValue(value, index);
                    };
                };
            });
        };
    }, [handleSetValue, localLibrary]);
    //^

    // effect
    useEffect(() => {
        if (hasLoaded) {
            setTimeout(() => {
                setShowHighlighter(true);
            }, 400);

            if(scrollToValue) {
                handleSetValue(globalValue, memoryIndex);
                setScrollToValue(false);
            };

            const container = scrollContainerRef.current;
            let timeoutId = setTimeout;
    
            const scrollListener = () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                };
                timeoutId = setTimeout(() => {
                    handleScroll();
                }, 500);
            };
            if (container) {
                container.addEventListener("scroll", scrollListener);
            }
            return () => {
                if (container) {
                    container.removeEventListener("scroll", scrollListener);
                }
            };
        };

        if (library.length !== 0) {
            setLocalLibrary(library);
        } else {
            setLocalLibrary([null]);
        };

        setLocalValue(globalValue);
        setHasLoaded(true);

    }, [
        globalValue,
        library,
        memoryIndex,
        handleScroll,
        handleSetValue,
        hasLoaded,
        localValue,
        scrollToValue,
    ]);
    //^

    // local components
    const highlighterComponent = () => {
        return(<>
            <div className={Styles.HighlighterFrame}>
                <HighLighterAsset className={`${showHighlighter ? Styles.Highlighter : Styles.HideHighlighter}`}/>
            </div>
        </>)
    };

    const libraryItemsComponent = () => {
        return(<>
            <button id="-2" className={Styles.LibraryItem}/>
            <button id="-1" className={Styles.LibraryItem}/>
            {localLibrary.map((id, index) => (
                <div
                key={`${id}-${index}`}
                id={(index ?? 'null').toString()}
                ref={(el) => (localLibraryItemsRef.current[index] = el)}
                >
                    <button
                        className={Styles.LibraryItem}
                        id={index.toString()}
                        onClick={() => {handleSetValue(id, index)}}
                    >{id === null ?  <ClearIcon className={Styles.ClearIcon}/> : id}</button>
                </div>
            ))}
            <button className={Styles.LibraryItem}/>
            <button className={Styles.LibraryItem}/>
        </>)
    };
    //^

    return(<>
        <div ref={scrollContainerRef} className={`${hasLoaded ? Styles.AlignScrollContainer : Styles.LoadingContainer}`}>
            {highlighterComponent()}
            {hasLoaded ? (<>

                <div className={Styles.ScrollContainer}>
                    {libraryItemsComponent()}
                </div>

            </>) : (<>

            </>)}
        </div>
    </>)
};

export default MagScroll;