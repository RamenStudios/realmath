import { MathField, ReadOnlyMathField } from './MathField'

const ColHelper = (row, blank) => {
    const GetContent = (col) => {
        if (col.isLabel === true) {
            return (
                <>{col.props}</>
            )
        } else {
            if (blank === true) {
                return (
                    ReadOnlyMathField(col.props)
                )
            } else {
                return (
                    MathField({...col.props})
                )
            }
        }
    }

    return (
        <div className="row">
            {row.map((col) => (
                <div className={col.className}>
                    {GetContent(col)}
                </div>
            ))}
        </div>
    )
}

export const InputLayout = (props) => {
    const blank = props.blank
    return (
        <>
            {props.rows.map((row) => (ColHelper(row, blank)))}
        </>
    )
}