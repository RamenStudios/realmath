import { TabTracker } from "./tabclasses";

export class TabUIContainer {
    constructor (setDel) {
        this.Trackers = {
            Func: new TabTracker('Func', setDel, true),
            Pt: new TabTracker('Pt', setDel),
            Vec: new TabTracker('Vec', setDel),
            VFld: new TabTracker('VFld', setDel),
            SCrv: new TabTracker('SCrv', setDel),
        }
        this.Unselected = {}
        this.Next = null
		this.Limit = 3
    }
    
    add (type, numTabs) {
		if (numTabs < this.Limit) {
			try {
				this.Trackers[type].add(numTabs)
				this.Next = this.Trackers[type].get_latest()
                this.Unselected[this.Trackers[type].get_latest().name] = this.Trackers[type].get_latest()
				return (numTabs + 1)
			} catch (e) {
				console.error(`Error in TabsList.add(): ${e}`)
				return -1
			}
		} else {
			return -1
		}
    }
    
    del (selected, numTabs) {
		if (numTabs > 1) {
			try {
			   return this.get_selected(selected, this.Next, true)
			} catch (e) {
				console.error(`Error in TabUIContainer.del(): ${e}`)
				return -1
			}
		} else {
			return -1
		}
    }
    
    get_selected (selected, tab, del = false) {
		try {
			/* get tab by name only if needed */
			const selection = del === false ? this.Unselected[tab] : tab
			/* delete selection from set of unselected tabs */
			delete this.Unselected[selection.name]
			/* get the new unselected tab names */
			const unselectedNames = this.get_unselected()
			/* point to a new 'Next' tab if necessary */
			if (selection === this.Next) {
				this.Next = unselectedNames.length > 1 ? Unselected[unselectedNames[1]] : null
			}
			/* deselect currently selected tab */
			selected.deselect()
			/* if no deletion requested, push it to list of unselected tabs */
			/* otherwise, get its parent and call for deletion */
			if (del === false) {   
				this.Unselected[selected.name] = selected
			} else {
				selected.parent.del(selected.index)
			}
			/* apply appropriate flag to new selection */
			selection.select()
			/* set new selection */
			return selection
		} catch (e) {
			console.error(`Error in TabUIContainer.get_selected(): ${e}`)
			return -1
		}
    }

    get_unselected () {
		console.log(this.Unselected)
        try {
            const unselectedNames = Object.keys(this.Unselected)
            if (unselectedNames.length > 0) {
                return unselectedNames
            } else {
                return []
            }
        } catch (e) {
            console.error(`Error in TabUIContainer.get_unselected(): ${e}`)
            return []
        }
    }
	
	stringify_tabs () {
		const tempDict = {}
		try {
			for (const key in this.Trackers) {
				tempDict[`${this.Trackers[key].type}`] = this.Trackers[key].stringify()
			}
		} catch (e) {
			console.error(`Error in TabUIContainer.stringify_tabs(): ${e}`)
			return {}
		}
		return tempDict
	}
}