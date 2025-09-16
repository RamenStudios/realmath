import { Footer } from "./footer/dfooter"
import { Header } from "./header/dheader"
import { About } from "./about/dabout"
import { Selector } from "./selector/dselector"
import { Tabs } from "./tabs/dtabs"
import { BottomButtons } from "./bottomButtons/dbuttons"
import { Modal } from "../common/utilities/modal"
import { QRModal } from "../common/utilities/qrModal"
import { useState } from "react"
const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'

export default function App({userframe})
{
    console.log(`User is accessing from ${userframe}`)

    const [qrUrl, setQrUrl] = useState(BASE_URL)
    const [label, setLabel] = useState('Placeholder')
    const [content, setContent] = useState('Placeholder')
    const [addTrigger, setaddTrigger] = useState(false)
    const [deleteTrigger, setdeleteTrigger] = useState(false)
    const [contentTrigger, setcontentTrigger] = useState(false)

    const setModal = (newlabel, newcontent) => {
        setLabel(newlabel)
        setContent(newcontent)
    } 

    const setURL = (urlin) => {
        setQrUrl(urlin)
    }

    const setTrigger = (trigger, flag) => {
        switch(trigger){
            case 'add':
                setaddTrigger(flag)
                break
            case 'delete':
                setdeleteTrigger(flag)
                break
            case 'content':
                setcontentTrigger(flag)
                break
        }
    }

    return(
        <div>
            <Modal inlabel={label} incontent={content}/>
            <QRModal url={qrUrl}/>
            <Header userframe={userframe}/>
            <div class="container-lg">
                <About/>
                <Selector setmodal={setModal} userframe={userframe} setTrigger={setTrigger}/>
                <Tabs 
                    setmodal={setModal} 
                    seturl={setURL} 
                    userframe={userframe}
                    addTrigger={addTrigger}
                    deleteTrigger={deleteTrigger}
                    contentTrigger={contentTrigger}
                    setTrigger={setTrigger} />
                <BottomButtons userframe={userframe} contentTrigger={setTrigger}/>
            </div>
            <Footer userframe={userframe}/>
        </div>
    )
}
