import { GraphComponents, GraphKeys } from "../../common/utilities/graphComponents"

export const SelectorDropdown = () =>
{
    return(
        <select class="form-select" id="selector" aria-label="Default select example">
            {GraphKeys.map((key)=>(
                <option value={GraphComponents[key]["value"]}>{key}</option>
            ))}
        </select>
    )
}