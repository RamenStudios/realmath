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

    return(
        <div>
            <Modal/>
            <QRModal url={qrUrl}/>
            <Header/>
            <div class="container-lg">
                <About/>
                <Selector/>
                <Tabs seturl={setQrUrl}/>
                <BottomButtons/>
            </div>
            <Footer/>
        </div>
    )
}