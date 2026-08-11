import $ from 'jquery'

export const SelectorAdd = ({userframe, addSelection}) =>
{

    const triggerAddition = () => {
        console.log(`adding a ${document.getElementById('selector').value}`)
        addSelection(document.getElementById('selector').value)
    }

    if (userframe == 'desktop') {
        return(
            <div className="d-grid gap-2">
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    id="selectorAdd" 
                    onClick={triggerAddition}
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
                    onClick={triggerAddition}
                >
                    <div className="mobile-body light-grey italic bold">ADD!</div>
                </button>
            </div>
        )
    }
}