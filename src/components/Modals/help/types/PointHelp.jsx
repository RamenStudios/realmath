export const PointHelp = () => {
    const Text = () => {
        return (
            <p>
                Realmath's point input is styled as 3 input fields, representing the x, y, and z coordinates of a point in 3D space. 
                Each input field <b>only accepts constants</b> or expressions that can be simplified to a constant. This means 'sqrt{'{2}'}' is valid, but '2x' is not.
            </p>
        )
    }
    const InvalidText = () => {
        return "\"F(xy)\" and \"=\" in the first input field and nothing in the other."
    }
    const valid =   [
                        '\\frac{2}{x}',
                        '1'
                    ]
    const invalid = [
                        [
                            'F(xy)=3xy',
                            ' '
                        ],
                        InvalidText
                    ]
    return  {
                helpText: Text, 
                valid: valid, 
                invalid: invalid
            }
}