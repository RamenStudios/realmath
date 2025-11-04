import React from "react";
import { MathField } from "../../../common/utilities/mathfield";
import { useRef, useState, useEffect } from 'react';

const VectorFieldInput = ({xIn, yIn, zIn, parent}) =>
{
    // failsafe in case of null defaults
    xIn = typeof(xIn) == "string" ? xIn : "";
    yIn = typeof(yIn) == "string" ? yIn : "";
    zIn = typeof(zIn) == "string" ? zIn : "";

    try{
        document.getElementById('xMathField').setValue(xIn)
        document.getElementById('yMathField').setValue(yIn)
        document.getElementById('zMathField').setValue(zIn)
    }catch(error){
        console.log(error)
    }

    return(
            <div>
                <div class="row">
                    <div class="col-2">M</div>
                    <div class="col-10" >
                        <MathField idIn='xMathField' valueIn={xIn} onInput={parent.update} />
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-2">N</div>
                    <div class="col-10" >
                        <MathField valueIn={yIn} idIn='yMathField' onInput={parent.update} />
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-2">P</div>
                    <div class="col-10" >
                        <MathField valueIn={zIn} idIn='zMathField' onInput={parent.update} />
                    </div>
                </div>
            </div>
    )
}

// makes passing the props easier to me, personally
// though there is probably a better way to do it
export const VectorFieldInputContainer = (props, parent) =>
{
    return(
        <><VectorFieldInput xIn={props.x} yIn={props.y} zIn={props.z} parent={parent}/></>
    )
}