export const HelpMessage = () => {
    return (
        <div className="justify-content-start">
            <ul>
                <li>
                    The input fields are LaTeX input, and only LaTeX input is accepted. If you are having trouble with manual formatting, each input field allows you to open an on-screen math keyboard!
                </li>
                <li>
                    Realmath allows you to add up to 3 graphical components. This limit is in place due to URL length restrictions varying from browser-to-browser-- unfortunately, more than 3 components runs the risk of causing the visualizer to malfunction.
                </li>
                <li>
                    If your input is found to be in an incorrect/non-parsable format, Realmath will prompt you to rewrite it.
                </li>
                <li>
                    The reset button forces a reload of the page, removing all component history.
                </li>
                <li>
                    Once you are done preparing your components, click the 'VISUALIZE IT!' button. This will provide you with both a URL and link to our 8th Wall visualizer, so you can see your graph come to life! This visualizer only works on mobile devices with a camera and gyroscope (so, most phones!).
                </li>
            </ul>
        </div>
    )
}

export const Definitions = ({component}) => {
    console.log('entered Definitions export')
    console.log(component)
    try{
        switch (Number(component)) {
            case 0:
                return (
                    <div>A basic function f(u,v) evaluated on the x, y, z coordinate plane.</div>
                )
                break
            case 1:
                return (
                    <div>A set of coordinates (x,y,z)</div>
                )
                break
            case 2:
                return (
                    <div>
                        A vector is an object with direction and magnitude. 
                        There is one exception to this definition: the zero vector, {'<0,0,0>'}, which has magnitude 0, has no specified direction.
                    </div>
                )
                break
            case 3:
                return (
                    <div>A basic function f(u,v) evaluated on the x, y, z coordinate plane.</div>
                )
                break
            case 4:
                return (
                    <div>A basic function f(u,v) evaluated on the x, y, z coordinate plane.</div>
                )
                break
            default:
                return (
                    <div>Component {component} not found!</div>
                )
        }
    } catch (e) {
        console.error(e)
        return (
            <div>Component {component} not found!</div>
        )        
    }
}