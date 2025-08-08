import React from "react";


const BASE_URL = 'https://ndlearning.8thwall.app/ar-math-viewer/'

export const GetFormData = () =>
{
    // show modal
    let modal = new bootstrap.Modal(document.getElementById('qrmodal'), {});
    modal.show();
}