import { useRef, useState, useEffect } from 'react';
import { GraphComponents } from "../../common/utilities/graphComponents";
import { Tab, TabTracker, getTabStringify } from "./tabclasses";
import { CustomDiv } from '../../common/utilities/customPropDiv';
import { ShowModal, ShowQR } from '../../common/services/ModalService';
import { GetFormData } from '../../common/services/FormService';
import $ from 'jquery';

/* useful constants */
const BASE_URL = 'https://ndlearning.8thwall.app/realmath/'
const DELETION_ERROR_MSG = `You cannot delete all components-- empty graphs are considered invalid. Try adding another first!`
const LIMIT_ERROR_MSG = `There can only be a maximum of three components!`
const INPUT_ERROR_MSG = `If you are seeing this message, there was a problem with your inputs! 
                         Input fields cannot be left empty. Function inputs must include at least one variable on at least one side of the equation.
                         Additionally, the assignment character '=' will cause your input to throw an error!`
const VIEW_ERROR_MSG = `You should not be able to see this message! If you can, please report it as a bug.`

/* limit elements to avoid crashes */
const limit = 3
/* ensures limit not reached */
var numtabs = 1
/* lets us mount func 1 to app */
const mounted = {current: false}
/* making trackers const */
const FuncTracker = new TabTracker('Func', true)
const PtTracker = new TabTracker('Pt')
const VecTracker = new TabTracker('Vec')
const VFldTracker = new TabTracker('VFld')
const SCrvTracker = new TabTracker('SCrv')

export const Tabs = ({setmodal, seturl, userframe, addTrigger, deleteTrigger, contentTrigger, setTrigger, selectedComponent}) => 
{
	/* ****************************************
	INITIALIZING TABS
	**************************************** */
	/* hooks tracking graph element additions */
	const [tabsList, settabsList] = useState({
																						Func: FuncTracker,
																						Pt: PtTracker,
																						Vec: VecTracker,
																						VFld: VFldTracker,
																						SCrv: SCrvTracker,
																						Unselected:{},
																						Selected: None,
																					})
	/* status for add tab requests */
	const [pending, setPending] = useState(false)
	const pendingType = useRef()
	/* status for change tab requests */
	const [change, setChange] = useState(false)
	const changeName = useRef()
	/* mount app to first tab */
	if (mounted.current === false) {
		mounted.current = true
		tabsList.Func.mountSetTrigger(setTrigger)
	}
	/* 0=addition warning, 1=deletion warning, 2=content warning */
	const currentmodal = useRef(0)

	/* ****************************************
	LISTENING FOR TRIGGERS FROM PARENT
	*   addTrigger -> tab addition
	*   deleteTrigger -> tab deletion
	**************************************** */
	if (addTrigger === true) {
		if (numtabs >= 1) {
			addRoutine()
		} else {
			setmodal(`ADDITION ERROR`, LIMIT_ERROR_MSG, 0)
		}
	} else if (deleteTrigger === true) {
		if (numtabs > 1) {
			deleteRoutine()
		} else {
			setmodal(`DELETION ERROR`, DELETION_ERROR_MSG, 1)
		}
	} else if (contentTrigger === true) {
		contentRoutine()
	}

	/* ****************************************
	ADD TAB
	**************************************** */
	addRoutine = () => {
		try {
			/* add a tab of the chosen type to the queue */
			pendingType.current = selectedComponent.current
			setPending(true)
		} catch (error) {
			console.error(error)
			return
		}
	}

	/* ****************************************
	DELETE TAB
	**************************************** */
	deleteRoutine = () => {
		getSelected(Object.keys(tabsList.Unselected)[0])
	}
	
	/* ****************************************
	EXPORT TABs
	**************************************** */
	contentRoutine = () => {
		const url = getTabStringify(tabsList)
		if(url !== -1) {
				seturl(`${BASE_URL}${url}`)
		} else {
				setmodal(`ERROR!`, INPUT_ERROR_MSG, 2)
		}
	}
	
	/* ****************************************
	CHANGE SELECTED TAB
	**************************************** */
	/* triggers the change event on button click */
	const selectionAction = (name) =>
	{
		changeName.current = name
		setChange(true)
	}

	 /* handles change in selected tab */
	const getSelected = (name) =>
	{   
		const templist = {...tabsList}
		const selected = tabsList.Selected
		const selection = tabsList.Unselected[name]
		/* delete selection from set of unselected tabs */
		delete templist.Unselected[name]
		/* deselect currently selected tab */
		selected.deselect()
		/* if no deletion requested, push it to list of unselected tabs */
		/* otherwise, get its parent and call for deletion */
		if (deleteTrigger === false) {   
			templist.Unselected[selected.name] = selected
		} else {
			selected.parent.removeTab(selected.index)
		}
		/* apply appropriate flag to new selection */
		selection.select()
		/* set new selection */
		templist.Selected = selection
		settabsList({...templist})
	}

	/* ****************************************
	PENDING USEEFFECT
	*   pending in 'true' state tells us
			there is a request to add a tab
	*   if pending is false, addition is
			complete, and signaled to parent
	**************************************** */
	useEffect(() => 
	{
		if (pending === true) {
			try {
				console.log(`pending set to ${pendingType.current}`)
				/* temporary list for adding to tabs collection */
				let templist = {...tabsList}
				templist[pendingType.current].add(numtabs, setTrigger)
				numtabs += 1 // only increments once addition successful
				/* update name lists as well for display */
				templist.Unselected[templist[pendingType.current].getLatest().name] = templist[pendingType.current].getLatest()
				/* formalize tabs collection additions, indicate queue empty */
				settabsList({...templist})
			} catch (error) {
				console.log(error)
			} 
		} else {
			setTrigger('add', false)
		}
	}, [pending])

	/* ****************************************
	TABSLIST USEEFFECT
	*   if tabsList is changed while there is
			a rq for addition, we know to update
			the pending state
	*   the alternative is that tabsList was
			changed via tab selection or deletion,
			so we send the corresponding 
			completion signal
	**************************************** */
	useEffect(() =>
	{
		if (pending === true) {
			setPending(false)
		} else if (change === true) {
			setChange(false)
		} else {
			setTrigger('delete', false)
		}
	}, [tabsList])

	/* ****************************************
	CHANGE USEEFFECT
	*   triggered when tab changed by selection
	*   not triggered by deletion
	**************************************** */
	useEffect(() =>
	{
		if (change === true) {
			getSelected(changeName.current)
		}
	}, [change])

	/* ****************************************
	RENDERING
	**************************************** */
	const getCard = () => {
		return tabsList.Selected.display(userframe)
	}
			
	return(
		<div class="container container-lg my-3">
			<CustomDiv idIn="numTabs" inputData={numtabs}/>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a class="nav-link active" aria-current="page" href="#"><div class="mobile-body">{tabsList.Selected.name}</div></a>
				</li>
				{
					<>
						{Object.keys(tabsList.Unselected).map((tab) => (
							<li class="page-item">
								<a class="page-link" href="#" onClick={() => {selectionAction(tab)}}>
									<div class="mobile-body">{tab}</div>
								</a>
							</li>
						))}
					</>
				}
			</ul>
			{getCard(userframe)}
		</div>
	)
}