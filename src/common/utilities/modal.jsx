import { use, useEffect, useState } from 'react';
import { HelpMessage } from './HelpMessage';

export const Modal = ({inlabel, incontent, vis, onclose}) =>
{
	console.log(`MODAL ${inlabel.current} ${vis}`)
	
	const getContent = () => {
		return inlabel.current == `HELP/FAQ` ? `${HelpMessage}` : incontent.current
	}
	
	<div className="modal" id={`modal ${vis ? 'open' : ''}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<h1 className="modal-title fs-5" id="modalLabel">{inlabel.current}</h1>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onclose}></button>
				</div>
				<div className="modal-body">{getContent}</div>
			</div>
		</div>
	</div>
}