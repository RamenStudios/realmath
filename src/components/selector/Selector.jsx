import { SelectorDropdown } from "./selectorDropdown"
import { SelectorAdd } from "./selectorAdd"
import { SelectorDefine } from "./selectorDefine"
import { useState, useEffect, useRef } from "react"

export const Selector = ({parentDispatch, userframe, GraphKeys}) =>
{
    console.log(`DSELECTOR`)

	const defineSelection = (selection = 0) => {
        console.log(`selection is ${selection}`)
		parentDispatch({
            type: 'DEF',
            component: selection,
            vis: true,
        })
	}
	
	const addSelection = (selection) => {
		parentDispatch({
            type: 'ADD',
            component: selection,
        })
	}
	
    if(userframe === 'desktop'){
        return(
            <div className="row">
                <div className="col-lg-7 col-sm-12 mb-2"><SelectorDropdown GraphKeys={GraphKeys}/></div>
                <div className="col-lg-2 col-sm-6 mb-2"><SelectorDefine userframe={userframe} defineSelection={defineSelection}/></div>
                <div className="col-lg-2 col-sm-6 mb-2"><SelectorAdd userframe={userframe} addSelection={addSelection}/></div>
            </div>
        )
    }else{
        return(
            <><div className="row"><SelectorDropdown GraphKeys={GraphKeys}/></div>
            <div className="row mt-2"><SelectorDefine userframe={userframe} defineSelection={defineSelection}/></div>
            <div className="row mt-2"><SelectorAdd userframe={userframe} addSelection={addSelection}/></div></>
        )
    }
}