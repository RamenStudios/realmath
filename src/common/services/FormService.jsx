import React from "react";

export const GetFormData = () =>
{
    // show modal
    const qrModal = document.getElementById('qrmodal')
    let modal = new bootstrap.Modal(document.getElementById('qrmodal'), {});
    modal.show();
}