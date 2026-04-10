import { FunctionInputContainer } from "./inputTypes/function"
import { PointInputContainer } from "./inputTypes/point";
import { VectorInputContainer } from "./inputTypes/vector";
import { SpaceCurveInputContainer } from "./inputTypes/spacecurve";
import { VectorFieldInputContainer } from "./inputTypes/vectorfield";
import { useRef, useState, useEffect } from 'react';

// TODO: FIX DELETION

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
                                'card': VectorFieldInputContainer, 
                                'props': {
                                    'x': null, 
                                    'y': null,
                                    'z': null,
                                }
                            },
                            'SCrv'  :   {
                                'alias': 5, 
                                'card': SpaceCurveInputContainer, 
                                'props': {
                                    'x': null, 
                                    'y': null,
                                    'z': null,
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
        this.set_update()
    }
    // just makes life easier tbh
    select() {
        this.selected = true
    }
    deselect() {
        this.selected = false
    }
    // caches value, making it accessible even when another tab is shown
    set_update() {
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
                        console.error(error)
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
                        console.error(error)
                    }
                    break
                default:
                    // point, vfld, and scrv all have the same props
                    try {
                        this.props.x = document.getElementById('xMathField').getValue('latex')
                        this.props.y = document.getElementById('yMathField').getValue('latex')
                        this.props.z = document.getElementById('zMathField').getValue('latex')
                        this.value = `(${this.props.x}, ${this.props.y}, ${this.props.z})`
                        console.log(this.value)
                        console.log(this.props)
                    } catch (error) {
                        console.error(`error updating value for tab ${this.name}!: ${error}`)
                    }
            }
        }
    }
    // checks validity of inputs
    check_valid()
    {
        let inputval
        const checkNullEqual = (val) => {
            if (val.includes('null') || val.includes('=') || val.length === 0) {
                console.log("NULL FOUND")
                return true
            } else {
                return false
            }
        }
        switch (this.type) {
            case 1:     
                inputval = `${this.props.left}-${this.props.right}`
                console.log(inputval)
                // check if any null input or missing vars
                try {
                    if (checkNullEqual(inputval)) {
                        return false
                    } else {
                        // regex to detect variables
                        const regex = /[^a-z]*(?<var>[xyz])/g
                        console.log(inputval.search(regex))
                        if (inputval.search(regex) === -1) {
                            return false
                        }
                    }
                } catch(error) {
                    console.error(error)
                }
                break
            case 3:
                // in case of vector, get vec + pt
                try {
                    for (const prop in this.props.vec) {
                        inputval = `${this.props.vec[prop]}`
                        if (checkNullEqual(inputval)) {
                            return false
                        }
                    }
                    for (const prop in this.props.init) {
                        inputval = `${this.props.init[prop]}`
                        if (checkNullEqual(inputval)) {
                            return false
                        }
                    }
                } catch(error) {
                    console.error(error)
                }
                break
            default:
                // point, vfld, and scrv all have the same props
                try {
                    inputval = `(${this.props.x}, ${this.props.y}, ${this.props.z})`
                    try {
                        if (checkNullEqual(inputval)) {
                            return false
                        }
                    } catch(error) {
                        console.error(error)
                    }
                } catch (error) {
                    console.error(`error verifying value for tab ${this.name}!: ${error}`)
                }
                
        }
        return true
    }
    // passes any necessary input to display container before user sees it
    display(userframe)
    {
        console.log(`displaying card`)
        const button = () => {
            if(userframe === 'desktop'){
                return(
                    <div className="row mt-2 justify-content-end">
                        <div className="col col-8 d-md-none"></div>
                        <div className="col col-lg-2 col-md-12 mx-2">
                            <button 
                                id="deleteComponent" 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={() => {this.parent.setTrigger('delete', true)}}
                            >
                                <div className="light-grey italic bold">REMOVE</div>
                            </button>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div className="row mt-2">
                        <button 
                            id="deleteComponent" 
                            type="button" 
                            className="btn btn-danger" 
                            onClick={() => {this.parent.setTrigger('delete', true)}}
                        >
                            <div className="mobile-body light-grey italic bold">REMOVE</div>
                        </button>
                    </div>
                )
            }
        }
        return(
			<div className="card">
				<div className="card-body">
					<div className="row justify-content-center">{this.card(this.props, this, userframe)}</div>
					{button()}
				</div>
			</div>
        )
    }
}

/* ************************************ */
export class TabTracker
{
    constructor(type, setTrigger, defaultIn=false) {
        this.type = type
        this.current = {}
        this.index = 0
        this.setTrigger = setTrigger
        this.default = defaultIn
        if(defaultIn)
        {
            console.error(`default tracker detected`)
            this.add(0)
        }
    }
	
    get_latest () {
        return this.current[this.index]
    }
	
    add (numtabs) {
		try {
			this.index += 1
			this.current[this.index] = new Tab(this, numtabs)
			return 1
		} catch (e) {
            console.error(`Error with ${this.type} TAB ADDITION: ${e}`)
			return -1
		}
    }
	
    del (index) {
        try {
            delete this.current[index]
			this.update()
			return 1
        } catch (e) {
            console.error(`Error with ${this.type} TAB DELETION: ${e}`)
			return -1
        }
    }
	
	stringify () {
		const tempDict = {}
		try {
			const tempDict = {}
			for (const key in this.current) {
				if (this.current[key].check_valid() === true) {
					tempDict[this.current[key].name] = this.current[key].props
				}
				throw new Error(`Tab at index ${key} in the ${this.type} tracker has invalid input.`)
			}
		} catch (e) {
            console.error(`Error with ${this.type} TAB STRINGIFY: ${e}`)
        }
		return tempDict
	}
}