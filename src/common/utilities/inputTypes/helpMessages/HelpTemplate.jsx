export const Help = (props) => {
    return (
        <div>
            <div>
                {props.helpText()}
            </div> 
            <div>
                <b><i>The below input is valid...</i></b>
                <div className="row">
                    <div className="col-lg-5" >
                        <input disabled defaultValue={props.valid[0]}/>
                    </div>
                    <div className="col">=</div>
                    <div className="col-lg-5" >
                        <input disabled defaultValue={props.valid[1]}/>
                    </div>
                </div>
            </div> 
            <div>
                But <b><i>the below input is invalid</i></b>, due to {props.invalid[1]()}
                <div className="row">
                    <div className="col-lg-5" >
                        <input disabled defaultValue={props.invalid[0][0]}/>
                    </div>
                    <div className="col">=</div>
                    <div className="col-lg-5" >
                        <input disabled defaultValue={props.invalid[0][1]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}