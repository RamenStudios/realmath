import { use, useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'

export const QRModal = ({url}) =>
{
    return(
        <div class="modal fade" id="qrmodal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true" show="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">8th Wall Visualization</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            Your graph has been sent to the 8th Wall AR visualizer! Scan the QR code with your mobile device to view it. 
                            <br/>If you’re already on mobile, simply tap <a id="qrLink" href={url}>HERE</a> to view!
                        </div>
                        <div class="row">
                            <QRCode value={url}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}