import React, { useState } from 'react';
import { Switch } from 'antd';

export const SlideToggle = ({ text, onChange }) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (checked) => {
        setChecked(checked);
        if (onChange) {
            onChange(checked);
        }
    };

    return (
        <div className='flex flex-row gap-2 items-center whitespace-nowrap'>
            <Switch checked={checked} onChange={handleChange} />
            <span>{text}</span>

        </div>
    );
};