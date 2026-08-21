import { MathfieldElement } from "mathlive";
import { useRef } from "react";
import "https://esm.run/@cortex-js/compute-engine";

const vsep = { label: '[separator]', width: 0.5 }
const layout =  {
                    label: 'Basic',
                    rows: [
                        [
                            '[7]', '[8]', '[9]',
                            vsep,
                            'x', 'y', 'z',
                        ],
                        [
                            '[4]', '[5]', '[6]',
                            vsep,
                            '#@^{#?}', '\\sqrt{#0}', { class: 'small', latex: '\\frac{#@}{#0}' },
                        ],
                        [
                            '[1]', '[2]', '[3]',
                            vsep,
                            '\\cdot', '[+]', '[-]',
                        ],
                        [
                            {label: '[left]', width: 0.5}, 
                            {label: '[right]', width: 0.5}, 
                            {label: '[0]', width: 2}, 
                            vsep,
                            '\\left(#0\\right)', 
                            { label: '[backspace]', width: 2 },
                        ],
                    ],
                }

export const MathField = (props) =>
{
    const preventLatex = (e) => {
        const inputfield = document.getElementById(props.idIn)
        if ((e.key === '\\') || (e.key === 'Escape')) {
            e.preventDefault()
            inputfield.executeCommand(['insert', '\\backslash'])
        }
    }
    mathVirtualKeyboard.layouts = layout
    return(
            <math-field
                id={props.idIn}
                style={{display: "block"}}
                math-virtual-keyboard-policy = "auto"
                onInput={props.onInput}
                value={props.valueIn}
                onKeyDown={preventLatex}
            />
    )
}

export const ReadOnlyMathField = ({text}) => {
    return (
        <math-field read-only style={{display: "block"}}>{text}</math-field>
    )
}