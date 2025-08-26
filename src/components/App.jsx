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

    const setModal = (newlabel, newcontent) => {
        setLabel(newlabel)
        setContent(newcontent)
    } 

    const setURL = (urlin) => {
        setQrUrl(urlin)
    }

    return(
        <div>
            <Modal inlabel={label} incontent={content}/>
            <QRModal url={qrUrl}/>
            <Header userframe={userframe}/>
            <div class="container-lg">
                <About/>
                <Selector setmodal={setModal} userframe={userframe}/>
                <Tabs setmodal={setModal} seturl={setURL} userframe={userframe}/>
                <BottomButtons userframe={userframe}/>
            </div>
            <Footer userframe={userframe}/>
        </div>
    )
}
