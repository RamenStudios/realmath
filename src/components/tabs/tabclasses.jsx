import { FunctionInputContainer } from "./inputTypes/function"
import { useRef, useState, useEffect } from 'react';

// makes setting alias and input field faster
const InputCards    =   {
                            'Func'  :   {'alias': 1, 'card': FunctionInputContainer, 'props': {'left':null, 'right':null}},
                            'Pt'    :   {'alias': 2, 'card': null, 'props': {'x':null, 'y':null, 'z': null}},
                            'Vec'   :   {'alias': 3, 'card': null, 'props': {'left':'x', 'right':'z'}},
                            'VFld'  :   {'alias': 4, 'card': null, 'props': {'left':'x', 'right':'z'}},
                            'SCrv'  :   {'alias': 5, 'card': null, 'props': {'left':'x', 'right':'z'}}
                        }

export class Tab
{
    constructor(type, index, numtabs)
    {
        this.index = index
        this.type = InputCards[type].alias
        this.name = `${type} ${index}`
        this.card = InputCards[type].card
        this.props = {...InputCards[type].props}
        this.selected = numtabs === 0 ? true : false
        this.value = null
        this.setUpdate()
    }
    // just makes life easier tbh
    select()
    {
        this.selected = true
    }
    deselect()
    {
        this.selected = false
    }
    // caches value, making it accessible even when another tab is shown
    setUpdate()
    {
        this.update = () => 
        {
            /* switch case is for object data saving */
            switch(this.type) 
            {
                case 1:     
                    // in case of function, have l/r props and if possible pull both sides of eq
                    try{
                        console.log(document.getElementById('leftMathField').getValue('latex'))
                        this.props.left = document.getElementById('leftMathField').getValue('latex')
                        this.props.right = document.getElementById('rightMathField').getValue('latex')
                        this.value = `${this.props.left}=${this.props.right}`
                        console.log(this.value)
                        console.log(this.props)
                    }catch(error){
                        console.log(error)
                    }
                    break;
                case 2:
                    // in case of singular point, get coords
                    break;
                case 3:
                    // in case of vector,
                    break;
                case 4:
                    // in case of vector field, 
                    break;
                case 5:
                    // in case of space curve, 
                    break;
                default:
                    // failsafe
                    console.log(`error updating value for tab ${this.name}!`)
            };
            /* if it has already been loaded, we attach new data to the div cache */
            try{
                const inputData = document.getElementById('inputData')
                const current = JSON.parse(inputData.getAttribute('value'))
                const newtab = {}
                newtab[this.name] = {'value': this.value, 'props': this.props}
                inputData.setAttribute('value', JSON.stringify({...current, ...newtab}))
            }catch(error){
                console.log(error)
            }
        }
    }
    // passes any necessary input to display container before user sees it
    display()
    {
        console.log(this.props)
        return(
            <>{this.card(this.props, this)}</>
        )
    }
}

/* ************************************ */
export class TabTracker
{
    constructor(type, defaultIn=false)
    {
        this.type = type
        this.current = {}
        this.index = 0
        if(defaultIn)
        {
            this.add(0)
        }
    }
    getTabs()
    {
        let tempreturn = {}
        for (const [key, value] of Object.entries(this.current))
        {
            if(!(value.selected)){
                tempreturn[value.name] = value
            }
        }
        return tempreturn
    }
    add(numtabs)
    {
        this.index += 1
        /* add new element */
        this.current[this.index]=new Tab(this.type, this.index, numtabs)
        console.log("NEW ELEMENT")
        console.log(this.current[this.index])
    }
    remove(index)
    {
        this.current.delete(index)
        this.index = index
        this.update()
    }
}

/* ************************************ */
// clunky implementation but whatever right now
export const getTabObjects = (trackerCollection) =>
{
    let tempreturn = {}
    console.log(trackerCollection)
    Object.keys(trackerCollection).forEach((type) =>
    {
        const tracker = trackerCollection[type]
        console.log(tracker)
        for (const [key, value] of Object.entries(tracker.current)){
            tempreturn[value.name] = value
        }
    })
    return tempreturn
}

export const getTabStringify = (trackerCollection) =>
{
    let tempreturn = {}
    for (const [name, tracker] of Object.entries(trackerCollection)){
        for (const [key, value] of Object.entries(tracker.current)){
            tempreturn[value.name] = value.value
        }
    }
    console.log(JSON.stringify(tempreturn))
    return JSON.stringify(tempreturn)
}