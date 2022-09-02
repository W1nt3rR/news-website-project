import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../Home";

interface Props {

}

export const NewsApp = (props : Props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<p>404</p>} />
            </Routes>
        </BrowserRouter>
    );
}