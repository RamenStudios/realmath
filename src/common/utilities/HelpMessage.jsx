export const HelpMessage = () => {
    return (
        <div class="justify-content-start">
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