export const ShowModal = (modalname='modal') => {
    try{
        let modal = new bootstrap.Modal(document.getElementById(modalname), {});
        modal.show();
    }catch(e){
        console.error(`Cannot show modal ${modalname}: ${e}`)
    }
}