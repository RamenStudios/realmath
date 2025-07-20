import { Footer } from "./footer/dfooter"
import { Header } from "./header/dheader"
import { About } from "./about/dabout"
import { Selector } from "./selector/dselector"
import { Tabs } from "./tabs/dtabs"
import { BottomButtons } from "./bottomButtons/dbuttons"
import { Modal } from "../common/modal"
import { useRef } from "react"

export const Desktop = () =>
{
    return(
        <div>
            <Modal/>
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