import React from 'react';
import {Theme} from "@radix-ui/themes";

const MainTheme = ({children}: {children: any}) => {
    return (
        <Theme appearance={'dark'} style={{width: '100%', display: 'flex', alignItems: 'center'}}>
            {children}
        </Theme>
    );
};

export default MainTheme;