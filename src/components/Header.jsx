import React from "react";

export const Header = ({userframe}) =>
{
    const headertext = () =>
    {
        return(
            <div className="d-inline-grid g-0 container-fluid site-title-container">
                <div className="row subtitle white">
                    NOTRE DAME LEARNING
                </div>
                <div id="site-title " className="row site-title white">
                    RealMath AR
                </div>
            </div>
        )
    }

    return(
        <div className="container-fluid bg-nd-blue mb-2 site-title-color" id="page-top-header">
            {headertext()}
        </div>
    )
}