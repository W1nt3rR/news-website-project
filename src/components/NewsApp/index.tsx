import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ArticlePage } from "../ArticlePage";
import { Home } from "../Home";

interface Props {

}

export const NewsApp = (props : Props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news/*" element={<ArticlePage />} />
                <Route path="*" element={<p>404</p>} />
            </Routes>
        </BrowserRouter>
    );
}