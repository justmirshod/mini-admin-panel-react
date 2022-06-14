import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../hook/useHttp";
import { v4 as idName } from "uuid";
import { newsCreated } from "./NewsList/news_slice";

function NewsAddForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { filters, filtersLoadingStatus } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newNews = { id: idName(), name, description, category };
    request("http://localhost:3001/news", "POST", JSON.stringify(newNews), {
      "Content-Type": "application/json",
    })
      .then((response) => console.log(response))
      .then(dispatch(newsCreated(newNews)))
      .catch((err) => console.log(err));
    setName("");
    setDescription("");
    setCategory("");
  };

  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option>Loading options</option>;
    } else if (status === "error") {
      return <option>Loading errors</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === "all") {
          return null;
        }
        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Name for new News
        </label>
        <input
          type="text"
          required
          name="name"
          className="form-control"
          id="name"
          placeholder="What is the name of news"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Description
        </label>
        <textarea
          type="text"
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="What is your news about?"
          style={{ height: "120px " }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Choose the category of news
        </label>
        <select
          required
          className="form-select"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Category of news</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>
      <button type="submit" className="btn text-white btn-dark w-100 shadow-lg">
        Create News
      </button>
    </form>
  );
}

export default NewsAddForm;

// Vazifa
// 1. Yangiliklar qo'shish funksiyasini yozish
// P.S No odatiy id uchun UUID kutubxonasidan foydalanishingiz mumkin
// Qiyin vazifa
// 2. Yangiliklar db.json gan ham qoshilishi kerak boladi
// O'rta qiyin
// 3. Yangiliklar qoshilgan vaqt, categoriya bo'yicha ajralish
