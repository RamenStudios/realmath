import { LatexDisplay } from "../../../LatexDisplay"

export const VectorFieldDef = () => {
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