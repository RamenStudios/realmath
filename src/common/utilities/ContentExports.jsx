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
          <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
            <p>
              Realmath's function input is styled as two input fields, one on each side of the '=' sign. Think of it as loosely being F(xy) = z. 
              This does <b>not</b> mean you need to have x and y on the left and z on the right-- in fact, you only <i>need</i> to include one variable, and it can be in whichever field you'd like. 
              However, it <b>does</b> mean that both input fields need to have some input in them, as Realmath cannot do implicit equations. 
              Additionally, variables must be written outright, not as 'function of' (so, z rather than F(x,y)). This is just a quirk of how equations are processed.
            </p> <p>
              <b><i>VALID INPUT EXAMPLE:</i></b>
              <div className="row">
                  <div className="col-lg-5" >
                      <math-span>{'\frac{2}{x}'}</math-span>
                  </div>
                  <div className="col">=</div>
                  <div className="col-lg-5" >
                      <math-span>1</math-span>
                  </div>
              </div>
            </p> <p>
              <b><i>INVALID INPUT EXAMPLE:</i></b>
              <div className="row">
                  <div className="col-lg-5" >
                      <math-span>F(z)</math-span>
                  </div>
                  <div className="col">=</div>
                  <div className="col-lg-5" >
                      <math-span>xy</math-span>
                  </div>
              </div>
            </p>
          </div>
          <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
            <p>
              Realmath's point input is styled as 3 input fields, representing the x, y, and z coordinates of a point in 3D space. 
              Each input field <b>only accepts constants</b> or expressions that can be simplified to a constant. This means 'sqrt{'{2}'}' is valid, but '2x' is not.
            </p> <p>
              <b><i>VALID INPUT EXAMPLES:</i></b>
                <div className="row">
                  <div className="col">x</div>
                  <div className="col-lg-2" >
                      <math-span>1</math-span>
                  </div>
                  <div className="col">y</div>
                  <div className="col-lg-2" >
                      <math-span>1</math-span>
                  </div>
                  <div className="col">z</div>
                  <div className="col-lg-2" >
                      <math-span>1</math-span>
                  </div>
              </div>
            </p>
          </div>
        </div>
      </div>
          <div class="modal-footer">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                  Home
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                  Function (xyz)
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                  Point (xyz)
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
