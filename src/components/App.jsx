import { Footer } from "./footer/dfooter"
import { Header } from "./header/dheader"
import { About } from "./about/dabout"
import { Selector } from "./selector/dselector"
import { Tabs } from "./tabs/dtabs"
import { BottomButtons } from "./bottomButtons/dbuttons"
import { Modal } from "../common/utilities/modal"
import { QRModal } from "../common/utilities/qrModal"
import { useState, useEffect, useRef } from "react"
import { ErrorBoundary } from "./ErrorBoundary"

const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'
const URL = {current:''}

export default function App({userframe})
{
    console.log(`APP: User is accessing from ${userframe}`)

    const label = useRef('Placeholder')
    const content = useRef('Placeholder')
    const [pending, setPending] = useState(false)
    const [addTrigger, setaddTrigger] = useState(false)
    const [deleteTrigger, setdeleteTrigger] = useState(false)
    const [contentTrigger, setcontentTrigger] = useState(false)
    const [selectedComponent, setSelectedComponent] = useState('Function (xyz)')
    
    /* updates component selected by selector */
    const updateSelectedRef = (selection) => {
        setSelectedComponent(selection)
    }

	/* set modal content and adjust trigger flag if needed */
    const setModal = (newlabel, newcontent, error = null) => {
        label.current = newlabel
        content.current = newcontent
		if (error !== null) {
            setTrigger(error, false)
        } else {
            setPending(true)
        }
    }



	/* set qr url */
    const setURL = (urlin) => {
        label.current = `QR`
        URL.current = `${BASE_URL}${urlin}`
    }

	/* components can set these triggers for universal processes */
    const setTrigger = (trigger, flag) => {
        console.log(`CALLING SETTRIGGER ${trigger} ${flag}`)
        switch(trigger){
            case 'add' || 0:
                if (addTrigger !== flag) {
                    setaddTrigger(flag)
                }
                break
            case 'delete' || 1:
                if (deleteTrigger !== flag) {
                    setdeleteTrigger(flag)
                }
                break
            case 'content' || 2:
                if (contentTrigger !== flag) {
                    setcontentTrigger(flag)
                }
                break
        }
    }

    useEffect(() => {
     if (pending === true) {
        if (label.current === `QR`) {
            document.getElementById('qrModal').show()
        } else {
            document.getElementById('modal').show()
        }
        setPending(false)
     }   
    }, [pending])

    return(
        <div>
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <Modal inlabel={label} incontent={content}/>
            <QRModal url={URL}/>
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
            <Footer userframe={userframe}/></ErrorBoundary>
        </div>
    )
}
