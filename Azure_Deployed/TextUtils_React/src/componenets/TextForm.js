import React, { useState } from 'react';

export default function TextForm(props) {

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Uppercase", "success");
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lowercase", "success");
    };

    const clearText = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text is cleared", "success");
    };

    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Speaking...", "success");
    };

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed", "success");
    };

    const handleCopy = () => {
        var text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        document.getSelection().removeAllRanges();
        props.showAlert("Copied to clipboard", "success");
    };

    const handleReverse = () => {
        let newText = text.split("").reverse().join("");
        setText(newText);
        props.showAlert("Text is reversed", "success");
    };

    const handleCapitalizeFirst = () => {
        let newText = text.replace(/\b\w/g, (char) => char.toUpperCase());
        setText(newText);
        props.showAlert("First letters capitalized", "success");
    };

    const handleFindReplace = () => {
        if (text.includes(findText)) {
            let newText = text.replaceAll(findText, replaceText);
            setText(newText);
            props.showAlert(`Replaced '${findText}' with '${replaceText}'`, "success");
        } else {
            props.showAlert("Text not found", "warning");
        }
    };

    const handleAlternateCase = () => {
        let newText = text.split('').map((char, index) => {
            return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        }).join('');
        setText(newText);
        props.showAlert("Alternated case", "success");
    };

    const handleRemoveVowels = () => {
        let newText = text.replace(/[aeiouAEIOU]/g, '');
        setText(newText);
        props.showAlert("Removed vowels", "success");
    };

    const countVowelsAndConsonants = () => {
        let vowels = text.match(/[aeiouAEIOU]/g)?.length || 0;
        let consonants = text.match(/[^aeiouAEIOU\s\d]/g)?.length || 0;
        props.showAlert(`Vowels: ${vowels}, Consonants: ${consonants}`, "success");
    };

    const [text, setText] = useState('');
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [showFindReplace, setShowFindReplace] = useState(false);

    const toggleFindReplace = () => {
        setShowFindReplace(!showFindReplace);
    };

    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }} id="myBox" rows="8"></textarea>
                </div>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert To Uppercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleLoClick}>Convert To Lowercase</button>
                <button disabled={text.length === 0} type="submit" className="btn btn-primary mx-2" onClick={speak}>Speak</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={clearText}>Clear</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleReverse}>Reverse Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleCapitalizeFirst}>Capitalize First Letters</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleAlternateCase}>Alternate Case</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleRemoveVowels}>Remove Vowels</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={countVowelsAndConsonants}>Count Vowels and Consonants</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={toggleFindReplace}>Find and Replace</button>
                {showFindReplace && (
                    <>
                        <input className="form-control my-2" type="text" value={findText} onChange={(e) => setFindText(e.target.value)} placeholder="Find text" />
                        <input className="form-control my-2" type="text" value={replaceText} onChange={(e) => setReplaceText(e.target.value)} placeholder="Replace with" />
                        <button disabled={text.length === 0 || findText.length === 0 || replaceText.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleFindReplace}>Apply Find and Replace</button>
                    </>
                )}
            </div>
            <div className="container my-2" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h2>Your text summary</h2>
                <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").filter((element) => { return element.length !== 0 }).length} Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview"}</p>
            </div>
        </>
    );
}
