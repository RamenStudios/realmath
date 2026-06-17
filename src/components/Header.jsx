import React from "react";

export const Header = ({userframe}) =>
{
    const headertext = () =>
    {
        if(userframe === 'desktop'){
            return(
                <div className="row">
                    <div className="col-1" />
                    <div className="col-6 align-self-start justify-content-start">
                        <div className="row subtitle white justify-content-start">
                            NOTRE DAME LEARNING
                        </div>
                        <div id="site-title " className="row site-title white justify-content-start">
                            RealMath AR
                        </div>
                    </div>
                    <div className="col" />
                </div>
            )
        }else{
            return(
                <div className="justify-content-center">
                    <div className="row mobile-subtitle white justify-content-center">
                        NOTRE DAME LEARNING
                    </div>
                    <div id="site-title " className="row mobile-site-title white justify-content-center">
                        RealMath AR
                    </div>
                </div>
            )
        }
    }

    return(
        <div className="container-fluid bg-nd-blue pt-2 pb-2 mb-2" id="page-top-header">
            {headertext()}
        </div>
    )
}