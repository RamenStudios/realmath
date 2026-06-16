import { use, useEffect, useState } from 'react'
import { HelpMessage } from './HelpMessage'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { QRCode } from 'react-qrcode-logo';

export const RamenModal = ({parentState, handleClose}) =>
{	
	if (parentState.label !== null) {
		const getContent = () => {
			return parentState.label == `HELP/FAQ` ? HelpMessage : parentState.content
		}

		console.log(`returning modal`)
		
		return (
			<Modal show={parentState.show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{parentState.label}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{parentState.incontent}</Modal.Body>
			</Modal>
		)
	} else {
		return(
			<Modal show={parentState.show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>8th Wall Visualization</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						Your graph has been sent to the 8th Wall AR visualizer! Scan the QR code with your mobile device to view it. 
					</div>
					<div className="row mt-3 gx-0">
						<div className="col-6 text-start">If you’re already on mobile, just tap <a id="qrLink" href={parentState.incontent}>HERE</a> to view!</div>
						<div className="col-6"><QRCode value={parentState.incontent} quietZone={5}/></div>
					</div>
				</Modal.Body>
			</Modal>
		)
	}
}