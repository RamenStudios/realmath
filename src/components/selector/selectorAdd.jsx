import $ from 'jquery'

export const SelectorAdd = ({setTrigger}) =>
{

    const setaddTrigger = () => {
        console.log("Add button clicked")
        setTrigger('add', true)
    }

    return(
        <div class="d-grid gap-2">
            <button 
                type="button" 
                class="btn btn-primary" 
                id="selectorAdd" 
                onClick={setaddTrigger}
            >
                <div class="light-grey italic bold">ADD!</div>
            </button>
        </div>
    )
}