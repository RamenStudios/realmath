import React from "react";

export const Footer = () =>
{
    return(
        <div className="container-fluid bg-nd-blue mt-5">
            <div className="row p-0">
                <div className="col-sm-12 col-md-9 text-dark pt-5 pb-2 px-5">

                    <p className="extended-letter-spacing text-uppercase text-smaller">
                        <a href="https://provost.nd.edu/"
                        target="_blank" className="provost-link text-light text-decoration-none">
                            Office of the Provost
                        </a>
                    </p>

                    <h3 className="mb-1 pointer text-white">RealMath AR</h3>

                    <p className="text-light mb-1 opacity-50">
                        353 DeBartolo Hall and 943 Flanner Hall<br/>
                        Notre Dame, IN 46556 USA<br/>
                    </p>

                    <p className="mb-3">
                        <a href="tel:5746319146" className="text-light text-decoration-none">(574) 631-9146</a> <br/>
                        <a href="mailto:remix-list@nd.edu" className="text-light text-decoration-none">learning@nd.edu</a>
                    </p>


                    <ul className="list-inline mt-5">
                        <li className="list-inline-item mb-2">
                            <a href="#" target="_blank" className="text-light text-decoration-none">
                                Report a Problem
                            </a>
                        </li>
                    </ul>

                    <p className="text-light mt-4 opacity-50">
                        <span className="me-2" id="footer-year"></span>
                        University of Notre Dame
                    </p>
                </div>

                <div className="col-sm-12 col-md-3 bg-nd-footer-blue text-white pt-5 pb-3">


                    <p className="text-center">
                        <a href="https://www.nd.edu/" aria-label="University of Notre Dame" target="_blank">
                            <img id="notre-dame-logo" src="https://static.nd.edu/images/marks/white/ndmark.svg"
                                loading="lazy" alt="University of Notre Dame" property="url"/>
                        </a>
                    </p>

                    <div className="d-flex justify-content-center">
                        <ul className="list-group list-group-flush m-0 pl-1">
                            <li className="list-group-item py-1 bg-transparent border-0"><a href="https://search.nd.edu/"
                                    className="text-white" target="_blank"><i className="fa-solid fa-magnifying-glass me-3"></i>Search</a>
                            </li>
                            <li className="list-group-item py-1 bg-transparent border-0"><a href="https://mobile.nd.edu/"
                                    className="text-white" target="_blank"><i className="fa-solid fa-mobile-screen-button me-3"></i>Mobile
                                    App</a>
                            </li>
                            <li className="list-group-item py-1 bg-transparent border-0"><a href="https://news.nd.edu/"
                                    className="text-white" target="_blank"><i className="fa-regular fa-newspaper me-3"></i>News</a></li>
                            <li className="list-group-item py-1 bg-transparent border-0"><a href="https://events.nd.edu/"
                                    className="text-white" target="_blank"><i className="fa-regular fa-calendar me-3"></i>Events</a></li>
                            <li className="list-group-item py-1 bg-transparent border-0"><a href="https://www.nd.edu/visit/"
                                    className="text-white" target="_blank"><i className="fa-solid fa-building-columns me-3"></i>Visit</a>
                            </li>
                            <li className="list-group-item py-1 bg-transparent border-0"><a
                                    href="https://www.nd.edu/about/accessibility/" className="text-white" target="_blank"><i
                                    className="fa-solid fa-wheelchair-move me-3"></i>Accessibility</a>
                            </li>
                        </ul>
                    </div>

                    <ul className="list-group list-group-horizontal mt-4 mb-3 justify-content-center">
                    <li className="list-group-item bg-transparent border-0 px-2 text-center" data-toggle="tooltip"
                        data-placement="top" title="Facebook"><a href="https://www.facebook.com/notredame/" className="text-white"
                            target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                    <li className="list-group-item bg-transparent border-0 px-2 text-center" data-toggle="tooltip"
                        data-placement="top" title="Twitter"><a href="https://twitter.com/NotreDame" className="text-white"
                            target="_blank"><i className="fab fa-x-twitter"></i></a></li>
                    <li className="list-group-item bg-transparent border-0 px-2 text-center" data-toggle="tooltip"
                        data-placement="top" title="Instagram"><a href="https://www.instagram.com/notredame/"
                            className="text-white" target="_blank"><i className="fab fa-instagram"></i></a></li>
                    <li className="list-group-item bg-transparent border-0 px-2 text-center" data-toggle="tooltip"
                        data-placement="top" title="YouTube"><a href="https://www.youtube.com/user/NDdotEDU"
                            className="text-white" target="_blank"><i className="fab fa-youtube"></i></a></li>
                    <li className="list-group-item bg-transparent border-0 px-2 text-center" data-toggle="tooltip"
                        data-placement="top" title="LinkedIn"><a
                            href="https://www.linkedin.com/school/university-of-notre-dame/" className="text-white"
                            target="_blank"><i className="fab fa-linkedin"></i></a></li>
                    </ul>

                </div>
            </div>
        </div>
    )
}