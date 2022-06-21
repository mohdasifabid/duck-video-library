import "./History.css";
import { Layout } from "./Layout";
import { useEffect } from "react";
import { useVideo } from "../useVideo";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../videoActionTypes";
import { deleteCall, getCall } from "./reusableFunctions";

export const History = () => {
  const { state, dispatch } = useVideo();
  const navigate = useNavigate();

  useEffect(async () => {
    const data = await getCall("/api/user/history");
    dispatch({ type: getHistory, payload: data.history });
  }, []);

  const deleteHistory = async () => {
    const data = await deleteCall("/api/user/history/all");
    dispatch({ type: getHistory, payload: data.history });
  };
  const deleteVideoFromHistory = async (id) => {
    const data = await deleteCall(`/api/user/history/${id}`);
    dispatch({ type: getHistory, payload: data.history });
  };

  return (
    <Layout>
      <div className="history-videos-heading-clear-btn-container">
        <h1>History</h1>
        <button
          className=" history-videos-clear-btn duck-primary-btn-s duck-primary-btn"
          onClick={deleteHistory}
        >
          Clear History
        </button>
      </div>
      <div className="history-videos-container">
        <div>
          {state.history &&
            state.history.map((hvideo) => {
              return (
                <div className="list" key={hvideo._id}>
                  <li onClick={() => navigate(`/videos/${hvideo._id}`)}>
                    {hvideo.title}
                  </li>
                  <span>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteVideoFromHistory(hvideo._id)}
                    ></i>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};
