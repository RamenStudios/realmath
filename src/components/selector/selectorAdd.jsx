import $ from 'jquery'

export const SelectorAdd = ({userframe, setTrigger}) =>
{
    if (userframe == 'desktop') {
        return(
            <div className="d-grid gap-2">
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    id="selectorAdd" 
                    onClick={setTrigger}
                >
                    <div className="light-grey italic bold">ADD!</div>
                </button>
            </div>
        )
    } else {
        return(
            <div className="d-grid gap-2">
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    id="selectorAdd" 
                    onClick={setTrigger}
                >
                    <div className="mobile-body light-grey italic bold">ADD!</div>
                </button>
            </div>
        )
    }
}