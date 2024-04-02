// FortniteAddonsList.js
import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { add, remove } from 'ionicons/icons';
import "./fortnite-add-ons-list.css"
const FortniteAddonsList = ({ addons, onAddonClick }) => {
    const [selectedAddons, setSelectedAddons] = useState([]);

    const handleAddonClick = (addon) => {
        const isAddonSelected = selectedAddons.includes(addon);

        if (isAddonSelected) {
            setSelectedAddons(selectedAddons.filter((selected) => selected !== addon));
        } else {
            setSelectedAddons([...selectedAddons, addon]);
        }

        if (onAddonClick) {
            onAddonClick(selectedAddons);
        }
    };

    const handleIncrement = (addon) => {
        const updatedAddons = selectedAddons.map((selected) =>
            selected === addon ? { ...selected, quantity: (selected.quantity || 0) + 1 } : selected
        );

        setSelectedAddons(updatedAddons);

        if (onAddonClick) {
            onAddonClick(updatedAddons);
        }
    };

    const handleDecrement = (addon) => {
        const updatedAddons = selectedAddons.map((selected) =>
            selected === addon ? { ...selected, quantity: Math.max((selected.quantity || 0) - 1, 0) } : selected
        );

        setSelectedAddons(updatedAddons);

        if (onAddonClick) {
            onAddonClick(updatedAddons);
        }
    };

    return (
        <div className="fortnite-addons-list">
            {addons.map((addon) => (
                <div
                    key={addon.name}
                    className={`fortnite-addon-item ${selectedAddons.includes(addon) ? 'selected' : ''}`}
                    onClick={() => handleAddonClick(addon)}
                >
                    <div className="addon-image">
                        <img src={addon.imageUrl} alt={addon.name} />
                    </div>
                    <div className="addon-info">
                        <span>{addon.name}</span>
                        <span>${addon.price.toFixed(2)}</span>
                    </div>
                    <div className="addon-controls">
                        <button className="control-button" onClick={() => handleDecrement(addon)}>
                            <IonIcon icon={remove} />
                        </button>
                        <span className="quantity">{addon.quantity || 0}</span>
                        <button className="control-button" onClick={() => handleIncrement(addon)}>
                            <IonIcon icon={add} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FortniteAddonsList;
