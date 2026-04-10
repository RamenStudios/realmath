import { GraphComponents, GraphKeys } from "../../common/utilities/graphComponents"

export const SelectorDropdown = ({setSelection}) =>
{
	return(
		<select className="form-select" id="selector" aria-label="Graph component selector">
			{GraphKeys.map((key)=>(
				<option key={key} onClick={setSelection(key)}>
					{key}
				</option>
			))}
		</select>
	)
}