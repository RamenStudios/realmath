import { DefinitionsGetter } from './DefinitionsGetter'

export const Definitions = ({component}) => {
    console.log('entered Definitions export')
    console.log(component)
    try{
      return (
        <DefinitionsGetter type={Number(component)} />
      )
    } catch (e) {
        console.error(e)
        return (
            <div>Component {component} not found!</div>
        )
    }
}