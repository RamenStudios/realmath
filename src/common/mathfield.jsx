import { MathfieldElement } from "mathlive";
import "https://esm.run/@cortex-js/compute-engine";

export const MathField = ({valueIn, onInput}) =>
{
    return(
            <math-field
            style={{display: "block"}}
            math-virtual-keyboard-policy = "manual"
            onFocusIn={() =>  mathVirtualKeyboard.show()} 
            onFocusOut={() =>  mathVirtualKeyboard.hide()}
            onInput={onInput}
            value={valueIn}/>
    )
}