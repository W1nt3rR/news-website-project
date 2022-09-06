import React from "react";
import style from "./button.module.scss";

interface Props {
    type: string;
    onClickFn: any;
    text: string;
}

export const Button = (props: Props) => {

    const { type, onClickFn, text } = props;

    return <button className={`${style.button} ${style[type]}`} onClick={onClickFn}>{text}</button>
}