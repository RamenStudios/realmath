import { Footer } from "./footer/dfooter"
import { Header } from "./header/dheader"
import { About } from "./about/dabout"
import { Selector } from "./selector/dselector"
import { Tabs } from "./tabs/dtabs"
import { BottomButtons } from "./bottomButtons/dbuttons"
import { Modal } from "../common/utilities/modal"
import { QRModal } from "../common/utilities/qrModal"
import { useState, useEffect, useRef } from "react"
const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'

export default function App({userframe})
{
    console.log(`User is accessing from ${userframe}`)

    const qrUrl = useRef(BASE_URL)
    const label = useRef('Placeholder')
    const content = useRef('Placeholder')
    const [addTrigger, setaddTrigger] = useState(false)
    const [deleteTrigger, setdeleteTrigger] = useState(false)
    const [contentTrigger, setcontentTrigger] = useState(false)
		const [show, setShow] = useState(false)
		const errorFlags = 	{
													0: 'add',
													1: 'delete',
													2: 'content'
												}
		const pendingModal = useRef(false)
		const selectedComponent = useRef('Function (xyz)')
		
		/* updates component selected by selector */
		const updateSelectedRef = (selection) => {
			selectedComponent.current = selection
		}

		/* set modal content and adjust trigger flag if needed */
    const setModal = (newlabel, newcontent, error = null) => {
        label.current = newlabel
        label.content = newcontent
				setShowRef(error)
    }
		
		/* allows us to call pending flag outside render call */
		const setShowRef = (error = null) => {
				pendingModal.current = false
				if (error === null) {	
					setShow(true)
				} else {
					pendingModal.current = true
					setTrigger(errorFlags[error], false)
				}
		}
		
		/* shows modal after trigger flags updated (if pending) */
		useEffect(() => {
			if (pendingModal.current === true) {
				setShowRef()
			}
		}, [addTrigger, deleteTrigger, contentTrigger])
		
		/* updates modal state on x click */
		const hideModal = () => {
			setShow(false)
		}

		/* set qr url */
    const setURL = (urlin) => {
        qrUrl.current = urlin
    }

		/* components can set these triggers for universal processes */
    const setTrigger = (trigger, flag) => {
        console.log(`CALLING SETTRIGGER`)
        switch(trigger){
            case 'add':
                if (addTrigger !== flag) {
                    setaddTrigger(flag)
                }
                break
            case 'delete':
                if (deleteTrigger !== flag) {
                    setdeleteTrigger(flag)
                }
                break
            case 'content':
                if (contentTrigger !== flag) {
                    setcontentTrigger(flag)
                }
                break
        }
    }

    return(
        <div>
            <Modal inlabel={label} incontent={content} state={show} toggle={hideModal}/>
            <QRModal url={qrUrl}/>
            <Header userframe={userframe}/>
            <div class="container-lg">
                <About userframe={userframe}/>
                <Selector 
									setmodal={setModal} 
									userframe={userframe} 
									updateSelectedRef={updateSelectedRef}
									setTrigger={setTrigger}
								/>
                <Tabs 
                    setmodal={setModal} 
                    seturl={setURL} 
                    userframe={userframe}
                    addTrigger={addTrigger}
                    deleteTrigger={deleteTrigger}
                    contentTrigger={contentTrigger}
                    setTrigger={setTrigger}
										selectedComponent={selectedComponent}
									/>
                <BottomButtons userframe={userframe} setTrigger={setTrigger} setmodal={setModal}/>
            </div>
            <Footer userframe={userframe}/>
        </div>
    )
}
