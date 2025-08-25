import { convertLatexToMarkup } from "mathlive"

const FunctionDef = () => {
    return(
        <>A basic function F(x,y) evaluated on the x, y, z coordinate plane.</>
    )
}
const PointDef = () => {
    return(
        <>A point at a fixed set of coordinates (x, y, z) on the x, y, z coordinate plane.</>
    )
}
const VectorDef = () => {
    return convertLatexToMarkup('A \\underline{vector} is an object with \\underline{direction} and \\underline{magnitude}. There is one exception to this definition, the \\underline{zero vector}, $\\vec{0}$, which has magnitude $0$ has no specified direction.')
}
const VectorFieldDef = () => {
    return convertLatexToMarkup('A \\underline{vector field} on $\\mathbb{R}^2$ is a function $\\vec{F}$ which assigns to each point $(x,y)$ in its domain a 2-D vector $\\vec{F}(x,y)$. We often write $\\vec{F}$ in terms of its \\underline{component functions}:\\begin{align*}\\vec{F}(x,y) &=\\vect{P(x,y),Q(x,y)}=P(x,y)\\hat{i}+Q(x,y)\\hat{j}\\&=\\vect{P,Q}=P\\hat{i}+Q\\hat{j}\\end{align*}\\end{defn}There are vector fields on $\\mathbb{R}^3$ as well:\\[\\vec{F}(x,y,z)=\\vect{P,Q,R}=P\\hat{i}+Q\\hat{j}+R\\hat{k}\\]')
}
const SpaceCurveDef = () => {
    return convertLatexToMarkup('A Space Curve is a vector-valued function which is a function whose output is a vector in 3 dimensional space, \\mathbb{R}^3. Generally, they will have the form \\begin{align*}\\vec{r}(t)&=\\vect{f(t),g(t),h(t)}\\&=f(t)\\hat{i}+g(t)\\hat{j}+h(t)\\hat{k}\\end{align*}')
}

export const GraphComponents = 
{
    "Function (xyz)":
    {
        "value":1, 
        "def":FunctionDef,
        "alias": "Func"
    },
    "Point (xyz)":
    {
        "value":2, 
        "def":PointDef,
        "alias": "Pt"
    },
    "Vector <a,b,c>":
    {
        "value":3, 
        "def": VectorDef,
        "alias": "Vec"
    },
    "Vector Field":
    {
        "value":4, 
        "def":VectorFieldDef,
        "alias": "VFld"
    },
    "Space Curve r(t)":
    {
        "value":5, 
        "def":SpaceCurveDef,
        "alias": "SCrv"
    },
}

export const GraphKeys = ["Function (xyz)", "Point (xyz)", "Vector <a,b,c>", "Vector Field", "Space Curve r(t)"]