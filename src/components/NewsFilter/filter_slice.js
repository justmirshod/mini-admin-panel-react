import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hook/useHttp";
const initialState = {
  filterLoadingStatus: "sam",
  activeFilter: "all",
  filters: [],
};

export const fetchFilters = createAsyncThunk("filter/fechFilters", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/filters");
});

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filterLoadingStatus = "loading";
    },
    filtersFetched: (state, action) => {
      state.filters = action.payload;
      state.filterLoadingStatus = "sam";
    },
    filtersFetchingError: (state) => {
      state.filterLoadingStatus = "error";
    },
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filterLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, { payload }) => {
        state.filters = payload;
        state.filterLoadingStatus = "sam";
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filterLoadingStatus = "error";
      });
  },
});

const { actions, reducer } = filterSlice;
export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = actions;
