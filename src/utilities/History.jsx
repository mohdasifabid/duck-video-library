import "./History.css";
import { Layout } from "./Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCall, getCall } from "./reusableFunctions";
import {useDispatch, useSelector} from "react-redux"
import { setHistory } from "../features.js/userActivitySlice";

export const History = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const history = useSelector(state=>state.activityState.history)

  useEffect(async () => {
    const data = await getCall("/api/user/history");
    dispatch(setHistory(data.history))
  }, []);

  const deleteHistory = async () => {
    const data = await deleteCall("/api/user/history/all");
    dispatch(setHistory(data.history))

  };
  const deleteVideoFromHistory = async (id) => {
    const data = await deleteCall(`/api/user/history/${id}`);
    dispatch(setHistory(data.history))

  };

  return (
    <Layout>
      <div className="history-videos-heading-clear-btn-container">
        <h2>History</h2>
        <button className=" history-videos-clear-btn " onClick={deleteHistory}>
          Clear History
        </button>
      </div>
      <div className="history-videos-container">
        <div>
          {
            history?.map((hvideo) => {
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
