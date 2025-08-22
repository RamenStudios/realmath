import { useRef, useState, useEffect } from 'react';
import { GraphComponents } from "../../common/utilities/graphComponents";
import { Tab, TabTracker, getTabStringify } from "./tabclasses";
import { CustomDiv } from '../../common/utilities/customPropDiv';
import { ShowModal, ShowQR } from '../../common/services/ModalService';
import { GetFormData } from '../../common/services/FormService';
import $ from 'jquery';

/* useful constants */
const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'
const DELETION_ERROR_MSG = `You cannot delete all components-- empty graphs are considered invalid. Try adding another first!`
const VIEW_ERROR_MSG = `You should not be able to see this message! If you can, please report it as a bug.`

/* limit elements to avoid crashes */
const limit = 3
/* ensures limit not reached */
var numtabs = 1
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
export const Tabs = ({setmodal, seturl}) =>
{

    /* hooks tracking graph element additions */
    const [tabsList, settabsList] = useState({
                                                Func: FuncTracker,
                                                Pt: PtTracker,
                                                Vec: VecTracker,
                                                VFld: VFldTracker,
                                                SCrv: SCrvTracker
                                            });
    const [pending, setPending] = useState(false);
    const pendingType = useRef()
    /* hook for displaying selected tab */
    const [selected, setSelected] = useState(tabsList.Func.current[1]);
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
        }else{
            setcontentReq(false)
        }
    }, [modalFlag])
    useEffect(() => {
        console.log(`QR FLAG SET ${qrFlag}`)
        if(qrFlag === true){
            ShowQR()
            setqrFlag(false)
        }else{
            console.log(`SETTING CONTENTREQ`)
            setcontentReq(false)
        }
    }, [qrFlag])

    /* updates modal, sets appropriate modal show flag to 'true' after setting content */
    useEffect(() =>
    {
        console.log(`CONTENTREQ SET ${contentReq}, CURRENTMODAL ${currentmodal.current}`)
        if(contentReq === true){
            try{
                switch(currentmodal.current){
                    case 0:
                        setmodal(`ERROR!`, DELETION_ERROR_MSG)
                        setmodalFlag(true)
                        break;
                    case 1:
                        //setmodal(`ERROR!`, VIEW_ERROR_MSG)
                        seturl(`${BASE_URL}${getTabStringify(tabsList)}`)
                        setqrFlag(true)
                        break;
                }
            }catch(e){
                console.log(`Cannot set modal in DTABS: ${e}`)
            }
        }
    }, [contentReq])

    /* helper for tab indexing */
    const returnCurrentTabsHelper = (tabsIn = {}) =>
    {
        console.log(tabsIn)
        /* temporary list for adding to tabs collection */
        let temptabs = returnCurrentTabs(tabsList, tabsIn)
        /* finalize tab additions, store names for ease of access */
        console.log(temptabs)
        setTabs({...temptabs})
        setunselectedNames(Array.from(Object.keys(temptabs)))
        /* indicate we can listen for a new addition */
        setaddFlag(true)
    }

    /* listener for relevant buttons */
    document.addEventListener('click', (() => 
    {
        if(addFlag === true && deleteFlag === false)
        {
            try{
                /* listening for additions */
                if($('#selectorAdd').is(":focus"))
                {
                    $(':focus').trigger( "blur" )
                    console.log("Clicked!")
                    setaddFlag(false)
                }
                /* reloads in case of removal */
                else if($('#deleteComponent').is(":focus"))
                {
                    $(':focus').trigger( "blur" )
                    if(numtabs > 1){
                        setdeleteFlag(true)
                    }else{
                        currentmodal.current = 0
                        setcontentReq(true)
                    }
                }
                /* sets QR code url and calls parent to reload */
                else if($('#visualizeButton').is(":focus"))
                {
                    $(':focus').trigger( "blur" )
                    currentmodal.current = 1
                    console.log(`VIZ CLICKED`)
                    console.log(`CONTENTREQ IS CURRENTLY ${contentReq}`)
                    setcontentReq(true)
                }
            }catch(error){
                console.log(error)
            }
        }
    }))

    /* handles addition of element when add button is clicked */
    useEffect(() =>
    {
        if(addFlag === false && deleteFlag === false)
        {
            try
            {
                /* get selected element type */
                let selection = document.getElementById("selector");
                /* check if it is possible to add more */
                /* if so, add a tab of the chosen type to the queue */
                if(numtabs < limit)
                {
                    console.log(`${numtabs} numtabs, addition possible`)
                    const option = selection.options[selection.selectedIndex].text
                    console.log(`Pending type is ${option}`)
                    pendingType.current = GraphComponents[option]["alias"]
                    setPending(true);
                }
            }
            catch(error)
            {
                console.error(error)
                return
            };
        }
    }, [addFlag])

    /* begins process of deleting element when deleteflag set and is true */
    useEffect(() =>
    {

    }, [deleteFlag])

    /* signals for queued tab to be added */
    useEffect(() => 
    {
        if(pending)
        {
            try{
                console.log(`pending set to ${pendingType.current}`)
                /* temporary list for adding to tabs collection */
                let templist = {...tabsList}
                console.log(templist)
                templist[pendingType.current].add(numtabs)
                console.log(templist)
                numtabs += 1 // only increments once addition successful
                /* formalize tabs collection additions, indicate queue empty */
                settabsList({...templist})
            }catch(error)
            {
                console.log(error)
            }
        }
    }, [pending])

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
        setTabs({...temptabs})
    }

    /* nothing is pending once tabs are set */
    useEffect(() => 
    {
        setPending(false)
        setdeleteFlag(false)
    }, [tabs])

    /* reloads for new input field */
    useEffect(() =>
    {
        setCard(selected.display())
    }, [selected])

    /* displays the input field */
    const getCard = () =>
    {
        console.log(selected)
        console.log(selected.display())
        return card
    }

    /* deals with deletion */
    useEffect(() =>
    {
        if(deleteFlag === true)
        {
            returnCurrentTabsHelper()
            numtabs -= 1
            getSelected(Array.from(Object.keys(tabs))[0])
        }
    }, [deleteFlag])

    return(
        <div class="container my-3">
            <CustomDiv idIn="numTabs" inputData={numtabs}/>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">{selected.name}</a>
                </li>
                {
                    <>
                        {unselectedNames.map((tab) => (
                            <li class="page-item"><a class="page-link" href="#" onClick={() => {getSelected(tab)}}>{tab}</a></li>
                        ))}
                    </>
                }
            </ul>
            {getCard()}
        </div>
    )
}