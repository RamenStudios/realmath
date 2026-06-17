export const SelectorDropdown = ({GraphKeys}) =>
{
	return(
		<select className="form-select" id="selector" aria-label="Graph component selector">
			{GraphKeys.map((key, index)=>(
				<option key={key} value={index}>
					{key}
				</option>
			))}
		</select>
	)
}