// this is literally just a div
// but it allows me to send and update custom props pretty easily
// mainly used for easy formdata collection, hence inputData

export const CustomDiv = ({idIn, inputData}) =>
{
    return(
        <div id={idIn} class="my-0 mx-0" value={inputData}/>
    )
}