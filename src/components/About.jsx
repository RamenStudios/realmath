export const About = ({userframe}) =>
{
    if (userframe === 'desktop') {
        return(
        <div className="mb-3 justify-content-center">
            <div className="row">
                <div className="title">Visualize complex math formulas with RealMath™!</div>
            </div>
            <div className="row">
                    <div>
                        Add/define graph components below, then VISUALIZE to watch LaTeX equations come to life in AR on your mobile device. 
                        Boost your understanding and bring abstract math into the real world in seconds!
                    </div>
            </div>
        </div>
        )
    } else {
        return(
        <div className="mb-3 justify-content-center">
            <div className="row">
                <div className="mobile-title">Visualize complex math formulas with RealMath™!</div>
            </div>
            <div className="row">
                    <div className="mobile-body">
                        Add/define graph components below, then VISUALIZE to watch LaTeX equations come to life in AR on your mobile device. 
                        Boost your understanding and bring abstract math into the real world in seconds!
                    </div>
            </div>
        </div>
        )
    }
}