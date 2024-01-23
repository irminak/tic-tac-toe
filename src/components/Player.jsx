import React from 'react';
import { useState } from 'react';

const Player = ({ initialName, symbol, isActive }) => {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const handleClick = () => {
        setIsEditing((editing) => !editing);
    };
    const handleChange = ({ target }) => {
        setPlayerName(target.value);
    };

    let editablePlayerName = <span className='player-name'>{playerName}</span>;

    if (isEditing) {
        editablePlayerName = (
            <input
                type='text'
                value={playerName}
                onChange={handleChange}
                required
            />
        );
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>{editablePlayerName}</span>
            <span className='player-symbol'>{symbol}</span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
};

export default Player;
