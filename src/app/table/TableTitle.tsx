'use client';
import React from 'react';
import {useSelector} from "react-redux";
import {selectUsername} from "../../lib/store/selectors/user.selectors";
import AnimatedText from "@shared/animations/text/AnimatedText";

const TableTitle = () => {
    const username = useSelector(selectUsername);
    return (
        <h1 className={'min-h-[80px] text-5xl flex justify-center items-start'}>
            <AnimatedText whitespace={15}
                          jump={true}
                          delay={30}
            >
                Hello, {username}
            </AnimatedText>
        </h1>
    );
};

export default TableTitle;