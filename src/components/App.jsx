import { Footer } from "./footer/dfooter"
import { Header } from "./header/dheader"
import { About } from "./about/dabout"
import { Selector } from "./selector/dselector"
import { Tabs } from "./tabs/dtabs"
import { BottomButtons } from "./bottomButtons/dbuttons"
import { RamenModal } from "../common/utilities/modal"
import { QRModal } from "../common/utilities/qrModal"
import { useState, useEffect, useRef, useReducer } from "react"
import { ErrorBoundary } from "./ErrorBoundary"

const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'

const reducer = (state, action) => {
    const temp = {...state}
    temp.actionCalls += 1
    temp.action = action.type
    // this is just a helper
    const updateMod = () => {
        temp.label = action.label
        temp.content = action.content
        temp.vis = action.vis
    }
    // main switches
    switch (action.type) {
        case 'MOD':
            updateMod()
            break
        case 'DEF':
            updateMod()
            temp.component = action.component
            break
        case 'VIS':
            temp.vis = action.vis
            break
        case 'ADD':
            temp.component = action.component
            break
        default:
            console.log('no action taken')
    }
    return {...temp}
}

const initializer = (state) => {
    return {...state, 
        component: 'Function (xyz)',
        label: 'Placeholder',
        content: 'Placeholder',
    }
}

export default function App({userframe})
{
    console.log(`APP: User is accessing from ${userframe}`)
    /* ****************************************
    INITIALIZING APP STATE
    **************************************** */
    const [state, dispatch] = useReducer(reducer, {
        component: null,
        label: null,
        content: null,
        vis: false,
        action: null,
        actionCalls: 0,
    }, initializer)
    const url = useRef('/')

    const handleClose = () => dispatch({type: 'VIS', vis: false})
    const handleShow = () => dispatch({type: 'VIS', vis: true})

    const seturl = (input) => {
        url.current = `${input}`
    }
    const showURL = () => {
        dispatch({
            type: 'MOD',
            label: null,
            content: `${url.current}`,
            vis: true
        })
    }

    return(
        <div>
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <RamenModal parentState={state} handleClose={handleClose}/>
            <Header userframe={userframe}/>
            <div className="container-lg">
                <About userframe={userframe}/>
                <Selector 
                    parentDispatch={dispatch}
                    userframe={userframe}
				/>
                <Tabs 
                    parentDispatch={dispatch}
                    userframe={userframe}
                    parentState={state}
                    seturl={seturl}
                />
                <BottomButtons 
                    userframe={userframe} 
                    parentDispatch={dispatch}
                    showURL={showURL}
                />
            </div>
            <Footer userframe={userframe}/>
            </ErrorBoundary>
        </div>
    )
}
