import React from "react";

export const Header = ({userframe}) =>
{
    const headertext = () =>
    {
        if(userframe === 'desktop'){
            return(
                <div class="row">
                    <div class="col-1" />
                    <div class="col-6 align-self-start justify-content-start">
                        <div class="row subtitle white justify-content-start">
                            NOTRE DAME LEARNING
                        </div>
                        <div id="site-title " class="row site-title white justify-content-start">
                            RealMath AR
                        </div>
                    </div>
                    <div class="col" />
                </div>
            )
        }else{
            return(
                <><div class="row">
                    <div class="row subtitle white justify-content-center">
                        NOTRE DAME LEARNING
                    </div>
                </div>
                <div class="row">
                    <div id="site-title " class="row site-title white justify-content-center">
                        RealMath AR
                    </div>
                </div></>
            )
        }
    }

    return(
        <div class="container-fluid bg-nd-blue pt-2 pb-2 mb-2" id="page-top-header">
            {headertext()}
        </div>
    )
}