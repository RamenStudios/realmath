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
    }
    
    add (type, numTabs) {
		try {
			this.Trackers[type].add(numTabs)
			this.Next = this.Trackers[type].get_latest()
			this.Unselected[this.Trackers[type].get_latest().name] = this.Trackers[type].get_latest()
			return (numTabs + 1)
		} catch (e) {
			console.error(`Error in TabsList.add(): ${e}`)
			return -1
		}
    }
    
    del (loc) {
		try {
			return this.get_selected(loc, null, true)
		} catch (e) {
			console.error(`Error in TabUIContainer.del(): ${e}`)
			return -1
		}
    }

	get_at (loc) {
		return this.Trackers[loc[0]].get_at(loc[1])
	}
    
    get_selected (loc, newloc, del = false) {
		try {
			/* get tab objects */
			const prev = this.get_at(loc)
			const curr = del === true ? this.Next : this.get_at(newloc)
			/* delete new selection from set of unselected tabs */
			delete this.Unselected[curr.name]
			/* point to a new 'Next' tab if necessary */
			const unselectedNames = Object.keys(this.Unselected)
			if (curr === this.Next) {
				this.Next = unselectedNames.length > 1 ? this.Unselected[unselectedNames[1]] : null
			}
			/* deselect currently selected tab */
			prev.deselect()
			/* if no deletion requested, push it to list of unselected tabs */
			/* otherwise, get its parent and call for deletion */
			if (del === false) {   
				this.Unselected[prev.name] = prev
			} else {
				prev.parent.del(prev.index)
			}
			/* apply appropriate flag to new selection */
			curr.select()
			/* set new selection */
			return curr
		} catch (e) {
			console.error(`Error in TabUIContainer.get_selected(): ${e}`)
			return -1
		}
    }

    get_unselected () {
		const returnList = []
        try {
			for (const [key, value] of Object.entries(this.Unselected)) {
				returnList.push([key, value.get_loc()])
			}
        } catch (e) {
            console.error(`Error in TabUIContainer.get_unselected(): ${e}`)
        }
		return returnList
    }
	
	stringify_tabs () {
		console.log('running stringify')
		const tempDict = {}
		try {
			for (const [key, value] of Object.entries(this.Trackers)) {
				console.log(key)
				const stringval = value.stringify()
				if (stringval === -1) {
					throw new Error(`invalid tab input, terminating stringify`)
				} else if (stringval !== 0) {
					console.log(JSON.stringify(stringval))
					tempDict[`${value.type}`] = (stringval)
				}
			}
		} catch (e) {
			console.error(`Error in TabUIContainer.stringify_tabs(): ${e}`)
			return -1
		}
		console.log(JSON.stringify(tempDict))
		return JSON.stringify(tempDict)
	}
}