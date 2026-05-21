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
    
    /*
        * Flag for the different event triggers
        * * Single int switch is faster for such limited options
        * 0 = add
        * 1 = delete
        * 3 = content (qr)
        * 4 = modal
        * -1 = default (no event)
    */
    const triggerFlag = useRef(-1)
    const resetTriggers = () => {
        setTrigger(-1, false)
    }
    
    const [eventTrigger, setEventTrigger] = useState(false)    // reload call
    const selectedComponent = useRef('Function (xyz)')
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    /* updates component selected by selector */
    const updateSelectedRef = (selection) => {
        console.log(selection)
        if (triggerFlag.current !== 0) {
            triggerFlag.current = 4
        }
        selectedComponent.current = (selection)
        setEventTrigger(!eventTrigger)
    }

	/* set modal content and adjust trigger flag if needed */
    /* signal tells us if anything diff from normal 
        * signal ints correspond to trigger flag ints
    */
    const setModal = (newlabel, newcontent, signal = null) => {
        label.current = newlabel
        content.current = newcontent
		switch (signal) {
            case null:
                break
            case 4:
                setTrigger(signal, true)
                break
            default:
                setTrigger(signal, false)
        }
    }

    /* event calls on reload */
    useEffect(() => {
        console.log(`selectedComponent useEffect, triggerFlag is ${triggerFlag.current}`)
        if (triggerFlag.current === 4) {
            resetTriggers()
            handleShow()
        }
    })

	/* set qr url */
    const setURLHook = (urlin) => {
        console.log(`setting url`)
        label.current = `QR`
        url.current = (`${BASE_URL}${urlin}`)
        setTrigger(3, false)
    }

	/* components can set these triggers for universal processes */
    const setTrigger = (trigger, flag, reload=true) => {
        console.log(`CALLING SETTRIGGER ${trigger}`)
        if (flag === true) {
            console.log(`setting trigger to ${flag}`)
            triggerFlag.current = trigger
        } else {
            triggerFlag.current = -1
        }
        if (reload) {
            console.log(`setTrigger reload, eventTrigger currently ${eventTrigger}`)
            console.log(`setting eventTrigger to ${!eventTrigger}`)
            setEventTrigger(!eventTrigger)
        }
    }

    return(
        <div>
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <RamenModal inlabel={label.current} incontent={content.current} show={show} handleClose={handleClose}/>
            <Header userframe={userframe}/>
            <div className="container-lg">
                <About userframe={userframe}/>
                <Selector 
                    setModal={setModal} 
                    userframe={userframe} 
                    updateSelectedRef={updateSelectedRef}
                    setTrigger={setTrigger}
                    eventTrigger={eventTrigger}
				/>
                <Tabs 
                    setModal={setModal} 
                    seturl={setURLHook} 
                    userframe={userframe}
                    triggerFlag={triggerFlag}
                    setTrigger={setTrigger}
                    selectedComponent={selectedComponent}
                    resetTriggers={resetTriggers}
                />
                <BottomButtons 
                    userframe={userframe} 
                    setTrigger={setTrigger} 
                    setModal={setModal}
                />
            </div>
            <Footer userframe={userframe}/></ErrorBoundary>
        </div>
    )
}
