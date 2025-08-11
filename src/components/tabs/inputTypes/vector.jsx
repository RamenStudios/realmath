import React from "react";
import { MathField } from "../../../common/utilities/mathfield";
import { useRef, useState, useEffect } from 'react';

const VectorInput = ({vecIn, posIn, parent}) =>
{
    // failsafe in case of null defaults
    vecIn = typeof(vecIn) == "string" ? JSON.parse(vecIn) : {x: '0', y: '0', z: '0'};
    posIn = typeof(posIn) == "string" ? JSON.parse(posIn) : {x: '0', y: '0', z: '0'};

    try{
        document.getElementById('vxMathField').setValue(vecIn.x)
        document.getElementById('vyMathField').setValue(vecIn.y)
        document.getElementById('vzMathField').setValue(vecIn.z)
        document.getElementById('xMathField').setValue(posIn.x)
        document.getElementById('yMathField').setValue(posIn.y)
        document.getElementById('zMathField').setValue(posIn.z)
    }catch(error){
        console.log(error)
    }

    return(
        <>
            <div class="row">Vector</div>
            <div class="row">
                <div class="col mx-0">x</div>
                <div class="col-lg-2" >
                    <MathField idIn='vxMathField' valueIn={vecIn.x} onInput={parent.update} />
                </div>
                <div class="col mx-0">y</div>
                <div class="col-lg-2" >
                    <MathField valueIn={vecIn.y} idIn='vyMathField' onInput={parent.update} />
                </div>
                <div class="col mx-0">z</div>
                <div class="col-lg-2" >
                    <MathField valueIn={vecIn.z} idIn='vzMathField' onInput={parent.update} />
                </div>
            </div>
            <div class="row">Initial Position/Intersecting Point</div>
            <div class="row">
                <div class="col mx-0">x</div>
                <div class="col-lg-2" >
                    <MathField idIn='xMathField' valueIn={posIn.x} onInput={parent.update} />
                </div>
                <div class="col mx-0">y</div>
                <div class="col-lg-2" >
                    <MathField valueIn={posIn.y} idIn='yMathField' onInput={parent.update} />
                </div>
                <div class="col mx-0">z</div>
                <div class="col-lg-2" >
                    <MathField valueIn={posIn.z} idIn='zMathField' onInput={parent.update} />
                </div>
            </div>
        </>
    )
}

// makes passing the props easier to me, personally
// though there is probably a better way to do it
export const VectorInputContainer = (props, parent) =>
{
    return(
        <><VectorInput vecIn={props.vec} posIn={props.init} parent={parent}/></>
    )
}