export const VectorFieldHelp = () => {
    const Text = () => {
        return (
            <p>
                Vector Field Help
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