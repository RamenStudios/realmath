import React from "react";
import { MathField } from "../../../common/mathfield";
import { useRef, useState, useEffect } from 'react';

export const FunctionInput = () =>
{
    const [left, setLeft] = useState("");
    const [right, setRight] = useState("");

    return(
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-5" >
                        <MathField valueIn={left} onInput={evt => setLeft(evt.target.value)} />
                            Value:{left}
                    </div>
                    <div class="col">=</div>
                    <div class="col-lg-5" >
                        <MathField valueIn={right} onInput={evt => setRight(evt.target.value)} />
                            Value:{right}
                    </div>
                </div>
            </div>
        </div>
    )

}