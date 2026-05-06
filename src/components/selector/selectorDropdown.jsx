import { GraphComponents, GraphKeys } from "../../common/utilities/graphComponents"

export const SelectorDropdown = () =>
{
	return(
		<select className="form-select" id="selector" aria-label="Graph component selector">
			{GraphKeys.map((key)=>(
				<option key={key}>
					{key}
				</option>
			))}
		</select>
	)
}