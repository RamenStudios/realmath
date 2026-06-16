import { useRef, useState, useEffect, useReducer } from 'react'
import { TabUIContainer } from './tabuihook'
import { CustomDiv } from '../../common/utilities/customPropDiv'

/*
	* Flag for the different event triggers
	* * Single int switch is faster for such limited options
	* 0 = add
	* 1 = delete
	* 3 = content (qr)
	* 4 = modal
	* -1 = default (no event)
*/

/* useful constants */
const BASE_URL = 'https://ndlearning.8thwall.app/realmath/'
const DELETION_ERROR_MSG = `You cannot delete all components-- empty graphs are considered invalid. Try adding another first!`
const LIMIT_ERROR_MSG = `There can only be a maximum of three components!`
const INPUT_ERROR_MSG = `If you are seeing this message, there was a problem with your inputs! 
                         Input fields cannot be left empty. Function inputs must include at least one variable on at least one side of the equation.
                         Additionally, the assignment character '=' will cause your input to throw an error!`
const VIEW_ERROR_MSG = `You should not be able to see this message! If you can, please report it as a bug.`

/* limit elements to avoid crashes */
const GraphKeys =   {
                        "Function (xyz)": 'Func', 
                        "Point (xyz)": 'Pt', 
                        "Vector <a,b,c>": 'Vec', 
                        "Vector Field": 'VFld', 
                        "Space Curve r(t)": 'SCrv',
                    }

const reducer = (state, action) => {
	const temp = {...state}
	/* selection helper */
	switch (action.type) {
		case 'NUM':
			temp.action = 'NUM'
			console.log(action)
			try {
				temp.numTabs = action.numTabs
			} catch (e) {
				console.error(`error in numTab change: ${e}`)
			}
			if (action.selected !== undefined) {
				temp.selected = {...action.selected}
			}
			break
		case "SEL":
			temp.action = 'SEL'
			temp.actionCalls += 1
			temp.newSel = action.name
			break
	}
	return {...temp}
}

export const Tabs = ({userframe, parentDispatch, parentState, seturl}) => 
{
    console.log(`DTABS`)

	/* ****************************************
	INITIALIZING TABS
	**************************************** */
	const tabs = useRef(new TabUIContainer(() => {state.parentDispatch({type: 'DEL'})}))
	const [state, dispatch] = useReducer(reducer, {
		parentDispatch: parentDispatch,
		numTabs: 1,
		selected: tabs.current.Trackers.Func.get_latest(),
		newSel: null,
		action: null,
		actionCalls: 0,
	})

	console.log(tabs.current)

	/* url helper */
	const sendURL = () => {
		const url = tabs.current.stringify_tabs()
		if(url !== -1) {
			seturl(`${BASE_URL}${url}`)
		}
	}

	/* ****************************************
	LISTENING FOR ADDITION/DELETION
	**************************************** */
	useEffect(() => {
		if (parentState.action === 'ADD') {
			if (state.numTabs < 3) {
				const tempnumTabs = tabs.current.add(GraphKeys[parentState.component], state.numTabs)
				if (tempnumTabs !== -1) {
					sendURL()
					dispatch({
						type: 'NUM',
						numTabs: tempnumTabs,
					})
				}
			}
		} else if (parentState.action === 'DEL') {
			if (state.numTabs > 1) {
				const newSelection = tabs.current.del(state.selected)
				sendURL()
				if (newSelection !== -1) {
					dispatch({
						type: 'NUM',
						numTabs: state.numTabs - 1,
						selected: newSelection,
					})
				}
			}
		}
	}, [parentState.actionCalls])

	/* ****************************************
	LISTENING FOR CHANGE DISPATCH
	**************************************** */
	useEffect(() => {
		if (state.action === 'SEL') {
			try {
				console.log(tabs.current)
				const newSelection = tabs.current.get_selected(state.selected, state.newSel)
				console.log(tabs.current)
				if (newSelection !== -1) {
					state.selected = newSelection
				} else {
					throw new Error(`Error in Tabs.selectionAction`)
				}
			} catch (e) {
				console.error(`${e}`)
			}
		}
	}, state.actionCalls)

	/* ****************************************
	ONCLICK CHANGE SELECTED TAB
	**************************************** */
	/* triggers the change event on button click */
	const selectionAction = (name) => {
		dispatch({
			type: 'SEL',
			name: name
		})
	}

	/* ****************************************
	RENDERING
	**************************************** */
	const getCard = () => {
        console.log('getting card')
        try {
            return state.selected.display(userframe)
        } catch (e) {
            console.log(`error with displaying card: ${e}`)
            return `N/A`
        }
	}

    const getSelectedDisplay = () => {
        console.log('getting selected name')
        try {
            return state.selected.name
        } catch (e) {
            console.log(`error with displaying name: ${e}`)
            return `N/A`
        }
    }

	const get_unselected_names = () => {
		try {
			const unselected = tabs.current.get_unselected()
			return unselected
		} catch (e) {
			console.error(`Error in Tabs.get_unselected_names: ${e}`)
			return []
		}
	}
			
	return(
		<div className="container container-lg my-3">
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<a className="nav-link active" aria-current="page" href="#"><div className="mobile-body">{getSelectedDisplay()}</div></a>
				</li>
				{
					<>
						{(get_unselected_names()).map((tab) => (
							<li className="page-item">
								<a className="page-link" href="#" onClick={() => {selectionAction(tab)}}>
									<div className="mobile-body">{tab}</div>
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