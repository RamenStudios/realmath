import { useRef, useState, useEffect } from 'react';
import { GraphComponents } from "../../common/graphComponents";
import { Tab, TabTracker } from "./tabclasses";
import $ from 'jquery';

/* limit elements to avoid crashes */
const limit = 5
/* ensures limit not reached */
var numtabs = 1
/* making trackers const */
const FuncTracker = new TabTracker('Func', true)
const PtTracker = new TabTracker('Pt')
const VecTracker = new TabTracker('Vec')
const VFldTracker = new TabTracker('VFld')
const SCrvTracker = new TabTracker('SCrv')

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
    const tabs = useRef({});
    /* hook to store just the names */
    const [unselectedNames, setunselectedNames] = useState([])
    /* avoids infinite loops */
    const addFlag = useRef(true)

    /* handles addition of element when add button is clicked */
    const addTab = () =>
    {
        try
        {
            /* get selected element type */
            let selection = document.getElementById("selector");
            if(numtabs < limit)
            {
                console.log(`${numtabs} numtabs`)
                const option = selection.options[selection.selectedIndex].text
                console.log(option)
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
        if(addFlag.current === true)
        {
            try{
                const hovered = $('#selectorAdd').is(":hover")
                if(hovered)
                {
                    console.log("Clicked!")
                    addFlag.current = false
                    addTab()
                }
            }catch(error){
                console.log(error)
            }
        }
    }))

    /* signals for pending tab to be added */
    useEffect(() => 
    {
        if(pending)
        {
            try{
                console.log(`pending set to ${pendingType.current}`)
                    let templist = {...tabsList}
                    console.log(templist)
                    templist[pendingType.current].add(numtabs)
                    console.log(templist)
                    numtabs += 1 // only increments once addition successful
                    settabsList({...templist})
                    setPending(false)
            }catch(error)
            {
                console.log(error)
            }
        }
    }, [pending])

    /* formats tabs for easier display */
    useEffect(() =>
    {
        let temptabs = {...tabs.current}
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
        tabs.current = {...temptabs}
        console.log("TABSLIST USEEFFECT")
        console.log(tabs.current)
        setunselectedNames(Array.from(Object.keys(tabs.current)))
        addFlag.current = true
    }, [tabsList])

    /* handles change in selected tab */
    const getSelected = (name) =>
    {   
        // yoink new selection from unselected tabs list
        let selection = tabs.current[name]
        delete tabs.current[name]
        console.log(selection)
        // put old selection in that list and deselect it
        selected.deselect()
        tabs.current[selected.name] = selected
        selection.select()
        // set new selection
        setSelected(selection)
        setunselectedNames(Array.from(Object.keys(tabs.current)))
    }

    return(
        <div class="container my-3">
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
            <selected.card/>
        </div>
    )
}