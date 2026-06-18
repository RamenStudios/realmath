import { LatexDisplay } from "../../../LatexDisplay"

export const FunctionDef = () => {
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