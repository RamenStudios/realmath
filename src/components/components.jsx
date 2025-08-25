import { Mobile} from "./mobile"
import { Desktop } from "./desktop"

export const Components = ({loadtype}) =>
{
    if(loadtype === 'desktop')
    {
        return(
            <div>
                <Desktop/>
            </div>
        )
    }
    else
    {
        return(
            <div>
                <Mobile/>
            </div>
        )
    }
}