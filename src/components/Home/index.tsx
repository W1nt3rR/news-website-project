import { useEffect, useState } from "react";
import { newsAPI } from "../../api/api";
import { Button } from "../Button";
import { Card } from "../Card";
import { Layout, useGlobalNews } from "../Layout";
import { SearchInput } from "../SearchInput";
import { SelectOption } from "../SelectOption";
import style from "./home.module.scss";

export const Home = () => {

    // const [ news, setNews ] = useState([]);
    const [ news, setNews ] = useGlobalNews();
    const [ search, setSearch ] = useState("");
    const [ currentPage, setCurrentPage] = useState(1);
    const [ endOfNews, setEndOfNews ] = useState(false);
    const [ selectedCountry, setSelectedCountry ] = useState("us");
    const [ sort, setSort ] = useState("publishedAt");

    const newsAmmount = 10;

    useEffect(() => {
        handleSearchClick();
    }, [])

    useEffect(() => {

    }, [])

    const searchParams = {
        sortBy: sort,
        q: search
    }

    const topHeadlinesParams = {
        country: selectedCountry
    }

    const commonParams = {
        pageSize: newsAmmount,
        page: currentPage
    }

    const fetchNews = async () => {
        try {
            let result;

            if(search)
                result = await newsAPI.get("everything", {params: { ...commonParams, ...searchParams }});
            else
                result = await newsAPI.get("top-headlines", {params: { ...commonParams, ...topHeadlinesParams }});

            return result.data.articles;
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoadMore = async () => {
        if(endOfNews)
            return;

        setCurrentPage(currentPage + 1);
        const moreNews = await fetchNews();
        
        if(moreNews.length < newsAmmount)
            setEndOfNews(true);

        setNews([...news, ...moreNews] as any);
    }

    const handleSearchClick = async () => {  
        // Reset control variables
        setCurrentPage(2);
        setEndOfNews(false);

        const newNews = await fetchNews();

        setNews(newNews);
    }

    return <Layout>
        
        <div className={style.searchContainer}>
            <Button type="coloured" onClickFn={() => {
                setSearch("");
                handleSearchClick();
            }} text="Top Headlines"/>
            <SearchInput input={search} setInput={setSearch}/>
            <div>
                <SelectOption setOption={setSort} />
                <Button type="coloured" onClickFn={handleSearchClick} text="Search"/>
            </div>
        </div>
            
        <div className={style.newsContainer}>
            {news && news.map((item: any, index: number) => {
                return <Card key={index} index={index} />
            })}
        </div>

        <div className={style.pagination}>
            <Button type="coloured" onClickFn={handleLoadMore} text="Load More" />
        </div>
    </Layout>
}