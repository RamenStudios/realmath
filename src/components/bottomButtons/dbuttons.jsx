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

    // sets new content and calls reload when button clicked
    const getHelp = () =>
    {
			try {
				setmodal(`HELP/FAQ`, `${HelpMessage}`)
			} catch(e) {
				console.log(`Cannot set modal in DBUTTONS: ${e}`)
			}
    }

    // reloads page
    const reload = () => {
        window.location.reload()
    }

    if(userframe === 'desktop')
    {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-sm-12 mb-2"><div className="d-grid gap-2">
                        <button type="button" className="btn btn-primary" id="visualizeButton" onClick={clickTrigger}>
                            <div className="light-grey italic bold">VISUALIZE IT!</div>
                        </button>
                    </div></div>
                    <div className="col-lg-2 col-sm-4 mb-2"><div className="d-grid">
                        <button type="button" className="btn btn-secondary" onClick={getHelp}>
                            <div className="light-grey italic bold">HELP</div>
                        </button>
                    </div></div>
                    <div className="col-lg-2 col-sm-4 mb-2"><div className="d-grid">
                        <button type="button" className="btn btn-secondary" onClick={reload}>
                            <div className="light-grey italic bold">RESET</div>
                        </button>
                    </div></div>
                    <div className="col-lg-3 col-sm-4 mb-2"><div className="d-grid">
                        <button type="button" className="btn btn-secondary">
                            <a className="light-grey italic bold" href="mailto:arodri37@nd.edu">REPORT BUG</a>
                        </button>
                    </div></div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="container">
                <div className="row mb-2">
                    <button type="button" className="btn btn-primary" id="visualizeButton" onClick={clickTrigger}>
                            <div className="mobile-body light-grey italic bold">VISUALIZE IT!</div>
                    </button>
                </div>
                <div className="row mb-2">
                    <button type="button" className="btn btn-secondary" onClick={getHelp}>
                        <div className="mobile-body light-grey italic bold">HELP</div>
                    </button>
                </div>
                <div className="row mb-2">
                    <button type="button" className="btn btn-secondary" onClick={reload}>
                        <div className="mobile-body light-grey italic bold">RESET</div>
                    </button>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-secondary">
                        <a className="light-grey italic bold" href="mailto:arodri37@nd.edu">REPORT BUG</a>
                    </button>
                </div>
            </div>
        )
    }
    
}