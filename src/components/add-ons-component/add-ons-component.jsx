// AddOnsComponent.jsx
import React, { useState } from 'react';

const AddOnsComponent = ({ addOns }) => {
    const [selectedAddOns, setSelectedAddOns] = useState({});
    const [quantities, setQuantities] = useState({});

    const handleAddOnChange = (addOn) => {
        const updatedSelection = { ...selectedAddOns };
        updatedSelection[addOn.id] = !updatedSelection[addOn.id];

        setSelectedAddOns(updatedSelection);
    };

    const handleQuantityChange = (addOn, quantity) => {
        const updatedQuantities = { ...quantities };
        updatedQuantities[addOn.id] = quantity;

        setQuantities(updatedQuantities);
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;

        addOns.forEach((addOn) => {
            if (selectedAddOns[addOn.id]) {
                const quantity = quantities[addOn.id] || 0;
                totalPrice += addOn.price * quantity;
            }
        });

        return totalPrice.toFixed(2);
    };

    return (
        <div>
            <h2>Add-Ons</h2>
            <ul>
                {addOns.map((addOn) => (
                    <li key={addOn.id}>
                        <input
                            type="checkbox"
                            checked={selectedAddOns[addOn.id] || false}
                            onChange={() => handleAddOnChange(addOn)}
                        />
                        {addOn.name} - ${addOn.price.toFixed(2)} per unit
                        <br />
                        Quantity:{' '}
                        <input
                            type="number"
                            min="0"
                            value={quantities[addOn.id] || 0}
                            onChange={(e) => handleQuantityChange(addOn, parseInt(e.target.value))}
                        />
                    </li>
                ))}
            </ul>
            <p>Total Price: ${calculateTotalPrice()}</p>
        </div>
    );
};

export default AddOnsComponent;