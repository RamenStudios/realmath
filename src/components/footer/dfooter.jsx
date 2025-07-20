import React from "react";

export const Footer = () =>
{
    return(
        <div class="container-fluid bg-nd-blue mt-5">
            <div class="row p-0">
                <div class="col-sm-12 col-md-9 text-dark pt-5 pb-2 px-5">

                    <p class="extended-letter-spacing text-uppercase text-smaller">
                        <a href="https://provost.nd.edu/"
                        target="_blank" class="provost-link text-light text-decoration-none">
                            Office of the Provost
                        </a>
                    </p>

                    <h3 class="mb-1 pointer text-white">RealMath AR</h3>

                    <p class="text-light mb-1 opacity-50">
                        353 DeBartolo Hall and 943 Flanner Hall<br/>
                        Notre Dame, IN 46556 USA<br/>
                    </p>

                    <p class="mb-3">
                        <a href="tel:5746319146" class="text-light text-decoration-none">(574) 631-9146</a> <br/>
                        <a href="mailto:remix-list@nd.edu" class="text-light text-decoration-none">learning@nd.edu</a>
                    </p>


                    <ul class="list-inline mt-5">
                        <li class="list-inline-item mb-2">
                            <a href="#" target="_blank" class="text-light text-decoration-none">
                                Report a Problem
                            </a>
                        </li>
                    </ul>

                    <p class="text-light mt-4 opacity-50">
                        <span class="me-2" id="footer-year"></span>
                        University of Notre Dame
                    </p>
                </div>

                <div class="col-sm-12 col-md-3 bg-nd-footer-blue text-white pt-5 pb-3">


                    <p class="text-center">
                        <a href="https://www.nd.edu/" aria-label="University of Notre Dame" target="_blank">
                            <img id="notre-dame-logo" src="https://static.nd.edu/images/marks/white/ndmark.svg"
                                loading="lazy" alt="University of Notre Dame" property="url"/>
                        </a>
                    </p>

                    <div class="d-flex justify-content-center">
                        <ul class="list-group list-group-flush m-0 pl-1">
                            <li class="list-group-item py-1 bg-transparent border-0"><a href="https://search.nd.edu/"
                                    class="text-white" target="_blank"><i class="fa-solid fa-magnifying-glass me-3"></i>Search</a>
                            </li>
                            <li class="list-group-item py-1 bg-transparent border-0"><a href="https://mobile.nd.edu/"
                                    class="text-white" target="_blank"><i class="fa-solid fa-mobile-screen-button me-3"></i>Mobile
                                    App</a>
                            </li>
                            <li class="list-group-item py-1 bg-transparent border-0"><a href="https://news.nd.edu/"
                                    class="text-white" target="_blank"><i class="fa-regular fa-newspaper me-3"></i>News</a></li>
                            <li class="list-group-item py-1 bg-transparent border-0"><a href="https://events.nd.edu/"
                                    class="text-white" target="_blank"><i class="fa-regular fa-calendar me-3"></i>Events</a></li>
                            <li class="list-group-item py-1 bg-transparent border-0"><a href="https://www.nd.edu/visit/"
                                    class="text-white" target="_blank"><i class="fa-solid fa-building-columns me-3"></i>Visit</a>
                            </li>
                            <li class="list-group-item py-1 bg-transparent border-0"><a
                                    href="https://www.nd.edu/about/accessibility/" class="text-white" target="_blank"><i
                                    class="fa-solid fa-wheelchair-move me-3"></i>Accessibility</a>
                            </li>
                        </ul>
                    </div>

                    <ul class="list-group list-group-horizontal mt-4 mb-3 justify-content-center">
                    <li class="list-group-item bg-transparent border-0 px-2 text-center" data-toggle="tooltip"
                        data-placement="top" title="Facebook"><a href="https://www.facebook.com/notredame/" class="text-white"
                            target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                    <li class="list-group-item bg-transparent border-0 px-2 text-center" data-toggle="tooltip"
                        data-placement="top" title="Twitter"><a href="https://twitter.com/NotreDame" class="text-white"
                            target="_blank"><i class="fab fa-x-twitter"></i></a></li>
                    <li class="list-group-item bg-transparent border-0 px-2 text-center" data-toggle="tooltip"
                        data-placement="top" title="Instagram"><a href="https://www.instagram.com/notredame/"
                            class="text-white" target="_blank"><i class="fab fa-instagram"></i></a></li>
                    <li class="list-group-item bg-transparent border-0 px-2 text-center" data-toggle="tooltip"
                        data-placement="top" title="YouTube"><a href="https://www.youtube.com/user/NDdotEDU"
                            class="text-white" target="_blank"><i class="fab fa-youtube"></i></a></li>
                    <li class="list-group-item bg-transparent border-0 px-2 text-center" data-toggle="tooltip"
                        data-placement="top" title="LinkedIn"><a
                            href="https://www.linkedin.com/school/university-of-notre-dame/" class="text-white"
                            target="_blank"><i class="fab fa-linkedin"></i></a></li>
                    </ul>

                </div>
            </div>
        </div>
    )
}