import { configureStore } from "@reduxjs/toolkit";
import usermanage from "../toolkit/slice";

export const store = configureStore({
    reducer : {
        usermanage : usermanage
    }
})