import $ from 'jquery'

export const SelectorAdd = ({userframe, addSelection}) =>
{

    const triggerAddition = () => {
        console.log(`adding a ${document.getElementById('selector').value}`)
        addSelection(document.getElementById('selector').value)
    }

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
}