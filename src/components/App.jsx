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

export default function App({userframe})
{
    console.log(`APP: User is accessing from ${userframe}`)

    const label = useRef('Placeholder')
    const content = useRef('Placeholder')
    const [URL, setURL] = useState('/')
    const [pending, setPending] = useState(false)
    const addTrigger = useRef(false)
    const deleteTrigger = useRef(false)
    const contentTrigger = useRef(false)
    const [eventTrigger, setEventTrigger] = useState(false)    // reload call
    const [selectedComponent, setSelectedComponent] = useState('Function (xyz)')
    const [qrModalVis, setqrModalVis] = useState(false)
    const [modalVis, setModalVis] = useState(false)
    
    /* updates component selected by selector */
    const updateSelectedRef = (selection) => {
        console.log(selection)
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
    const setURLHook = (urlin) => {
        console.log(`setting url`)
        label.current = `QR`
        setTrigger('content', false)
        setURL(`${BASE_URL}${urlin}`)
    }
    /* then pending */
    useEffect(() => {
        setPending(true)
    }, [URL])

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

    useEffect(() => {
        console.log(`pending useeffect, currently ${pending}`)
        if (pending === true) {
            console.log(`label: ${label.current}`)
            if (label.current === `QR`) {
                setqrModalVis(true)
            } else {
                setModalVis(true)
            }
        }
    }, [pending])

    useEffect(() => {
        console.log(`qr vis: ${qrModalVis}`)
        console.log(`modal vis: ${modalVis}`)
        setPending(false)
    }, [qrModalVis, modalVis])

    return(
        <div>
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <Modal inlabel={label} incontent={content} vis={modalVis} onclose={() => {setModalVis(false)}}/>
            <QRModal url={URL} vis={qrModalVis} onclose={() => {setqrModalVis(false)}}/>
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
                />
                <BottomButtons userframe={userframe} setTrigger={setTrigger} setmodal={setModal}/>
            </div>
            <Footer userframe={userframe}/></ErrorBoundary>
        </div>
    )
}
