import { Footer } from "./footer/dfooter"
import { Header } from "./header/dheader"
import { About } from "./about/dabout"
import { Selector } from "./selector/dselector"
import { Tabs } from "./tabs/dtabs"
import { BottomButtons } from "./bottomButtons/dbuttons"
import { Modal } from "../common/utilities/modal"
import { QRModal } from "../common/utilities/QRModal"

export const Desktop = () =>
{
    return(
        <div>
            <Modal/>
            <QRModal/>
            <Header/>
            <div class="container-lg">
                <About/>
                <Selector/>
                <Tabs/>
                <BottomButtons/>
            </div>
            <Footer/>
        </div>
    )
}