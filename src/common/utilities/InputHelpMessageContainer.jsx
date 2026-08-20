import { FunctionHelp } from './inputTypes/helpMessages/FunctionHelp'
import { PointHelp } from './inputTypes/helpMessages/PointHelp'
import { VectorHelp } from './inputTypes/helpMessages/VectorHelp'
import { SpaceCurveHelp } from './inputTypes/helpMessages/SpaceCurveHelp'
import { VectorFieldHelp } from './inputTypes/helpMessages/VectorFieldHelp'
import { Help } from './inputTypes/helpMessages/HelpTemplate'

export const InputHelpMessageContainer = ({type}) => {
    switch (type) {
        case 0:
            return (
                Help(FunctionHelp())
            )
            break
        case 1:
            return (
                Help(PointHelp())
            )
            break
        case 2:
            return (
                Help(VectorHelp())
            )
            break
        case 3:
            return (
                Help(VectorFieldHelp())
            )
            break
        case 4:
            return (
                Help(SpaceCurveHelp())
            )
            break
        default:
            return (
                <div>something has gone awry...</div>
            )
    }
}