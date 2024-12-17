import { createContext } from "react";
import { item_list } from "../assets/assets";

export const DemoStorecontext = createContext(null)

const DemoStorecontextProvider = (props) =>{


    const contextValue = {
        item_list
    }

    return(
        <DemoStorecontext.Provider value = {contextValue}>
            {props.children}
        </DemoStorecontext.Provider>
    )
}

export default DemoStorecontextProvider