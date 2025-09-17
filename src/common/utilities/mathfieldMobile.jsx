import { MathfieldElement } from "mathlive";
import "https://esm.run/@cortex-js/compute-engine";
import '../../../stylesheets/mobilemath.module.css'

export const MathFieldMobile = ({idIn, valueIn, onInput}) =>
{
    return(
            <math-field
            id={idIn}
            style={{display: "block"}}
            math-virtual-keyboard-policy = "auto"
            onFocusIn={() =>  mathVirtualKeyboard.show()} 
            onFocusOut={() =>  mathVirtualKeyboard.hide()}
            onInput={onInput}
            value={valueIn}/>
    )
}