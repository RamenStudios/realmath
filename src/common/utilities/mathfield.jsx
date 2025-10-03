import { MathfieldElement } from "mathlive";
import { useRef } from "react";
import "https://esm.run/@cortex-js/compute-engine";

const vsep = { label: '[separator]', width: 0.5 }

export const MathField = ({idIn, valueIn, onInput}) =>
{
    const preventLatex = (e) => {
        const inputfield = document.getElementById(idIn)
        if ((e.key === '\\') || (e.key === 'Escape')) {
            e.preventDefault()
            inputfield.executeCommand(['insert', '\\backslash'])
        }
    }

    mathVirtualKeyboard.layouts =   {
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
                                    };
    return(
            <math-field
                id={idIn}
                style={{display: "block"}}
                math-virtual-keyboard-policy = "auto"
                onInput={onInput}
                value={valueIn}
                onKeyDown={preventLatex}
            />
    )
}