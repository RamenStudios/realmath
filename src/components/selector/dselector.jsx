import { SelectorDropdown } from "./selectorDropdown"
import { SelectorAdd } from "./selectorAdd"
import { SelectorDefine } from "./selectorDefine"

export const Selector = ({setmodal}) =>
{
    return(
        <div class="row">
            <div class="col-7"><SelectorDropdown/></div>
            <div class="col-2"><SelectorDefine setmodal={setmodal}/></div>
            <div class="col-2"><SelectorAdd/></div>
        </div>
    )
}