import { SelectorDropdown } from "./selectorDropdown"
import { SelectorAdd } from "./selectorAdd"
import { SelectorDefine } from "./selectorDefine"
import { GraphComponents } from '../../common/utilities/graphComponents'
import { useState, useEffect, useRef } from "react"

export const Selector = ({setModal, userframe, setTrigger, eventTrigger, updateSelectedRef}) =>
{
    console.log(`DSELECTOR ${eventTrigger}`)
	
	const defineSelection = (selection = 'Function (xyz)') => {
		setModal(`${selection} Definition`, `${GraphComponents[selection]['def']}`)
		updateSelectedRef(selection)
	}
	
	const addSelection = (selection) => {
		setTrigger(0, true, false)
		updateSelectedRef(selection)
	}
	
    if(userframe === 'desktop'){
        return(
            <div className="row">
                <div className="col-lg-7 col-sm-12 mb-2"><SelectorDropdown/></div>
                <div className="col-lg-2 col-sm-6 mb-2"><SelectorDefine userframe={userframe} defineSelection={defineSelection}/></div>
                <div className="col-lg-2 col-sm-6 mb-2"><SelectorAdd userframe={userframe} addSelection={addSelection}/></div>
            </div>
        )
    }else{
        return(
            <><div className="row"><SelectorDropdown/></div>
            <div className="row mt-2"><SelectorDefine userframe={userframe} defineSelection={defineSelection}/></div>
            <div className="row mt-2"><SelectorAdd userframe={userframe} addSelection={addSelection}/></div></>
        )
    }
}