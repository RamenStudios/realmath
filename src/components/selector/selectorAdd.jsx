import $ from 'jquery'

export const SelectorAdd = () =>
{

    const checkHover = () => 
    {
        console.log($('#selectorAdd').is(":hover"))
    }

    return(
        <div class="d-grid gap-2">
            <button type="button" class="btn btn-primary" id="selectorAdd" onMouseEnter={checkHover} onMouseLeave={checkHover}>
                <div class="light-grey italic bold">ADD!</div>
            </button>
        </div>
    )
}