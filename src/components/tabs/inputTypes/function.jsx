import React from "react";
import { MathField } from "../../../common/utilities/mathfield";
import { useRef, useState, useEffect } from 'react';

const FunctionInput = ({leftIn, rightIn, parent}) =>
{
    // failsafe in case of null defaults
    leftIn = typeof(leftIn) == "string" ? leftIn : "";
    rightIn = typeof(rightIn) == "string" ? rightIn : "";

    try{
        document.getElementById('leftMathField').setValue(leftIn)
        document.getElementById('rightMathField').setValue(rightIn)
    }catch(error){
        console.log(error)
    }

    return(
        <div class="row">
            <div class="col-lg-5" >
                <MathField idIn='leftMathField' valueIn={leftIn} onInput={parent.update} />
            </div>
            <div class="col">=</div>
            <div class="col-lg-5" >
                <MathField valueIn={rightIn} idIn='rightMathField' onInput={parent.update} />
            </div>
        </div>
    )
}

// makes passing the props easier to me, personally
// though there is probably a better way to do it
export const FunctionInputContainer = (props, parent) =>
{
    return(
        <><FunctionInput leftIn={props.left} rightIn={props.right} parent={parent}/></>
    )
}