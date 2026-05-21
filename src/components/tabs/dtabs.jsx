import { useRef, useState, useEffect } from 'react'
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
/* contains necessary UI functions while sidestepping SOME useState/useEffect mess */
const TabUIHook = {}
/* quick n dirty error flag solution */
const ErrorOut = {current: false}

export const Tabs = ({setModal, seturl, userframe, triggerFlag, setTrigger, selectedComponent, resetTriggers}) => 
{
    console.log(`DTABS`)
	/* ****************************************
	INITIALIZING TABS
	**************************************** */
	/* # of tabs is dynamic */
	const numTabs = useRef(1)
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
		console.log(`ADDROUTINE, pending=${pending}`)
		try {
            const tempnumTabs = TabUIHook.Container.add(GraphKeys[selectedComponent.current], numTabs.current)
			if (tempnumTabs !== -1) {
				numTabs.current = (tempnumTabs)
			} else {
				console.error(`Could not add new tab. Reversing trigger`)
				ErrorOut.current = true
			}
		} catch (e) {
			console.error(`error in Tabs.addRoutine: ${e}`)
			ErrorOut.current = true
		}
		setPending(false)
	}
	
	/* ****************************************
	CHANGE SELECTED TAB
	**************************************** */
	/* triggers the change event on button click */
	const selectionAction = (name) => {
		try {
			const newSelection = TabUIHook.Container.get_selected(selected, name)
			resetTriggers()
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
		console.log(`deleteRoutine running`)
		const newSelection = TabUIHook.Container.del(selected)
		try {
			if (newSelection !== -1) {
				numTabs.current -= 1
				console.log(`newSelection after deletion is:`)
				console.log(newSelection)
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
			setPending(false)
		}
	}, [selected])
	
	/* ****************************************
	PENDING USEEFFECT
	**************************************** */
	useEffect(() => {
		console.log(`PENDING USEEFFECT, PENDING=${pending}`)
		if ((mounted === true) && (selected !== null)) {
			if (pending === false) {
				resetTriggers()
			} else {
				switch (triggerFlag.current) {
					case 0:
						addRoutine()
						break
					case 1:
						deleteRoutine()
						break
					case 3:
						contentRoutine()
						break
				}
			}
		}
	}, [pending])
	
	/* ****************************************
	EXPORT TABS
	**************************************** */
	const contentRoutine = () => {
		const url = TabUIHook.Container.stringify_tabs()
		if(url !== -1) {
			seturl(`${BASE_URL}${url}`)
		} else {
			setModal(`ERROR!`, INPUT_ERROR_MSG, 2)
			ErrorOut.current = true
		}
	}

	/* ****************************************
	LISTENING FOR TRIGGERS FROM PARENT
	*	useEffect ensures it runs AFTER render 
	**************************************** */
	useEffect(() => {
		console.log(`dtabs reloaded, mounted=${mounted}, selected=`)
		console.log(selected)
		console.log(`trigger is ${triggerFlag.current}`)
		if (triggerFlag.current !== 4) {
			if ((mounted === true) && (selected !== null)) {
				if ((pending && ErrorOut) === false) {
					if ((triggerFlag.current !== -1)) {
						setPending(true)
					}
				} else {
					ErrorOut.current = false
					resetTriggers()
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