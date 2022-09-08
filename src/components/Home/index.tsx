import { useEffect, useState } from "react";
import { newsAPI } from "../../api/api";
import { Button } from "../Button";
import { Card } from "../Card";
import { Layout } from "../Layout";
import { SearchInput } from "../SearchInput";
import { SelectOption } from "../SelectOption";
import style from "./home.module.scss";

interface Props {

}

export const Home = (props : Props) => {

    const [ news, setNews ] = useState(JSON.parse(localStorage.getItem("News") as string));
    const [ search, setSearch ] = useState("");
    const [ currentPage, setCurrentPage] = useState(1);

    const [ sort, setSort ] = useState("publishedAt");

    // console.log(search);

    localStorage.setItem("News", JSON.stringify(news));

    useEffect(() => {
        // fetchNews();
    }, [])

    const searchParams = {
        sortBy: sort
    }

    const commonParams = {
        pageSize: 20,
        page: currentPage,
    }

    const fetchNews = async (searchParam?: string) => {
        try {
            let result;

            if(searchParam) {
                result = await newsAPI.get("everything", {params: { q: searchParam, ...commonParams, ...searchParams}});
            } else {
                result = await newsAPI.get("top-headlines", {params: { ...commonParams }});
            }

            const data = result.data.articles;
            console.log(data);
            setNews(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
        fetchNews(search);
    }

    return <Layout>
        <div className={style.searchContainer}>
            <SearchInput input={search} setInput={setSearch}/>
            <SelectOption setOption={setSort} />
            <Button type="coloured" onClickFn={() => fetchNews(search)} text="Search"/>
        </div>
            
        <div className={style.newsContainer}>
            {news && news.map((item: Object, index: number) => {
                return <Card key={index} info={item} />
            })}
        </div>

        <div className={style.pagination}>
            <Button type="coloured" onClickFn={handleLoadMore} text="Load More" />
        </div>
    </Layout>
}