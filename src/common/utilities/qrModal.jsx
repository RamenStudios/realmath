import { use, useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'

export const QRModal = ({url, state, toggle}) =>
{
	const getClass = () => {
		return state ? 'modal-show' : ''
	}
	
    return(
        <div class={getClass()} id="qrModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">8th Wall Visualization</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick={toggle}></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            Your graph has been sent to the 8th Wall AR visualizer! Scan the QR code with your mobile device to view it. 
                        </div>
                        <div class="row mt-3 gx-0">
                            <div class="col-6 text-start">If you’re already on mobile, just tap <a id="qrLink" href={url}>HERE</a> to view!</div>
                            <div class="col-6"><QRCode value={url} quietZone={5}/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}