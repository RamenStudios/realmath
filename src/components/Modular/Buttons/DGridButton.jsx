export const DGridButton = (props) => {
    /* account for custom text class */
    let className = "light-grey italic bold"
    let link = false
    if (props.hasOwnProperty('className')) {
        if (props.className === null) {
            link = true
        } else {
            className = props.className
        }
    }
    /* button content */
    const Inner = () => {
        if (link) {
            return (<>{props.label()}</>)
        } else {
            return (<div className={className}>{props.label}</div>)
        }
    }
    const ButtonContent = () => {
        return (
            <div className="d-grid">
                <button type="button" className={`btn btn-${props.color}`} id={props.id} onClick={props.callback}>
                    {Inner()}
                </button>
            </div>
        )
    }
    /* account for cols and such */
    if (props.hasOwnProperty('container')) {
        return (
            <div className={props.container}>
                {ButtonContent()}
            </div>
        )
    } else {
        return ButtonContent()
    }
}