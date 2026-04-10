import { useRef, useState, useEffect } from 'react'
import { TabUIContainer } from './tabuihook'
import { CustomDiv } from '../../common/utilities/customPropDiv'

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
/* contains necessary UI functions while sidestepping SOME useState/useEffect mess */
const TabUIHook = {}
/* quick n dirty error flag solution */
const ErrorOut = {current: false}

export const Tabs = ({setmodal, seturl, userframe, addTrigger, deleteTrigger, contentTrigger, setTrigger, selectedComponent}) => 
{
    console.log(`DTABS`)
	/* ****************************************
	INITIALIZING TABS
	**************************************** */
	/* # of tabs is dynamic */
	const [numTabs, setnumTabs] = useState(1)
	/* selected/displayed tab affects render */
	const [selected, setSelected] = useState(null)
	/* pending flag prevents double render */
	const [pending, setPending] = useState(false)
	/* mount container and initial selection to app */
    const [mounted, setMounted] = useState(false)
	useEffect(() => {
		if (mounted === false) {	
			TabUIHook.Container = new TabUIContainer(setTrigger)
			console.log('TABUIHOOK MOUNT SUCCESSFUL')
			setMounted(true)
        } else if (selected === null) {
			setSelected(TabUIHook.Container.Trackers.Func.get_latest())
			console.log('DEFAULT SELECTION MOUNT SUCCESSFUL')
		}
    }, [mounted])

	/* ****************************************
	ADD TAB
	**************************************** */
	const addRoutine = () => {
		console.log('ADDROUTINE')
		try {
            const tempnumTabs = TabUIHook.Container.add(GraphKeys[selectedComponent], numTabs)
			if (tempnumTabs !== -1) {
				setnumTabs(tempnumTabs)
			} else {
				throw new Error(`Could not add new tab. Reversing trigger`)
			}
		} catch (e) {
			ErrorOut.current = true
			setPending(false)
			console.error(`error in Tabs.addRoutine: ${e}`)
		}
	}
	
	/* ****************************************
	CHANGE SELECTED TAB
	**************************************** */
	/* triggers the change event on button click */
	const selectionAction = (name) => {
		try {
			const newSelection = TabUIHook.Container.get_selected(selected, name)
			if (newSelection !== -1) {
				setSelected(newSelection)
			} else {
				throw new Error(`Error in Tabs.selectionAction`)
			}
		} catch (e) {
			console.error(`${e}`)
		}
	}

	/* ****************************************
	DELETE TAB
	**************************************** */
	const deleteRoutine = () => {
		const newSelection = TabUIHook.Container.del(selected)
		try {
			if (newSelection !== -1) {
				setSelected(newSelection)
			} else {
				throw new Error(`Error in Tabs.deleteRoutine`)
			}
		} catch (e) {
			ErrorOut.current = true
			setPending(false)
			console.error(`${e}`)
		}
	}
	
	/* ****************************************
	SELECTED USEEFFECT
	**************************************** */
	useEffect(() => {
		if ((mounted === true) && (selected !== null)) {
			if (deleteTrigger === true) {
				const tempnumTabs = numTabs + 1
				setnumTabs(tempnumTabs)
			}
		}
	}, [selected])
	
	/* ****************************************
	NUMTABS USEEFFECT
	**************************************** */
	useEffect(() => {
		if ((mounted === true) && (selected !== null)) {
			if (pending === true) {
				setPending(false)
			}
		}
	}, [numTabs])
	
	/* ****************************************
	EXPORT TABS
	**************************************** */
	const contentRoutine = () => {
		const url = TabUIHook.Container.stringify_tabs()
		if(url !== -1) {
			seturl(`${BASE_URL}${url}`)
		} else {
			setmodal(`ERROR!`, INPUT_ERROR_MSG, 2)
			ErrorOut.current = true
		}
	}

	/* ****************************************
	LISTENING FOR TRIGGERS FROM PARENT
	*	useEffect ensures it runs AFTER render 
	*	always update URL
	*   addTrigger -> tab addition
	*   deleteTrigger -> tab deletion
	**************************************** */
	useEffect(() => {
		if ((mounted === true) && (selected !== null)) {
			seturl(TabUIHook.Container.stringify_tabs())
			if ((pending && ErrorOut) === false) {
				if (addTrigger === true) {
					setPending(true)
					addRoutine()
				} else if (deleteTrigger === true) {
					setPending(true)
					deleteRoutine()
				} else if (contentTrigger === true) {
					setPending(true)
					contentRoutine()
				}
			} else {
				ErrorOut.current = false
				if (addTrigger === true) {
					setTrigger('add', false)
				} else if (deleteTrigger === true) {
					setTrigger('delete', false)
				} else if (contentTrigger === true) {
					setTrigger('content', false)
				}
			}
		}
	})

	/* ****************************************
	RENDERING
	**************************************** */
	const getCard = () => {
        console.log('getting card')
        try {
            return selected.display(userframe)
        } catch (e) {
            console.log(`error with displaying card: ${e}`)
            return `N/A`
        }
	}

    const getSelectedDisplay = () => {
        console.log('getting selected name')
        try {
            return selected.name
        } catch (e) {
            console.log(`error with displaying name: ${e}`)
            return `N/A`
        }
    }

	const get_unselected_names = () => {
		try {
			const unselected = TabUIHook.Container.get_unselected()
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