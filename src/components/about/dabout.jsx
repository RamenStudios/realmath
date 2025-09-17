export const About = ({userframe}) =>
{
    if (userframe === 'desktop') {
        return(
        <div class="mb-3 justify-content-center">
            <div class="row">
                <div class="title">Visualize complex math formulas with RealMath™!</div>
            </div>
            <div class="row">
                    <div>
                        Add/define graph components below, then VISUALIZE to watch LaTeX equations come to life in AR on your mobile device. 
                        Boost your understanding and bring abstract math into the real world in seconds!
                    </div>
            </div>
        </div>
        )
    } else {
        return(
        <div class="mb-3 justify-content-center">
            <div class="row">
                <div class="mobile-title">Visualize complex math formulas with RealMath™!</div>
            </div>
            <div class="row">
                    <div class="mobile-body">
                        Add/define graph components below, then VISUALIZE to watch LaTeX equations come to life in AR on your mobile device. 
                        Boost your understanding and bring abstract math into the real world in seconds!
                    </div>
            </div>
        </div>
        )
    }
}