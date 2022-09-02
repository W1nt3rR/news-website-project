import { useEffect, useState } from "react";
import { newsAPI } from "../../api/api";
import { Button } from "../Button";
import { Card } from "../Card";
import { Layout } from "../Layout";
import { SearchInput } from "../SearchInput";
import style from "./home.module.scss";

interface Props {

}

export const Home = (props : Props) => {

    const [ news, setNews ] = useState(JSON.parse(localStorage.getItem("News") as string));
    const [ search, setSearch ] = useState("");

    // console.log(search);

    localStorage.setItem("News", JSON.stringify(news));

    useEffect(() => {
        // fetchNews();
    }, [])

    const fetchNews = async (searchParam?: string) => {
        try {
            let result;
            if(searchParam) {
                result = await newsAPI.get("everything", {params: { q: searchParam}});
            } else {
                result = await newsAPI.get("top-headlines");
            }

            const data = result.data.articles;
            console.log(data);
            setNews(data);
        } catch (error) {
            console.log(error);
        }
    }

    return <Layout>
        <div className={style.searchContainer}>
            <SearchInput input={search} setInput={setSearch}/>
            <Button type="coloured" onClickFn={() => {fetchNews(search)}} text="Search"/>
        </div>
            
        <div className={style.newsContainer}>
            {news.map((item : Object) => {
                return <Card info={item} />
            })}
        </div>
    </Layout>
}