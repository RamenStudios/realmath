import { GraphComponents, GraphKeys } from "../../common/utilities/graphComponents"

export const SelectorDropdown = ({setSelection}) =>
{
	return(
		<select class="form-select" id="selector" aria-label="Graph component selector">
			{GraphKeys.map((key)=>(
				<option>
					{key}
					onclick={setSelection(key)}
				</option>
			))}
		</select>
	)
}