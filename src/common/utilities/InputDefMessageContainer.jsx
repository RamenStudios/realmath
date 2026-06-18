import { FunctionDef } from './inputTypes/defMessages/FunctionDef'
import { PointDef } from './inputTypes/defMessages/PointDef'
import { VectorDef } from './inputTypes/defMessages/VectorDef'
import { VectorFieldDef } from './inputTypes/defMessages/VectorFieldDef'
import { SpaceCurveDef } from './inputTypes/defMessages/SpaceCurveDef'

export const InputDefMessageContainer = ({type}) => {
    switch (type) {
        case 0:
            return (
                <FunctionDef />
            )
            break
        case 1:
            return (
                <PointDef />
            )
            break
        case 2:
            return (
                <VectorDef />
            )
            break
        case 3:
            return (
                <VectorFieldDef />
            )
            break
        case 4:
            return (
                <SpaceCurveDef />
            )
            break
        default:
            return (
                <div>something has gone awry...</div>
            )
    }
}