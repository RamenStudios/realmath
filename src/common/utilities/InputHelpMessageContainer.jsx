import { FunctionHelp } from './inputTypes/helpMessages/FunctionHelp'
import { PointHelp } from './inputTypes/helpMessages/PointHelp'
import { VectorHelp } from './inputTypes/helpMessages/VectorHelp'
import { SpaceCurveHelp } from './inputTypes/helpMessages/SpaceCurveHelp'
import { VectorFieldHelp } from './inputTypes/helpMessages/VectorFieldHelp'

export const InputHelpMessageContainer = ({type}) => {
    switch (type) {
        case 0:
            return (
                <FunctionHelp />
            )
            break
        case 1:
            return (
                <PointHelp />
            )
            break
        case 2:
            return (
                <VectorHelp />
            )
            break
        case 3:
            return (
                <VectorFieldHelp />
            )
            break
        case 4:
            return (
                <SpaceCurveHelp />
            )
            break
        default:
            return (
                <div>something has gone awry...</div>
            )
    }
}