import React, { Component, Fragment } from "react";
import '../styles/Autocomplete.css'

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        };
    }


    onChange = e => {
        const { suggestions, setQuantity } = this.props;
        const userInput = e.currentTarget.value;

        // The value of quantity is the value of whats in this input field
        setQuantity(e.currentTarget.value);


        const filteredSuggestions = suggestions.filter(
            suggestion =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = e => {
        const { setQuantity } = this.props;
        this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText
        });
        
        // quantity is the value of whats in the input field when user clicks on a suggestion
        setQuantity(e.currentTarget.innerText);
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        
        // index is incremented when user press the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        const {quantity} = this.props;

        let suggestionsListComponent;


        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No suggestions available.</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <input
                    className="inputStyle"
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={quantity}
                    placeholder="ex: large, cup, 100grams"
                />
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default Autocomplete;