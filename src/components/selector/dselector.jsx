import { SelectorDropdown } from "./selectorDropdown"
import { SelectorAdd } from "./selectorAdd"
import { SelectorDefine } from "./selectorDefine"

export const Selector = ({setmodal, userframe, setTrigger}) =>
{
    if(userframe === 'desktop'){
        return(
            <div class="row">
                <div class="col-7"><SelectorDropdown/></div>
                <div class="col-2"><SelectorDefine setmodal={setmodal}/></div>
                <div class="col-2"><SelectorAdd setTrigger={setTrigger}/></div>
            </div>
        )
    }else{
        return(
            <><div class="row"><SelectorDropdown/></div>
            <div class="row mt-2"><SelectorDefine setmodal={setmodal}/></div>
            <div class="row mt-2"><SelectorAdd setTrigger={setTrigger}/></div></>
        )
    }
}