import { useRef, useState, useEffect } from 'react';
import { GraphComponents } from "../../common/utilities/graphComponents";
import { Tab, TabTracker, getTabStringify } from "./tabclasses";
import { CustomDiv } from '../../common/utilities/customPropDiv';
import { ShowModal, ShowQR } from '../../common/services/ModalService';
import { GetFormData } from '../../common/services/FormService';
import $ from 'jquery';

/* useful constants */
const BASE_URL = 'https://ndlearning.8thwall.app/realmath/'
const DELETION_ERROR_MSG = `You cannot delete all components-- empty graphs are considered invalid. Try adding another first!`
const INPUT_ERROR_MSG = `If you are seeing this message, there was a problem with your inputs! 
                         Input fields cannot be left empty. Function inputs must include at least one variable on at least one side of the equation.
                         Additionally, the assignment character '=' will cause your input to throw an error!`
const VIEW_ERROR_MSG = `You should not be able to see this message! If you can, please report it as a bug.`

/* limit elements to avoid crashes */
const limit = 3
/* ensures limit not reached */
var numtabs = 1
/* lets us mount func 1 to app */
const mounted = {current: false}
/* making trackers const */
const FuncTracker = new TabTracker('Func', true)
const PtTracker = new TabTracker('Pt')
const VecTracker = new TabTracker('Vec')
const VFldTracker = new TabTracker('VFld')
const SCrvTracker = new TabTracker('SCrv')

/* silly helper for getting tabs */
const returnCurrentTabs = (tabsList, tabs = {}) =>
{
    /* temporary list for adding to tabs collection */
    let temptabs = {...tabs}
    for (const [key, value] of Object.entries(tabsList))
    {
        try{
            if(value){
                temptabs = {...temptabs, ...value.getTabs()}
            }
        }catch(error)
        {
            console.log(error)
            continue
        }
    }
    return temptabs
}

