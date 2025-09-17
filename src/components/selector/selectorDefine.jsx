import { useState, useEffect, useRef } from 'react';
import { GraphComponents } from '../../common/utilities/graphComponents';
import { ShowModal } from '../../common/services/ModalService';

export const SelectorDefine = ({userframe, setmodal}) =>
{
    // reload when new content and when modal toggled
    const [contentReq, setcontentReq] = useState(false)
    const [modalFlag, setmodalFlag] = useState(false)
    const content = useRef("Placeholder")

    // sets new content and calls reload when button clicked
    const getSelection = () =>
    {
        try
        {
            let selection = document.getElementById("selector")
            content.current = (selection.options[selection.selectedIndex].text)
            setcontentReq(true)
        }
        catch(error)
        {
            console.error(error)
            return
        };
    };

    // updates modal, sets modal show flag to 'true' after setting content
    useEffect(() =>
    {
        if(contentReq){
            try{
                setmodal(`${content.current} Definition`, `${GraphComponents[content.current]['def']}`)
                setmodalFlag(true)
            }catch(e){
                console.log(`Cannot set modal in SELECTORDEFINE: ${e}`)
            }
        }
    }, [contentReq])

    // shows modal if flag is true
    useEffect(() => {
        if (modalFlag === true) {
            ShowModal()
            setmodalFlag(false)
        } else {
            setcontentReq(false)
        }
    }, [modalFlag])

    if (userframe == 'desktop') {
        return(
            <div class="d-grid gap-2">
                <button type="button" class="btn btn-primary" onClick={getSelection}>
                    <div class="light-grey italic bold">DEFINE</div>
                </button>
            </div>
        )
    } else {
        return(
            <div class="d-grid gap-2">
                <button type="button" class="btn btn-primary" onClick={getSelection}>
                    <div class="mobile-body light-grey italic bold">DEFINE</div>
                </button>
            </div>
        )
    }
}