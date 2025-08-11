import { useRef, useState, useEffect } from 'react';
import { GraphComponents } from "../../common/utilities/graphComponents";
import { Tab, TabTracker, getTabStringify } from "./tabclasses";
import { CustomDiv } from '../../common/utilities/customPropDiv';
import $ from 'jquery';

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
export const Tabs = () =>
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

    /* handles addition of element when add button is clicked */
    const addTab = () =>
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
    /* listener to run above */
    document.addEventListener('click', (() => 
    {
        if(addFlag === true && deleteFlag === false)
        {
            try{
                /* listening for additions */
                if($('#selectorAdd').is(":hover"))
                {
                    console.log("Clicked!")
                    setaddFlag(false)
                    addTab()
                }
                /* reloads in case of removal */
                else if($('#deleteComponent').is(":hover"))
                {
                    if(numtabs > 1)
                    {
                        setdeleteFlag(true)
                    }
                }
            }catch(error){
                console.log(error)
            }
        }
    }))

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
        /* if it exists, put old selection in that list and deselect it */
        if(deleteFlag === false)
        {   
            selected.deselect()
            temptabs[selected.name] = selected
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
            try {
                document.getElementById('inputData').setAttribute('value', '{}')
            } catch (error) {
                console.log(error)
            }
            returnCurrentTabsHelper()
            numtabs -= 1
            getSelected(Array.from(Object.keys(tabs))[0])
            setdeleteFlag(false)
        }
    }, [deleteFlag])

    return(
        <div class="container my-3">
            <CustomDiv idIn="inputData"/> 
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