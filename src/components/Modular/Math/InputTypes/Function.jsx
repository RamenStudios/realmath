import React from "react";
import { InputLayout } from '../InputLayout';

// varies by input type
const inputProps = (id, valueIn, onInput) => {
    return  {
        idIn: id,
        valueIn: valueIn,
        onInput: onInput
    }
}

// prevents rewriting too much
const inputColClass = "col-12 col-md-5"
const ColHelper = (className, isLabel, props) => {
    return {
        className: className,
        isLabel: isLabel,
        props: props
    }
}

// generates the input
const FunctionInput = ({leftIn, rightIn, parent, userframe}) =>
{
    console.log(userframe)

    // failsafe in case of null defaults
    leftIn = typeof(leftIn) == "string" ? leftIn : "";
    rightIn = typeof(rightIn) == "string" ? rightIn : "";

    try{
        document.getElementById('leftMathField').setValue(leftIn)
        document.getElementById('rightMathField').setValue(rightIn)
    } catch(error) {
        console.log(error)
    }

    const Layout =  {
                                blank: false,
                                rows:   [
                                    [
                                        ColHelper(inputColClass, false, inputProps('leftMathField', leftIn, parent.update)),
                                        ColHelper(inputColClass, true, '='),
                                        ColHelper(inputColClass, false, inputProps('leftMathField', leftIn, parent.update))
                                    ]
                                ]
                            }

    return InputLayout(Layout)
    
}

// makes passing the props easier to me, personally
// though there is probably a better way to do it
export const FunctionInputContainer = (props, parent, userframe) =>
{
    return(
        <><FunctionInput leftIn={props.left} rightIn={props.right} parent={parent} userframe={userframe}/></>
    )
}