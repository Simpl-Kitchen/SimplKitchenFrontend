import React, { useState } from "react";

import { MultipleSelectList } from 'react-native-dropdown-select-list'

export default function ProfileScreen(props) {
    const userData = {
        firstName: "John",
        lastName: "Doe",
    };

    const [selected, setSelected] = React.useState([]);

    const data = [
        { key: '1', value: 'Dairy' },//, disabled: true },
        { key: '2', value: 'Egg' },
        { key: '3', value: 'Gluten' },
        { key: '4', value: 'Grain' },//, disabled: true },
        { key: '5', value: 'Peanut' },
        { key: '6', value: 'Seafood' },
        { key: '7', value: 'Sesame' },
        { key: '8', value: 'Shellfish' },
        { key: '9', value: 'Soy' },
        { key: '10', value: 'Sulfite' },
        { key: '11', value: 'Tree Nut' },
        { key: '12', value: 'Wheat' },
    ]

    return (
        <MultipleSelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            onSelect={() => alert(selected)}
            label="Categories"
        />
    )
}
