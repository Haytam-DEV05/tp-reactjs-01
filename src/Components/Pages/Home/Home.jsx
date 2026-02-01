import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const itemsPerPage = 6;
  const ApiPath = "http://localhost:2005/data";
  const [allFilms, setAllFilms] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(ApiPath)
      .then((res) => res.json())
      .then((data) => {
        setAllFilms(data);
        setFilms(data.slice(0, itemsPerPage));
      });
  }, []);
  const navigate = useNavigate();
  const handleBtnForm = (param) => {
    navigate(param ? `/updateFilm/${param}` : `/createFilm`);
  };

  const handleBtnDetaille = (param) => {
    navigate(`/FilmDetaille/${param}`);
  };

  const handleBtnDelete = (id) => {
    if (confirm("Are You Sure ?")) {
      fetch(`${ApiPath}/${id}`, {
        method: "DELETE",
      }).then(() => {
        setFilms(allFilms.filter((ele) => ele.id != id));
        alert("Film Delete Successfuly !");
      });
    }
  };

  // make Buttons =>
  const makeButtons = () => {
    const totalItems = allFilms.length;
    let totalPages = Math.ceil(totalItems / itemsPerPage);
    let pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const a = pages.map((ele, index) => {
      return (
        <button
          onClick={() => Paginate(ele)}
          key={index}
          style={{
            background: "red",
            color: "white",
            padding: "10px",
            marginRight: "5px",
            cursor: "pointer",
          }}
        >
          {ele}
        </button>
      );
    });
    return a;
  };

  const Paginate = (param) => {
    const start = (param - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setFilms(allFilms.slice(start, end));
  };

  return (
    <div className="container" style={{ maxWidth: "1100px", margin: "auto" }}>
      <h1>Gestionaire De Filmes</h1>

      <button
        onClick={() => handleBtnForm()}
        style={{
          color: "white",
          background: "red",
          cursor: "pointer",
          padding: "6px 15px",
          borderRadius: "20px",
          border: 0,
          margin: "20px 0",
        }}
      >
        + create new Film
      </button>
      <table style={{ width: "100%" }}>
        <thead style={{ background: "green" }}>
          <tr style={{ textAlign: "center" }}>
            <td style={{ fontSize: "20px", padding: "5px 0" }}>Titre</td>
            <td style={{ fontSize: "20px", padding: "5px 0" }}>Genre</td>
            <td style={{ fontSize: "20px", padding: "5px 0" }}>Stock</td>
            <td style={{ fontSize: "20px", padding: "5px 0" }}>Evaluation</td>
            <td style={{ fontSize: "20px", padding: "5px 0" }}>Action</td>
          </tr>
        </thead>
        <tbody>
          {films.map((p) => {
            return (
              <tr
                key={p.id}
                style={{
                  background: "red",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <td style={{ padding: "5px 0" }}>{p.titre}</td>
                <td>{p.genre}</td>
                <td>{p.stock}</td>
                <td>
                  {p.evaluation} <span style={{ color: "yellow" }}>/5</span>
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <button onClick={() => handleBtnDetaille(p.id)}>✅</button>
                  <button onClick={() => handleBtnForm(p.id)}>📝</button>
                  <button onClick={() => handleBtnDelete(p.id)}>❌</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="filter-button"
      >
        {makeButtons()}
      </div>
    </div>
  );
}
