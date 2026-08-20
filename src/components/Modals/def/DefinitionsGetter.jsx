import { LatexDisplay } from "../../Modular/Math/LatexDisplay"

/* ****************************************
    DEFINITIONS
        * SINCE THEY ARE PRETTY SIMPLE,
          NO NEED TO PUT IN SEPARATE FILES
* *****************************************/
const FunctionDef = () => {
    return (
        <div>
            <div>
                A function is a set of inputs, a set of outputs, and a rule for mapping each input to exactly one output.
            </div> <div>
                In a 3 dimensional space, we commonly consider the function <LatexDisplay str={'F(a, b)=c'}/>. The described function <LatexDisplay str={'F'}/> maps every input,
                given as an ordered pair <LatexDisplay str={'(a, b)'}/>, to some output coordinate <LatexDisplay str={'c'}/>. While we tend to default to <LatexDisplay str={'F(x, y)=z'}/>,
                combinations such as <LatexDisplay str={'G(y, z)=x'}/> are just as valid. Both can be mapped to a final resulting set of coordinates <LatexDisplay str={'(x, y, z)'}/>.
            </div>
        </div>
    )
}

const PointDef = () => {
    return (
        <div>
            In the 3-D coordinate system denoted by <LatexDisplay str={'\\mathbb{R}^3'}/>, a point is a set of coordinates <LatexDisplay str={'(x, y, z)'}/> representing the location at those coordinates.
        </div>
    )
}

const SpaceCurveDef = () => {
    return (
        <div>
            A Space Curve is a vector-valued function which is a function whose output is a vector in 3 dimensional space, <LatexDisplay str={'\\mathbb{R}^3'} disp={false}/>. Generally, they will have the form
            <LatexDisplay str={'\\begin{align*}\\vec{r}(t)&=\\vec{f}(t),\\vec{g}(t),\\vec{h}(t)\\\\&=f(t)\\hat{i}+g(t)\\hat{j}+h(t)\\hat{k}\\end{align*}'} disp={true}/>
        </div>
    )
}

const VectorDef = () => {
    return (
        <div>
            A 3-D vector <LatexDisplay str={'\\vec{v} = \\left\\langle {x,y,z} \\right\\rangle'}/> is an object with direction and magnitude <LatexDisplay str={'\\left\\| {\\overline{v}} \\right\\|'}/>. 
            There is one exception to this definition, the zero vector, <LatexDisplay str={'\\vec{0}'}/>, which has magnitude <LatexDisplay str={'0'}/>, has no specified direction.
        </div>
    )
}

const VectorFieldDef = () => {
    return (
        <div>
            A vector field on <LatexDisplay str={'\\mathbb{R}^2'}/> is a function <LatexDisplay str={'\\vec{F}'}/> 
            which assigns to each point <LatexDisplay str={'(x,y)'}/> in its domain a 2-D vector <LatexDisplay str={'\\vec{F}(x,y)'}/>. 
            We often write <LatexDisplay str={'\\vec{F}'}/> in terms of its component functions:
            <LatexDisplay disp={true} str={'\\begin{align*}\\vec{F}(x,y)&=\\vec{P}(x,y),\\vec{Q}(x,y)=P(x,y)\\hat{i}+Q(x,y)\\hat{j}\\\\&=\\vec{P},\\vec{Q}=P\\hat{i}+Q\\hat{j}\\end{align*}'}/>
            There are vector fields on <LatexDisplay str={'\\mathbb{R}^3'}/> as well: 
            <LatexDisplay str={' \\vec{F}(x,y,z) = P(x,y,z)\\vec{i} + Q(x,y,z)\\vec{j} + R(x,y,z)\\vec{k}'}/>
        </div>
    )
}

/* ****************************************
    RETURNS DESIRED DEFINITION
* *****************************************/
export const DefinitionsGetter = ({type}) => {
    switch (type) {
        case 0:
            return (
                FunctionDef()
            )
            break
        case 1:
            return (
                PointDef()
            )
            break
        case 2:
            return (
                VectorDef()
            )
            break
        case 3:
            return (
                VectorFieldDef()
            )
            break
        case 4:
            return (
                SpaceCurveDef()
            )
            break
        default:
            return (
                <div>something has gone awry...</div>
            )
    }
}