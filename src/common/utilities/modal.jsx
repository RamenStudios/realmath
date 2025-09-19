import { use, useEffect, useState } from 'react';
import { HelpMessage } from './HelpMessage';

export const Modal = ({inlabel, incontent}) =>
{
    // there are cleaner ways to do this
    if (inlabel === `HELP/FAQ`) {
        return (
            <div class="modal fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true" show="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalLabel">{inlabel}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="modalBody"><HelpMessage/></div>
                </div>
            </div>
        </div>
        )
    } else {
        return(
            <div class="modal fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true" show="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalLabel">{inlabel}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="modalBody">{incontent}</div>
                    </div>
                </div>
            </div>
        )
    }
    
}