/* THE MAIN EXPORT */
export const Tabs = ({setmodal, seturl, userframe, addTrigger, deleteTrigger, contentTrigger, setTrigger}) =>
{
    /* hooks tracking graph element additions */
    const [tabsList, settabsList] = useState({
                                                Func: FuncTracker,
                                                Pt: PtTracker,
                                                Vec: VecTracker,
                                                VFld: VFldTracker,
                                                SCrv: SCrvTracker
                                            })
    const [pending, setPending] = useState(false)
    const pendingType = useRef()
    /* mount app to first tab */
    if (mounted.current === false) {
        mounted.current = true
        tabsList.Func.mountSetTrigger(setTrigger)
    }
    /* hook for displaying selected tab */
    const [selected, setSelected] = useState(tabsList.Func.current[1])
    /* stores unselected tabs for easier display */
    const [tabs, setTabs] = useState({});
    /* hook to store just the names */
    const [unselectedNames, setunselectedNames] = useState([])
    /* avoids infinite loops */
    const [addFlag, setaddFlag] = useState(true)
    /* tells us what input field to display */
    const [card, setCard] = useState()
    /* signals reload when a tab is deleted */
    const [deleteFlag, setdeleteFlag] = useState(false)
    /* signals showing modals */
    const [modalFlag, setmodalFlag] = useState(false)
    const [qrFlag, setqrFlag] = useState(false)
    /* 0=deletion warning, 1=qr */
    const currentmodal = useRef(0) 
    /* reload when new content and when modal toggled */
    const [contentReq, setcontentReq] = useState(false)

    /* simple modal call */
    useEffect(() => {
        console.log(`MODAL FLAG SET ${modalFlag}`)
        if(modalFlag === true){
            ShowModal()
            setmodalFlag(false)
            if (currentmodal.current === 0) {
                setTrigger('delete', false)
            } else {
                setTrigger('content', false)
            }
        }else{
            setcontentReq(false)
        }
    }, [modalFlag])
    /* simple qr call */
    useEffect(() => {
        console.log(`QR FLAG SET ${qrFlag}`)
        if(qrFlag === true){
            ShowQR()
            setqrFlag(false)
            setTrigger('content', false)
        }else{
            console.log(`SETTING CONTENTREQ`)
            setcontentReq(false)
        }
    }, [qrFlag])

    /* updates modal, sets appropriate modal show flag to 'true' after setting content */
    useEffect(() => {
        console.log(`CONTENTREQ SET ${contentReq}, CURRENTMODAL ${currentmodal.current}`)
        if (contentReq === true) {
            try {
                switch(currentmodal.current){
                    case 0:
                        setmodal(`ERROR!`, DELETION_ERROR_MSG)
                        setmodalFlag(true)
                        break
                    case 1:
                        //setmodal(`ERROR!`, VIEW_ERROR_MSG)
                        const url = getTabStringify(tabsList)
                        if(url !== -1) {
                            seturl(`${BASE_URL}${url}`)
                            setqrFlag(true)
                        } else {
                            setmodal(`ERROR!`, INPUT_ERROR_MSG)
                            setmodalFlag(true)
                        }
                        break
                }
            } catch(e) {
                console.log(`Cannot set modal in DTABS: ${e}`)
            }
        } else if (contentReq === false) {
            console.log("Content req false")
            setTrigger('content', false)
        }
    }, [contentReq])

    /* helper for tab indexing */
    const returnCurrentTabsHelper = (tabsIn = {}) => {
        console.log(tabsIn)
        /* temporary list for adding to tabs collection */
        let temptabs = returnCurrentTabs(tabsList, tabsIn)
        /* finalize tab additions, store names for ease of access */
        console.log(temptabs)
        setTabs({...temptabs})
        setunselectedNames(Array.from(Object.keys(temptabs)))
    }

    /* reacts to button click reloads */
    if(addFlag === true && deleteFlag === false) {
        try {
            /* listening for additions */
            if (addTrigger === true) {
                console.log('ADD TRIGGER TRUE')
                setaddFlag(false)
            }
            /* reloads in case of removal */
            else if (deleteTrigger === true) {
                console.log(`DELETE TRIGGER TRUE, NUMTABS ${numtabs}, CONTENTREQ ${contentReq}`)
                if(numtabs > 1){
                    console.log('SETTING DELETEFLAG')
                    setdeleteFlag(true)
                }else{
                    if (contentReq === false) {
                        console.log('SETTING CONTENTREQ')
                        currentmodal.current = 0
                        setcontentReq(true)
                    }
                }
            }
            /* sets QR code url and calls parent to reload */
            else if (contentTrigger === true && contentReq === false) {
                currentmodal.current = 1
                console.log(`VIZ CLICKED`)
                console.log(`CONTENTREQ IS CURRENTLY ${contentReq}`)
                setcontentReq(true)
            }
        } catch(error) {
            console.log(error)
        }
    }

    /* handles addition of element when add button is clicked */
    useEffect(() =>
    {
        console.log(`ADDFLAG USEEFFECT: ADDFLAG IS ${addFlag} & ADDTRIGGER IS ${addTrigger}`)
        if (addFlag === false && deleteFlag === false) {
            try
            {
                /* get selected element type */
                let selection = document.getElementById("selector");
                /* check if it is possible to add more */
                /* if so, add a tab of the chosen type to the queue */
                if (numtabs < limit) {
                    console.log(`${numtabs} numtabs, addition possible`)
                    const option = selection.options[selection.selectedIndex].text
                    console.log(`Pending type is ${option}`)
                    pendingType.current = GraphComponents[option]["alias"]
                    setPending(true)
                } else {
                    setaddFlag(true)
                }
            } catch (error) {
                console.error(error)
                return
            }
        }
    }, [addFlag])

    /* signals for queued tab to be added */
    useEffect(() => 
    {
        console.log("PENDING USEEFFECT")
        if (pending === true) {
            try{
                console.log(`pending set to ${pendingType.current}`)
                /* temporary list for adding to tabs collection */
                let templist = {...tabsList}
                console.log(templist)
                templist[pendingType.current].add(numtabs, setTrigger)
                console.log(templist)
                numtabs += 1 // only increments once addition successful
                /* formalize tabs collection additions, indicate queue empty */
                settabsList({...templist})
            }catch(error)
            {
                console.log(error)
            }
        } else {
            if (deleteFlag === true) {
                console.log("PENDING FALSE: DELETEFLAG SET")
                setdeleteFlag(false)
                setTrigger('delete', false)
            } else if (addFlag === false) {
                /* indicate we can listen for a new addition */
                console.log("PENDING FALSE: ADDFLAG SET")
                setaddFlag(true)
                setTrigger('add', false)
            }
        }
    }, [pending])

    /*  */

    /* formats tabs for easier display */
    useEffect(() =>
    {
        console.log("TABSLIST USEEFFECT")
        console.log(tabs)
        /* finalize tab additions, store names for ease of access */
        returnCurrentTabsHelper(tabs)
    }, [tabsList])

    /* handles change in selected tab */
    const getSelected = (name) =>
    {   
        /* i dont need to explain this a third time */
        let temptabs = {...tabs}
        let selection = temptabs[name]
        console.log(`New Selection: ${selection.name}`)
        /* delete selection from list of unselected tabs */
        delete temptabs[name]
        /* deselect current selection */
        selected.deselect()
        /* if no deletion requested, push it to list of tabs */
        /* otherwise, get its parent and call for deletion */
        if(deleteFlag === false){   
            temptabs[selected.name] = selected
        }else{
            const selectedparent = selected.parent
            selectedparent.removeTab(selected.index)
        }
        selection.select()
        /* set new selection */
        setSelected(selection)
        setunselectedNames(Array.from(Object.keys(temptabs)))
        setdeleteFlag(false)
        setTabs({...temptabs})
        setTrigger('delete', false)
    }

    /* nothing is pending once tabs are set */
    useEffect(() => {
        if (deleteFlag === true) {
            console.log('TABS USEEFFECT: FINISHING DELETION')
            numtabs -= 1
            const tabArray = Array.from(Object.keys(tabs))
            console.log(tabArray)
            if (tabArray[0] == selected) {
                getSelected(tabArray[1])
            } else {
                getSelected(tabArray[0])
            }
        }
        setPending(false)
    }, [tabs])

    /* reloads for new input field */
    useEffect(() => {
        setCard(selected.display(userframe))
    }, [selected])

    /* displays the input field */
    const getCard = () => {
        return card
    }

    /* deals with deletion */
    useEffect(() => {
        console.log(`DELETEFLAG USEEFFECT: CURRENT VALUE ${deleteFlag}`)
        if (deleteFlag === true) {
            returnCurrentTabsHelper()
        }
    }, [deleteFlag])
    
    return(
        <div class="container my-3">
            <CustomDiv idIn="numTabs" inputData={numtabs}/>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#"><div class="mobile-body">{selected.name}</div></a>
                </li>
                {
                    <>
                        {unselectedNames.map((tab) => (
                            <li class="page-item"><a class="page-link" href="#" onClick={() => {getSelected(tab)}}><div class="mobile-body">{tab}</div></a></li>
                        ))}
                    </>
                }
            </ul>
            {getCard(userframe)}
        </div>
    )
}