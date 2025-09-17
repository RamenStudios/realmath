import $ from 'jquery'

export const SelectorAdd = ({userframe, setTrigger}) =>
{

    const setaddTrigger = () => {
        console.log("Add button clicked")
        setTrigger('add', true)
    }

    if (userframe == 'desktop') {
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
    } else {
        return(
            <div class="d-grid gap-2">
                <button 
                    type="button" 
                    class="btn btn-primary" 
                    id="selectorAdd" 
                    onClick={setaddTrigger}
                >
                    <div class="mobile-body light-grey italic bold">ADD!</div>
                </button>
            </div>
        )
    }
}