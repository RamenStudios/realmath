import React from "react";
import { MathField } from "../mathfield"

const PointInput = ({xIn, yIn, zIn, parent}) =>
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
        <div className="row">
            <div className="col">x</div>
            <div className="col-lg-2" >
                <MathField idIn='xMathField' valueIn={xIn} onInput={parent.update} />
            </div>
            <div className="col">y</div>
            <div className="col-lg-2" >
                <MathField valueIn={yIn} idIn='yMathField' onInput={parent.update} />
            </div>
            <div className="col">z</div>
            <div className="col-lg-2" >
                <MathField valueIn={zIn} idIn='zMathField' onInput={parent.update} />
            </div>
        </div>
    )
}

// makes passing the props easier to me, personally
// though there is probably a better way to do it
export const PointInputContainer = (props, parent) =>
{
    return(
        <><PointInput xIn={props.x} yIn={props.y} zIn={props.z} parent={parent}/></>
    )
}