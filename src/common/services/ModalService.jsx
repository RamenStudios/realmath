const ModalGetter = (modalname) => {
    try{
        console.log(`MODALNAME: ${modalname}`)
        let modal = new bootstrap.Modal(document.getElementById(modalname), {});
        modal.show();
    }catch(e){
        console.error(`Cannot show modal ${modalname}: ${e}`)
    }
}

export const ShowModal = () => {
    ModalGetter('modal')
}

export const ShowQR = () => {
    ModalGetter('qrmodal')
}