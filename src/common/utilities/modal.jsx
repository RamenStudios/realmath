import { use, useEffect, useState } from 'react';
import { HelpMessage } from './HelpMessage';

export const Modal = ({inlabel, incontent, state, toggle}) =>
{
	const getClass = () => {
		return state ? 'modal-show' : ''
	}
	
	const getContent = () => {
		return inlabel == `HELP/FAQ` ? HelpMessage : incontent
	}
	
	<div class={getClass()} id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="modalLabel">{inLabel}</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick={toggle}></button>
				</div>
				<div class="modal-body">{getContent}</div>
			</div>
		</div>
	</div>
}