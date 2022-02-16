import {createContext} from "react";
export const DateContext = createContext({
    dateValue: new Date(),
    setDateValue: () => {},
});