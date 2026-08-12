import "https://esm.run/@cortex-js/compute-engine";
import { DGridButton } from './Modular/Buttons/DGridButton'

const ButtonTextClass = "light-grey italic bold"

export const BottomButtons = ({userframe, parentDispatch, showURL}) =>
{
    /* call content trigger */
    const clickTrigger = () => {
        showURL()
    }

    // sets new content and calls reload when button clicked
    const getHelp = () =>
    {
        parentDispatch({
            type: 'MOD',
            label: 'HELP',
            content: null,
            vis: true,
        })
    }

    // reloads page
    const reload = () => {
        window.location.reload()
    }

    const TheseButtons = (container, className, color, id, callback, label) => {
        return  {
                    container: container,
                    className: className,
                    color: color,
                    id: id,
                    callback: callback,
                    label: label,
                }
    }

    const ButtonProps = [
                            TheseButtons("col-lg-5 col-12 mb-2", ButtonTextClass, "primary", "visualizeButton", clickTrigger, "VISUALIZE IT!"),
                            TheseButtons("col-lg-2 col-6 mb-2", ButtonTextClass, "secondary", "helpButton", getHelp, "HELP"),
                            TheseButtons("col-lg-2 col-6 mb-2", ButtonTextClass, "secondary", "resetButton", reload, "RESET"),
                            TheseButtons("col-lg-3 col-12 mb-2", null, "secondary", "reportButton", clickTrigger, (()=>{return(<a className="light-grey italic bold" href="mailto:arodri37@nd.edu">REPORT BUG</a>)})),
                        ]

    return (
        <div className="container-fluid">
            <div className="row">
                {ButtonProps.map((props) => (DGridButton({...props})))}
            </div>
        </div>
    )
    
}