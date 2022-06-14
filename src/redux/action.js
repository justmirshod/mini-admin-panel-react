import { createAction } from "@reduxjs/toolkit";

// export const newsFetching = createAction("NEWS_FETCHING");
// export const newsFetched = createAction("NEWS_FETCHED");
// export const newsFetchingError = createAction("NEWS_FETCHING_ERROR");
// export const newsCreated = createAction("NEWS_CREATE");
// export const newsDeleted = createAction("NEWS_DELETED");

export const filtersFetching = createAction("FILTERS_FETCHING");
export const filtersFetched = createAction("FILTERS_FETCHED");
export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR");
export const activeFilterChanged = createAction("ACTIVE_FILTER_CHANGED");

// export const filtersFetching = () => {
//   return {
//     type: "FILTERS_FETCHING",
//   };
// };
// export const filtersFetched = (filters) => {
//   return {
//     type: "FILTERS_FETCHED",
//     payload: filters,
//   };
// };
// export const filtersFetchingError = () => {
//   return {
//     type: "FILTERS_FETCHING_ERROR",
//   };
// };
// export const activeFilterChanged = (filter) => {
//   return {
//     type: "ACTIVE_FILTER_CHANGED",
//     payload: filter,
//   };
// };

// export const fetchFilters = (request) => (dispatch) => {
//   dispatch(filtersFetching());
//   request("http://localhost:3001/filters")
//     .then((data) => dispatch(filtersFetched(data)))
//     .catch(() => dispatch(filtersFetchingError()));
// };
