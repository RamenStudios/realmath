export const PointHelp = ({math}) => {
    return (
        <div>
            <p>
                Realmath's point input is styled as 3 input fields, representing the x, y, and z coordinates of a point in 3D space. 
                Each input field <b>only accepts constants</b> or expressions that can be simplified to a constant. This means 'sqrt{'{2}'}' is valid, but '2x' is not.
            </p> <p>
                <b><i>The below input is valid...</i></b>
            </p> <p>
                But <b><i>the below input is invalid</i></b>, due to 
            </p>
        </div>
    )
}