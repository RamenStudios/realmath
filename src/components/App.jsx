import { Footer } from "./footer/dfooter"
import { Header } from "./header/dheader"
import { About } from "./about/dabout"
import { Selector } from "./selector/dselector"
import { Tabs } from "./tabs/dtabs"
import { BottomButtons } from "./bottomButtons/dbuttons"
import { RamenModal } from "../common/utilities/modal"
import { QRModal } from "../common/utilities/qrModal"
import { useState, useEffect, useRef } from "react"
import { ErrorBoundary } from "./ErrorBoundary"

const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'

export default function App({userframe})
{
    console.log(`APP: User is accessing from ${userframe}`)

    const label = useRef('Placeholder')
    const content = useRef('Placeholder')
    const URL = useRef('/')
    
    const addTrigger = useRef(false)
    const deleteTrigger = useRef(false)
    const contentTrigger = useRef(false)
    const modalTrigger = useRef(false)
    
    const [eventTrigger, setEventTrigger] = useState(false)    // reload call
    const selectedComponent = useRef('Function (xyz)')
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    /* updates component selected by selector */
    const updateSelectedRef = (selection) => {
        console.log(selection)
        if (addTrigger.current === false) {
            modalTrigger.current = true
        }
        selectedComponent.current = (selection)
        setEventTrigger(!eventTrigger)
    }

	/* set modal content and adjust trigger flag if needed */
    const setModal = (newlabel, newcontent, error = null) => {
        label.current = newlabel
        content.current = newcontent
		if (error !== null) {
            setTrigger(error, false)
        } 
    }

    /* event calls on reload */
    useEffect(() => {
        console.log(`selectedComponent useEffect, contentTrigger is ${contentTrigger.current}`)
        if (modalTrigger.current === true) {
            modalTrigger.current = false
            handleShow()
        }
    })

	/* set qr url */
    const setURLHook = (urlin) => {
        console.log(`setting url`)
        label.current = `QR`
        url.current = (`${BASE_URL}${urlin}`)
        setTrigger('content', false)
    }

	/* components can set these triggers for universal processes */
    const setTrigger = (trigger, flag, reload=true) => {
        console.log(`CALLING SETTRIGGER ${trigger} ${flag}`)
        switch(trigger){
            case 'add' || 0:
                addTrigger.current = flag
                break
            case 'delete' || 1:
                deleteTrigger.current = flag
                break
            case 'content' || 2:
                label.current = `QR`
                contentTrigger.current = flag
                break
        }
        if (reload) {
            setEventTrigger(!eventTrigger)
        }
    }

    const resetTriggers = () => {
        addTrigger.current = false
        deleteTrigger.current = false
        contentTrigger.current = false
    }

    return(
        <div>
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <RamenModal inlabel={label.current} incontent={content.current} show={show} handleClose={handleClose}/>
            <Header userframe={userframe}/>
            <div className="container-lg">
                <About userframe={userframe}/>
                <Selector 
                    setmodal={setModal} 
                    userframe={userframe} 
                    updateSelectedRef={updateSelectedRef}
                    setTrigger={setTrigger}
				/>
                <Tabs 
                    setmodal={setModal} 
                    seturl={setURLHook} 
                    userframe={userframe}
                    addTrigger={addTrigger}
                    deleteTrigger={deleteTrigger}
                    contentTrigger={contentTrigger}
                    setTrigger={setTrigger}
                    selectedComponent={selectedComponent}
                    resetTriggers={resetTriggers}
                />
                <BottomButtons userframe={userframe} setTrigger={setTrigger} setmodal={setModal}/>
            </div>
            <Footer userframe={userframe}/></ErrorBoundary>
        </div>
    )
}
