import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hook/useHttp";

const initialState = {
  news: [],
  newsLoadingStatus: "sam",
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/news");
});

export const deleteNews = createAsyncThunk("news/deleteNews", async (id) => {
  const { request } = useHttp();
  return await request(`http://localhost:3001/news/${id}`, "DELETE");
});

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    newsCreated: (state, action) => {
      state.news.push(action.payload);
    },
    newsDeleted: (state, action) => {
      state.news = state.news.filter((s) => s.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.newsLoadingStatus = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, { payload }) => {
        state.newsLoadingStatus = "sam";
        state.news = payload;
      })
      .addCase(
        (fetchNews.rejected,
        (state) => {
          state.newsLoadingStatus = "error";
        })
      )
      .addCase(deleteNews.fulfilled, (state, { meta }) => {
        state.news = state.news.filter((s) => s.id !== meta.arg);
      })
      .addCase(deleteNews.rejected, (state) => {
        state.newsLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = newsSlice;

export default reducer;
export const {
  newsFetched,
  newsFetching,
  newsFetchingError,
  newsDeleted,
  newsCreated,
} = actions;
