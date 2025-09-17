import React from "react";
import { MathField } from "../../../common/utilities/mathfield";
import { MathFieldMobile } from "../../../common/utilities/mathfieldMobile"; //as of now this does exactly nothing. not sure how to implement
import { useRef, useState, useEffect } from 'react';

const FunctionInput = ({leftIn, rightIn, parent, userframe}) =>
{
    console.log(userframe)

    // failsafe in case of null defaults
    leftIn = typeof(leftIn) == "string" ? leftIn : "";
    rightIn = typeof(rightIn) == "string" ? rightIn : "";

    try{
        document.getElementById('leftMathField').setValue(leftIn)
        document.getElementById('rightMathField').setValue(rightIn)
    }catch(error){
        console.log(error)
    }

    if(userframe == 'desktop') {
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
    } else {
        return(
            <div class="row">
                <div class="col-lg-5" >
                    <MathFieldMobile idIn='leftMathField' valueIn={leftIn} onInput={parent.update} />
                </div>
                <div class="col">=</div>
                <div class="col-lg-5" >
                    <MathFieldMobile valueIn={rightIn} idIn='rightMathField' onInput={parent.update} />
                </div>
            </div>
        )
    }
    
}

// makes passing the props easier to me, personally
// though there is probably a better way to do it
export const FunctionInputContainer = (props, parent, userframe) =>
{
    return(
        <><FunctionInput leftIn={props.left} rightIn={props.right} parent={parent} userframe={userframe}/></>
    )
}