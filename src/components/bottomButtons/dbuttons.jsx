import "https://esm.run/@cortex-js/compute-engine";

export const BottomButtons = ({userframe}) =>
{
    if(userframe === 'desktop')
    {
        return(
            <div class="container">
                <div class="row">
                    <div class="col-5"><div class="d-grid gap-2">
                        <button type="button" class="btn btn-primary" id="visualizeButton">
                            <div class="light-grey italic bold">VISUALIZE IT!</div>
                        </button>
                    </div></div>
                    <div class="col-2"><div class="d-grid">
                        <button type="button" class="btn btn-secondary">
                            <div class="light-grey italic bold">HELP</div>
                        </button>
                    </div></div>
                    <div class="col-2"><div class="d-grid">
                        <button type="button" class="btn btn-secondary">
                            <div class="light-grey italic bold">RESET</div>
                        </button>
                    </div></div>
                    <div class="col-3"><div class="d-grid">
                        <button type="button" class="btn btn-secondary">
                            <div class="light-grey italic bold">REPORT BUG</div>
                        </button>
                    </div></div>
                </div>
            </div>
        )
    }else{
        return(
            <div class="container">
                <div class="row mb-2">
                    <button type="button" class="btn btn-primary" id="visualizeButton">
                            <div class="light-grey italic bold">VISUALIZE IT!</div>
                    </button>
                </div>
                <div class="row mb-2">
                    <button type="button" class="btn btn-secondary">
                        <div class="light-grey italic bold">HELP</div>
                    </button>
                </div>
                <div class="row mb-2">
                    <button type="button" class="btn btn-secondary">
                        <div class="light-grey italic bold">RESET</div>
                    </button>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-secondary">
                        <div class="light-grey italic bold">REPORT BUG</div>
                    </button>
                </div>
            </div>
        )
    }
    
}