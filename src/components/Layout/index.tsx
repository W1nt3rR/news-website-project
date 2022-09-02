import React, { PropsWithChildren } from "react";
import style from "./layout.module.scss";

interface Props {

}

export const Layout = (props : PropsWithChildren<Props>) => {
    return <>
        <div className={style.layout}>
            {props.children}
        </div>
    </>
}