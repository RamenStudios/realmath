import { LatexDisplay } from "../../../LatexDisplay"

export const SpaceCurveDef = () => {
    return (
        <div>
            A Space Curve is a vector-valued function which is a function whose output is a vector in 3 dimensional space, <LatexDisplay str={'\\mathbb{R}^3'} disp={false}/>. Generally, they will have the form
            <LatexDisplay str={'\\begin{align*}\\vec{r}(t)&=\\vec{f}(t),\\vec{g}(t),\\vec{h}(t)\\\\&=f(t)\\hat{i}+g(t)\\hat{j}+h(t)\\hat{k}\\end{align*}'} disp={true}/>
        </div>
    )
}