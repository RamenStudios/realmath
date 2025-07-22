import { use, useEffect, useState } from 'react';

export const Modal = () =>
{
    return(
        <div class="modal fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true" show="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalLabel">Placeholder</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="modalBody">
                        Placeholder
                    </div>
                </div>
            </div>
        </div>
    )
}