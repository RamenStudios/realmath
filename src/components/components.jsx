import { Mobile} from "./mobile"
import { Desktop } from "./desktop"

export const Components = (desktop) =>
{
    if(desktop)
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