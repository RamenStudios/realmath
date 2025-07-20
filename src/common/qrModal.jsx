export const QRModal = (code, link='#') =>
{
    return(
        <div class="modal fade" id="defnModal" tabindex="-1" aria-labelledby="defnModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="defnModalLabel">QR Ready!</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-6">
                                Your graph has been sent to the 8th Wall AR visualizer! Scan the QR code with your mobile device to view it. 
                                <br/>If you’re already on mobile, simply tap <a href={link}>HERE</a> to view!
                            </div>
                            <div class="col-6">
                                {code}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}