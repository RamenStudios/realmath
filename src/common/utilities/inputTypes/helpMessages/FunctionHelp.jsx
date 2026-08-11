export const FunctionHelp = ({math}) => {
    return (
        <div>
            <p>
                Realmath's function input is styled as two input fields, one on each side of the '=' sign. Think of it as loosely being F(xy) = z. 
                This does <b>not</b> mean you need to have x and y on the left and z on the right-- in fact, you only <i>need</i> to include one variable, and it can be in whichever field you'd like. 
                However, it <b>does</b> mean that both input fields need to have some input in them, as Realmath cannot do implicit equations. 
                Additionally, variables must be written outright, not as 'function of' (so, z rather than F(x,y)). This is just a quirk of how equations are processed.
            </p> <p>
                <b><i>The below input is valid...</i></b>
                <div className="row">
                    <div className="col-lg-5" >
                        <input disabled defaultValue={'\\frac{2}{x}'}/>
                    </div>
                    <div className="col">=</div>
                    <div className="col-lg-5" >
                        <input disabled defaultValue={'1'}/>
                    </div>
                </div>
            </p> <p>
                But <b><i>the below input is invalid</i></b>, due to "F(xy)" and "=" in the first input field and nothing in the other.
                <div className="row">
                    <div className="col-lg-5" >
                        <input disabled defaultValue={'F(xy)=3xy'}/>
                    </div>
                    <div className="col">=</div>
                    <div className="col-lg-5" >
                        <input disabled defaultValue={' '}/>
                    </div>
                </div>
            </p>
        </div>
    )
}