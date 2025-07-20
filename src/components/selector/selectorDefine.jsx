import { useState, useEffect } from 'react';
import { GraphComponents } from '../../common/graphComponents';

export const SelectorDefine = () =>
{
    const [content, setContent] = useState("Placeholder");
    const [showModal, setshowModal] = useState(false);


    const getSelection = () =>
    {
        try
        {
            let selection = document.getElementById("selector");
            setContent(selection.options[selection.selectedIndex].text);
            setshowModal(true)
        }
        catch(error)
        {
            console.error(error)
            return
        };
    };
    
    useEffect (() =>
    {
        try
        {
            let label = document.getElementById('modalLabel')
            let body = document.getElementById('modalBody')
            label.innerText = `${content} Definition`
            body.innerText = `${GraphComponents[content]['def']}`
        }
        catch(error)
        {
            console.error(error)
        }
    }, [content]);

    useEffect(() =>
    {
        if(showModal)
        {
            try{
                let modal = new bootstrap.Modal(document.getElementById('modal'), {});
                modal.show();
            }
            catch(error){
                console.error(error)
            }
            setshowModal(false)
        }
    }, [showModal])

    return(
        <div class="d-grid gap-2">
            <button type="button" class="btn btn-primary" onClick={getSelection}>
                <div class="light-grey italic bold">DEFINE</div>
            </button>
        </div>
    )
}