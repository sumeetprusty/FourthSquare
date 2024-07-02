import React from 'react';

export default function About(props) {
    let myStyle = {
        color: props.mode === 'dark' ? 'white' : '#042743',
        backgroundColor: props.mode === 'dark' ? 'rgb(36 74 104)' : 'white',
    }

    return (
        <div className="container">
            <h1 className='my-3' style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>About Us</h1>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Convert Text Functions
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                            <strong>handleUpClick:</strong> Converts the text to uppercase.<br />
                            <strong>handleLoClick:</strong> Converts the text to lowercase.<br />
                            <strong>handleReverse:</strong> Reverses the text.<br />
                            <strong>handleCapitalizeFirst:</strong> Capitalizes the first letter of each word.
                        </div>
                    </div>
                </div>
                <div className="accordion-item" style={myStyle}>
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Text Management Functions
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                            <strong>handleOnChange:</strong> Updates the text state as the user types.<br />
                            <strong>clearText:</strong> Clears the text.<br />
                            <strong>handleExtraSpaces:</strong> Removes extra spaces from the text.<br />
                            <strong>handleCopy:</strong> Copies the text to the clipboard.
                        </div>
                    </div>
                </div>
                <div className="accordion-item" style={myStyle}>
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Special Functions
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                            <strong>speak:</strong> Uses the Web Speech API to speak the text.<br />
                            <strong>handleFindReplace:</strong> Finds and replaces text. Shows an alert if the text to be found is not present.<br />
                            <strong>toggleFindReplace:</strong> Toggles the find and replace input fields.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
