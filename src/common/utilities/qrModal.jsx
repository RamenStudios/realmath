import { use, useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'

export const QRModal = ({url, state, toggle}) =>
{
    console.log(`QRMODAL`)

	const getClass = () => {
		return state ? 'modal-show' : ''
	}
	
    return(
        <div className={getClass()} id="qrModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">8th Wall Visualization</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggle}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            Your graph has been sent to the 8th Wall AR visualizer! Scan the QR code with your mobile device to view it. 
                        </div>
                        <div className="row mt-3 gx-0">
                            <div className="col-6 text-start">If you’re already on mobile, just tap <a id="qrLink" href={url}>HERE</a> to view!</div>
                            <div className="col-6"><QRCode value={url} quietZone={5}/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}