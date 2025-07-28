import React from "react";

type LabelProps = {
    children: React.ReactNode;
}
export function Label({children}: LabelProps) {
    return (
        <h1
            className={"font-bold text-2xl text-black"}
        >
            {children}
        </h1>
    )
}