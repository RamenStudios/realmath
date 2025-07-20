import { FunctionInput } from "./inputTypes/function"
import { useRef, useState, useEffect } from 'react';

const InputCards    =   {
                            'Func': FunctionInput
                        }

export class Tab
{
    constructor(type, index, numtabs)
    {
        this.index = index
        this.type = type
        this.name = `${type} ${index}`
        this.card = InputCards[type]
        this.selected = numtabs === 0 ? true : false
    }
    select()
    {
        this.selected = true
    }
    deselect()
    {
        this.selected = false
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