import { FunctionHelp } from './types/FunctionHelp'
import { PointHelp } from './types/PointHelp'
import { VectorHelp } from './types/VectorHelp'
import { SpaceCurveHelp } from './types/SpaceCurveHelp'
import { VectorFieldHelp } from './types/VectorFieldHelp'
import { Help } from './HelpTemplate'

export const HelpMessageGetter = ({type}) => {
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