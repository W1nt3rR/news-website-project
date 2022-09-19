import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ArticlePage } from "../ArticlePage";
import { Home } from "../Home";

export const NewsAppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/article/*" element={<ArticlePage />} />
                <Route path="*" element={<p>Error 404: Page Not Found</p>} />
            </Routes>
        </BrowserRouter>
    );
}