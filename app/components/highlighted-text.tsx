"use client"

import React from "react";

interface Props {
    text: string;
    highlight: string;
}

export const HighlightedText: React.FC<Props> = ({ text, highlight }) => {

    const regex = new RegExp(`(${highlight})`, "i");
    const parts = text.split(regex);

    return (
        <h1 className="text-xl">
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    {index % 2 === 1 && (
                        <span className="font-extrabold">{part}</span>
                    )}
                    {index % 2 === 0 && part}
                </React.Fragment>
            ))}
        </h1>
    );
};
