'use client'

import React from "react";
import {Provider} from "react-redux";
import {store} from "@/shared";

export default function ({children}: {children: React.ReactNode}) {
    return <Provider store={store}>{children}</Provider>;
}