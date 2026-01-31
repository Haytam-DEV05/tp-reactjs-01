import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const ApiPath = "http://localhost:2005/data";
  const [allFilms, setAllFilms] = useState([]);
  const [films, setFilms] = useState([]);
  useEffect(() => {
    fetch(ApiPath)
      .then((res) => res.json())
      .then((data) => {
        setAllFilms(data);
        setFilms(data);
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
    </div>
  );
}
