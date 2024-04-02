import React from 'react';
import "./riot-button.css"
const RiotButton = ({ label, onClick }) => {
    return (
        <button className="riot-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default RiotButton;