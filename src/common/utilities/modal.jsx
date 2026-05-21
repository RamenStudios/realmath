import { use, useEffect, useState } from 'react'
import { HelpMessage } from './HelpMessage'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export const RamenModal = ({inlabel, incontent, show, handleClose}) =>
{	
	const getContent = () => {
		return inlabel == `HELP/FAQ` ? HelpMessage : incontent
	}

	console.log(`returning modal`)
	
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{inlabel}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{incontent}</Modal.Body>
		</Modal>
	)
}