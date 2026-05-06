import { useState, useEffect, useRef } from 'react';
import { GraphComponents } from '../../common/utilities/graphComponents';
import { ShowModal } from '../../common/services/ModalService';

export const SelectorDefine = ({userframe, defineSelection}) =>
{
    const defineSelectedComponent = () => {
        defineSelection(document.getElementById('selector').value)
    }

    if (userframe == 'desktop') {
        return(
            <div className="d-grid gap-2">
                <button type="button" className="btn btn-primary" onClick={defineSelectedComponent}>
                    <div className="light-grey italic bold">DEFINE</div>
                </button>
            </div>
        )
    } else {
        return(
            <div className="d-grid gap-2">
                <button type="button" className="btn btn-primary" onClick={defineSelectedComponent}>
                    <div className="mobile-body light-grey italic bold">DEFINE</div>
                </button>
            </div>
        )
    }
}