import React from "react";
import axios from "axios";
import { getTabObjects } from "../../components/tabs/tabclasses";

const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'

export const GetFormData = () =>
{
    // get and parse the stringified JSON holding all tabs
    const inputData = JSON.parse(document.getElementById('inputData').getAttribute('value'))
    console.log(inputData)
}