import "https://esm.run/@cortex-js/compute-engine";
import { useState, useEffect } from 'react';
import { HelpMessage } from "../../common/utilities/HelpMessage";
import { ShowModal } from '../../common/services/ModalService';

export const BottomButtons = ({userframe, setTrigger, setmodal}) =>
{
    /* call content trigger */
    const clickTrigger = () => {
        setTrigger('content', true)
    }
    
    // reload when new content and when modal toggled
    const [contentReq, setcontentReq] = useState(false)
    const [modalFlag, setmodalFlag] = useState(false)

    // sets new content and calls reload when button clicked
    const getHelp = () =>
    {
        try{
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
                setmodal(`HELP/FAQ`, `${HelpMessage()}`)
                setmodalFlag(true)
            }catch(e){
                console.log(`Cannot set modal in DBUTTONS: ${e}`)
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

    // reloads page
    const reload = () => {
        window.location.reload()
    }

    if(userframe === 'desktop')
    {
        return(
            <div class="container">
                <div class="row">
                    <div class="col-5"><div class="d-grid gap-2">
                        <button type="button" class="btn btn-primary" id="visualizeButton" onClick={clickTrigger}>
                            <div class="light-grey italic bold">VISUALIZE IT!</div>
                        </button>
                    </div></div>
                    <div class="col-2"><div class="d-grid">
                        <button type="button" class="btn btn-secondary" onClick={getHelp}>
                            <div class="light-grey italic bold">HELP</div>
                        </button>
                    </div></div>
                    <div class="col-2"><div class="d-grid">
                        <button type="button" class="btn btn-secondary" onClick={reload}>
                            <div class="light-grey italic bold">RESET</div>
                        </button>
                    </div></div>
                    <div class="col-3"><div class="d-grid">
                        <button type="button" class="btn btn-secondary" disabled="true">
                            <div class="light-grey italic bold">REPORT BUG</div>
                        </button>
                    </div></div>
                </div>
            </div>
        )
    }else{
        return(
            <div class="container">
                <div class="row mb-2">
                    <button type="button" class="btn btn-primary" id="visualizeButton" onClick={clickTrigger}>
                            <div class="mobile-body light-grey italic bold">VISUALIZE IT!</div>
                    </button>
                </div>
                <div class="row mb-2">
                    <button type="button" class="btn btn-secondary" onClick={getHelp}>
                        <div class="mobile-body light-grey italic bold">HELP</div>
                    </button>
                </div>
                <div class="row mb-2">
                    <button type="button" class="btn btn-secondary" onClick={reload}>
                        <div class="mobile-body light-grey italic bold">RESET</div>
                    </button>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-secondary" disabled="true">
                        <div class="mobile-body light-grey italic bold">REPORT BUG</div>
                    </button>
                </div>
            </div>
        )
    }
    
}