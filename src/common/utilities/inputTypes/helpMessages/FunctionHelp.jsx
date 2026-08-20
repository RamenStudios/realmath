export const FunctionHelp = () => {
    const Text = () => {
        return (
            <p>
                Realmath's function input is styled as two input fields, one on each side of the '=' sign. Think of it as loosely being F(xy) = z. 
                This does <b>not</b> mean you need to have x and y on the left and z on the right-- in fact, you only <i>need</i> to include one variable, and it can be in whichever field you'd like. 
                However, it <b>does</b> mean that both input fields need to have some input in them, as Realmath cannot do implicit equations. 
                Additionally, variables must be written outright, not as 'function of' (so, z rather than F(x,y)). This is just a quirk of how equations are processed.
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