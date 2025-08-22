import { FunctionInputContainer } from "./inputTypes/function"
import { PointInputContainer } from "./inputTypes/point";
import { VectorInputContainer } from "./inputTypes/vector";
import { useRef, useState, useEffect } from 'react';

// makes setting alias and input field faster
const InputCards    =   {
                            'Func'  :   {
                                'alias': 1, 
                                'card': FunctionInputContainer, 'props': {
                                    'left':null, 
                                    'right':null
                                }
                            },
                            'Pt'    :   {
                                'alias': 2, 
                                'card': PointInputContainer, 
                                'props': {'x': null, 'y': null, 'z': null}
                            },
                            'Vec'   :   {
                                'alias': 3, 
                                'card': VectorInputContainer, 
                                'props': {
                                    'vec': {'x': null, 'y': null, 'z': null}, 
                                    'init': {'x': null, 'y': null, 'z': null}
                                }
                            },
                            'VFld'  :   {
                                'alias': 4, 
                                'card': null, 
                                'props': {
                                    'left':'x', 
                                    'right':'z'
                                }
                            },
                            'SCrv'  :   {
                                'alias': 5, 
                                'card': null, 
                                'props': {
                                    'left':'x', 
                                    'right':'z'
                                }
                            }
                        }

export class Tab
{
    constructor(parent, numtabs)
    {
        this.parent = parent
        this.index = parent.index
        this.type = InputCards[parent.type].alias
        this.name = `${parent.type} ${parent.index}`
        this.card = InputCards[parent.type].card
        this.props = {...InputCards[parent.type].props}
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
                    try{
                        this.props.x = document.getElementById('xMathField').getValue('latex')
                        this.props.y = document.getElementById('yMathField').getValue('latex')
                        this.props.z = document.getElementById('zMathField').getValue('latex')
                        this.value = `(${this.props.x}, ${this.props.y}, ${this.props.z})`
                        console.log(this.value)
                        console.log(this.props)
                    }catch(error){
                        console.log(error)
                    }
                    break;
                case 3:
                    // in case of vector, get vec + pt
                    try{
                        this.props.vec = {
                            x: `${document.getElementById('vxMathField').getValue('latex')}`,
                            y: `${document.getElementById('vyMathField').getValue('latex')}`,
                            z: `${document.getElementById('vzMathField').getValue('latex')}`,
                        }
                        this.props.init = {
                            x: `${document.getElementById('xMathField').getValue('latex')}`,
                            y: `${document.getElementById('yMathField').getValue('latex')}`,
                            z: `${document.getElementById('zMathField').getValue('latex')}`,
                        }
                        this.value = `<${this.props.vec.x}, ${this.props.vec.y}, ${this.props.vec.z}>`
                        console.log(this.value)
                        console.log(this.props)
                    }catch(error){
                        console.log(error)
                    }
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
        }
    }
    // passes any necessary input to display container before user sees it
    display()
    {
        console.log(this.props)
        return(
        <div class="card">
            <div class="card-body">
                <div class="row">{this.card(this.props, this)}</div>
                <div class="row mt-2">
                    <div class="col col-10"></div>
                    <div class="col col-2">
                        <button id="deleteComponent" type="button" class="btn btn-danger">
                            <div class="light-grey italic bold">REMOVE</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
        this.current[this.index]=new Tab(this, numtabs)
        console.log("NEW ELEMENT")
        console.log(this.current[this.index])
    }
    removeTab(index)
    {
        try{
            delete this.current[index]
            this.update()
        }catch(e){
            console.log(`Error with ${this.type} TAB DELETION: ${e}`)
        }
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
    for (const key in trackerCollection){
        const value = trackerCollection[key].current
        for (const innerKey in value){
            const tab = value[innerKey]
            tempreturn[tab.name] = tab.props
        }
    }
    console.log(JSON.stringify(tempreturn))
    return JSON.stringify(tempreturn)
}