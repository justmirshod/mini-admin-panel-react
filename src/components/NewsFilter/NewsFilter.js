import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import Spinner from "../Spinner";
import Error from "../Error";
import { fetchFilters, activeFilterChanged } from "./filter_slice";

function NewsFilter() {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <Error />;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Filters does not exist</h5>;
    }

    return arr.map(({ name, className, label }) => {
      const btnClasses = classNames("btn", className, {
        active: name === activeFilter,
      });
      return (
        <button
          key={name}
          id={name}
          className={btnClasses}
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const element = renderFilters(filters);

  return (
    <div className="card shadow-lg   mt-4">
      <div className="card-body">
        <p className="card-text">Filter by category</p>
        <div className="btn-group">{element}</div>
      </div>
    </div>
  );
}

export default NewsFilter;

// Kategoriya bo'yicha filtirlash funksiyasini tuzish
// Active tugma ishlashi kerak
