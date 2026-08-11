import { InputHelpMessageContainer } from './InputHelpMessageContainer'
import { InputDefMessageContainer } from './InputDefMessageContainer'

export const HelpMessage = () => {
    return (
    <>
      <div class="modal-body">
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
            <div className="justify-content-start">
              <p>
                Realmath is a tool allowing you to visualize up to 5 graphical components in Augmented Reality (AR)! 
                It utilizes the <a class="link-opacity-100" href="https://mathlive.io/mathfield/">MathLive</a> library for its input fields, adjusted for the needs of the program. 
                These input fields can take either LaTeX input or LaTeX shorthand (provided by the on-screen virtual math keyboard). LaTeX input which is copy-pasted into the input field will
                automatically become shorthand matching the virtual keyboard symbols.
              </p> <p>
                There are forbidden symbols, such as '=', which will cause the input field to break. 
                If any such symbols are found in your input, you will receive a popup notifying you, and your visualization will fail.
              </p> <p>
                To view specific information about each info type, navigate using the tabs included in this modal!
              </p>
            </div>
          </div>
          <div class="tab-pane fade" id="pills-func" role="tabpanel" aria-labelledby="pills-func-tab" tabindex="1">
            <InputHelpMessageContainer type={0} />
          </div>
          <div class="tab-pane fade" id="pills-pt" role="tabpanel" aria-labelledby="pills-pt-tab" tabindex="2">
            <InputHelpMessageContainer type={1} />
          </div>
          <div class="tab-pane fade" id="pills-vec" role="tabpanel" aria-labelledby="pills-vec-tab" tabindex="3">
            <InputHelpMessageContainer type={2} />
          </div>
          <div class="tab-pane fade" id="pills-vfld" role="tabpanel" aria-labelledby="pills-vfld-tab" tabindex="4">
            <InputHelpMessageContainer type={3} />
          </div>
          <div class="tab-pane fade" id="pills-srcv" role="tabpanel" aria-labelledby="pills-srcv-tab" tabindex="5">
            <InputHelpMessageContainer type={4} />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
              FAQ
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-func-tab" data-bs-toggle="pill" data-bs-target="#pills-func" type="button" role="tab" aria-controls="pills-func" aria-selected="false">
              Function (xyz)
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-pt-tab" data-bs-toggle="pill" data-bs-target="#pills-pt" type="button" role="tab" aria-controls="pills-pt" aria-selected="false">
              Point (xyz)
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-vec-tab" data-bs-toggle="pill" data-bs-target="#pills-vec" type="button" role="tab" aria-controls="pills-vec" aria-selected="false">
              Vector
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-vfld-tab" data-bs-toggle="pill" data-bs-target="#pills-vfld" type="button" role="tab" aria-controls="pills-vfld" aria-selected="false">
              Vector Field
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-scrv-tab" data-bs-toggle="pill" data-bs-target="#pills-scrv" type="button" role="tab" aria-controls="pills-scrv" aria-selected="false">
              Space Curve
            </button>
          </li>
        </ul>
      </div>
    </>
    )
}

export const Definitions = ({component}) => {
    console.log('entered Definitions export')
    console.log(component)
    try{
      return (
        <InputDefMessageContainer type={Number(component)} />
      )
    } catch (e) {
        console.error(e)
        return (
            <div>Component {component} not found!</div>
        )        
    }
}
