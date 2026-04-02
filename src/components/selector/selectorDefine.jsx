import { useState, useEffect, useRef } from 'react';
import { GraphComponents } from '../../common/utilities/graphComponents';
import { ShowModal } from '../../common/services/ModalService';

export const SelectorDefine = ({userframe, defineSelection}) =>
{

    if (userframe == 'desktop') {
        return(
            <div class="d-grid gap-2">
                <button type="button" class="btn btn-primary" onClick={defineSelection}>
                    <div class="light-grey italic bold">DEFINE</div>
                </button>
            </div>
        )
    } else {
        return(
            <div class="d-grid gap-2">
                <button type="button" class="btn btn-primary" onClick={defineSelection}>
                    <div class="mobile-body light-grey italic bold">DEFINE</div>
                </button>
            </div>
        )
    }
}