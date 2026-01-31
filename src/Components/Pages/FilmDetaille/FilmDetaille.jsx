import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function FilmDetaille() {
  const { id } = useParams();
  const [film, setFilm] = useState([]);
  const [realatedFilms, setRealatedFilms] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:2005/data`)
      .then((res) => res.json())
      .then((data) => {
        const findFilm = data.find((ele) => ele.id == id);
        const realatedFilm = data.filter(
          (ele) => ele.genre === findFilm.genre && ele.id != id,
        );
        setFilm(findFilm);
        setRealatedFilms(realatedFilm);
      });
  }, [id]);
  const navigate = useNavigate();
  const handleBtnNavigate = (param) => {
    navigate(param ? `/FilmDetaille/${param}` : `/`);
  };
  return (
    <div className="container">
      <h1 style={{ margin: "30px 0", fontSize: "35px" }}>FilmDetaille</h1>
      <button onClick={() => handleBtnNavigate()} style={{ cursor: "pointer" }}>
        {" < "}retour
      </button>
      <div
        className="box-container"
        style={{
          background: "red",
          margin: "20px auto",
          maxWidth: "600px",
          padding: "30px",
          borderRadius: "30px",
        }}
      >
        <h2 style={{ marginBlock: "10px" }}>Id : {film.id}</h2>
        <h2>
          Titre :{" "}
          <span style={{ color: "white", fontSize: "26px" }}>{film.titre}</span>
        </h2>
        <h2>
          Genre :{" "}
          <span style={{ color: "white", fontSize: "26px" }}>{film.genre}</span>
        </h2>
        <h2>
          Stock :{" "}
          <span style={{ color: "white", fontSize: "26px" }}>{film.stock}</span>
        </h2>
        <h2>
          Evaluation :{" "}
          <span style={{ color: "white", fontSize: "26px" }}>
            {film.evaluation}
          </span>
        </h2>
      </div>

      <h2 style={{ fontSize: "35px", fontWeight: "800" }}>Related Film </h2>
      <div
        className="realated-film"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {realatedFilms.map((ele) => (
          <div
            style={{
              background: "green",
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleBtnNavigate(ele.id)}
          >
            <h3>{ele.id}</h3>
            <h3>{ele.titre}</h3>
            <h3>{ele.evaluation}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
