import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner";
import Error from "../Error";
import NewsListItem from "../NewsListItem";
import { useCallback } from "react";
import { createSelector } from "reselect";
import { fetchNews, deleteNews } from "./news_slice";
import "../style/news_list.css";

export default function NewsList() {
  const filteredNewsSelected = createSelector(
    (state) => state.filter.activeFilter,
    (state) => state.news.news,
    (filter, news) => {
      if (filter === "all") {
        return news;
      } else {
        return news.filter((s) => s.category === filter);
      }
    }
  );

  const filteredNews = useSelector(filteredNewsSelected);

  const filterLoadingStatus = useSelector(
    (state) => state.filter.filterLoadingStatus
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNews());
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback((id) => {
    dispatch(deleteNews(id));
    //eslint-disable-next-line
  }, []);

  if (filterLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filterLoadingStatus === "error") {
    return <Error />;
  }

  const renderNewsList = (arr) => {
    if (arr.length === 0) {
      return (
        <h4 className="text-center mt-5 text-white">News does not exist</h4>
      );
    }
    return arr
      .map(({ id, ...props }) => {
        return (
          <NewsListItem key={id} {...props} onDelete={() => onDelete(id)} />
        );
      })
      .reverse();
  };

  const element = renderNewsList(filteredNews);

  return <ul className="user__part"> {element} </ul>;
}

// Vazifalar
// 1. "x" tugmasi bosilgandan yangiliklar UI dan ochib ketishi kerak
// Qiyin Vazifa
// 2. O'chirilgan yangilik db.json dan ham o'chirilishi kerak. Method "DELETE"
