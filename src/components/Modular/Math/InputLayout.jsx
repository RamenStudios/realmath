import { MathField, ReadOnlyMathField } from './MathField'

/* gets the column display based on props */
const ColGetter = (row, blank) => {
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
                <div className={`${col.className}`}>
                    {GetContent(col)}
                </div>
            ))}
        </div>
    )
}

/* the actual main layout export */
export const InputLayout = (rows, blank) => {
    return (
        <>
            {rows.map((row) => (ColGetter(row, blank)))}
        </>
    )
}