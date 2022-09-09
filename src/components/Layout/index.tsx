import { PropsWithChildren } from "react";
import { createGlobalState } from "react-use";
import style from "./layout.module.scss";

export const useGlobalNews = createGlobalState<any[]>([]);

export const Layout = (props : PropsWithChildren) => {
    return <>
        <div className={style.layout}>
            {props.children}
        </div>
    </>
}