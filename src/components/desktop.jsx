import { Footer } from "./footer/dfooter"
import { Header } from "./header/dheader"
import { About } from "./about/dabout"
import { Selector } from "./selector/dselector"
import { Tabs } from "./tabs/dtabs"
import { BottomButtons } from "./bottomButtons/dbuttons"
import { Modal } from "../common/utilities/modal"
import { QRModal } from "../common/utilities/QRModal"
import { useState } from "react"
const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'

export const Desktop = () =>
{
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
            <Header/>
            <div class="container-lg">
                <About/>
                <Selector setmodal={setModal}/>
                <Tabs setmodal={setModal} seturl={setURL}/>
                <BottomButtons/>
            </div>
            <Footer/>
        </div>
    )
}