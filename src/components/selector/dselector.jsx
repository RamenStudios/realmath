import { SelectorDropdown } from "./selectorDropdown"
import { SelectorAdd } from "./selectorAdd"
import { SelectorDefine } from "./selectorDefine"

export const Selector = ({setmodal, userframe, setTrigger}) =>
{
    if(userframe === 'desktop'){
        return(
            <div class="row">
                <div class="col-lg-7 col-sm-12 mb-2"><SelectorDropdown/></div>
                <div class="col-lg-2 col-sm-6 mb-2"><SelectorDefine userframe={userframe} setmodal={setmodal}/></div>
                <div class="col-lg-2 col-sm-6 mb-2"><SelectorAdd userframe={userframe} setTrigger={setTrigger}/></div>
            </div>
        )
    }else{
        return(
            <><div class="row"><SelectorDropdown/></div>
            <div class="row mt-2"><SelectorDefine userframe={userframe} setmodal={setmodal}/></div>
            <div class="row mt-2"><SelectorAdd userframe={userframe} setTrigger={setTrigger}/></div></>
        )
    }
}