import { LatexDisplay } from "../../../LatexDisplay"

export const VectorDef = () => {
    return (
        <div>
            A 3-D vector <LatexDisplay str={'\\vec{v} = \\left\\langle {x,y,z} \\right\\rangle'}/> is an object with direction and magnitude <LatexDisplay str={'\\left\\| {\\overline{v}} \\right\\|'}/>. 
            There is one exception to this definition, the zero vector, <LatexDisplay str={'\\vec{0}'}/>, which has magnitude <LatexDisplay str={'0'}/>, has no specified direction.
        </div>
    )
}