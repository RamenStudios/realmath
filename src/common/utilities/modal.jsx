import { use, useEffect, useState } from 'react';
import { HelpMessage } from './HelpMessage';

export const Modal = ({inlabel, incontent, state, toggle}) =>
{
	console.log(`MODAL`)

	const getClass = () => {
		return state ? 'modal-show' : ''
	}
	
	const getContent = () => {
		return inlabel == `HELP/FAQ` ? `${HelpMessage}` : incontent
	}
	
	<div className={getClass()} id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<h1 className="modal-title fs-5" id="modalLabel">{inlabel}</h1>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggle}></button>
				</div>
				<div className="modal-body">{getContent}</div>
			</div>
		</div>
	</div>
}