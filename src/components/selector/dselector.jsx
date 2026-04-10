import { SelectorDropdown } from "./selectorDropdown"
import { SelectorAdd } from "./selectorAdd"
import { SelectorDefine } from "./selectorDefine"
import { GraphComponents } from '../../common/utilities/graphComponents'
import { useState, useEffect, useRef } from "react"

export const Selector = ({setmodal, userframe, setTrigger, updateSelectedRef}) =>
{
    console.log(`DSELECTOR`)

	const [selection, setSelection] = useState('Function (xyz)')
	
	const selectEvent = (key) => {
		setSelection(key)
	}
	
	const defineSelection = () => {
		updateSelectedRef(selection)
		setmodal(`${selection} Definition`, `${GraphComponents[selection]['def']}`)
	}
	
	const addSelection = () => {
		setTrigger('add', true)
	}
	
    if(userframe === 'desktop'){
        return(
            <div className="row">
                <div className="col-lg-7 col-sm-12 mb-2"><SelectorDropdown setSelection={selectEvent}/></div>
                <div className="col-lg-2 col-sm-6 mb-2"><SelectorDefine userframe={userframe} defineSelection={defineSelection}/></div>
                <div className="col-lg-2 col-sm-6 mb-2"><SelectorAdd userframe={userframe} setTrigger={addSelection}/></div>
            </div>
        )
    }else{
        return(
            <><div className="row"><SelectorDropdown/></div>
            <div className="row mt-2"><SelectorDefine userframe={userframe} setmodal={setmodal}/></div>
            <div className="row mt-2"><SelectorAdd userframe={userframe} setTrigger={addSelection}/></div></>
        )
    }
}