// technologies
import React from "react";
import { useExpression } from "../../context/ExpressionContext";
//^

// graphics
import Styles from "./ContextMenu.module.css"
//^

const ContextMenu = () => {
    // states
    const { expressionArray, selectedTermIndex } = useExpression();
    //^

    // Find the selected term based on the selectedTermIndex
    const selectedTerm = expressionArray.find(entity => entity.term_index === selectedTermIndex);

    return(<>
        <div className={Styles.ContextMenuContainer}>

            {selectedTerm ? (<>

                <div className={Styles.DiverseContextContainer}>
                    <table>
                        <tr>
                            <td>Existing terms</td>
                            <td>: {expressionArray.length}</td>
                        </tr>
                        <tr>
                            <td>Key</td>
                            <td>: {selectedTerm.term_index}</td>
                        </tr>
                    </table>
                </div>
            
                <div className={Styles.TermDataContextContainer}>
                    <table>
                        <tr>
                            <td>Coefficient Value</td>
                            <td>: {selectedTerm.term_coefficient}</td>
                        </tr>
                        <tr>
                            <td>Variable Value</td>
                            <td>: {selectedTerm.term_variable}</td>
                        </tr>
                        <tr>
                            <td>Exponent Value</td>
                            <td>: {selectedTerm.term_exponent}</td>
                        </tr>
                    </table>
                    <br/>
                    <table>
                        <tr>
                            <td>Coefficient Type</td>
                            <td>: {typeof selectedTerm.term_coefficient}</td>
                        </tr>
                        <tr>
                            <td>Variable Type</td>
                            <td>: {typeof selectedTerm.term_variable}</td>
                        </tr>
                        <tr>
                            <td>Exponent Type</td>
                            <td>: {typeof selectedTerm.term_exponent}</td>
                        </tr>
                    </table>
                    <br/>
                    <table>
                        <tr>
                            <td>Coefficient Location</td>
                            <td>: {selectedTerm.scroll_memory_coefficient}</td>
                        </tr>
                        <tr>
                            <td>Variable Location</td>
                            <td>: {selectedTerm.scroll_memory_variable}</td>
                        </tr>
                        <tr>
                            <td>Exponent Location</td>
                            <td>: {selectedTerm.scroll_memory_exponent}</td>
                        </tr>
                    </table>
                </div>

            </>) : (<>
                <div className={Styles.DiverseContextContainer}>
                    <td>No selected term</td>
                </div>
                <div className={Styles.TermDataContextContainer}>
                    <td>No selected term</td>
                </div>
            </>)}

            <div className={Styles.FooterLinksContainer}>
                    <table>
                        <tr>
                            <td>Alma Isaksson aka MidnattLantern</td>
                            <td>- 2024</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>: <a href="https://midnattlantern.github.io/ali_resume/" target="_blank" rel="noopener noreferrer">midnattlantern.github.io</a></td>
                        </tr>
                        <tr>
                            <td>Github repository</td>
                            <td>: <a href="https://github.com/MidnattLantern/hypercounter2/" target="_blank" rel="noopener noreferrer">github.com/hypercounter</a></td>
                        </tr>
                    </table>
                </div>

        </div>
    </>)
};

export default ContextMenu;