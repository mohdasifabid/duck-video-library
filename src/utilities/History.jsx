import "./History.css";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { VideoCard } from "./VideoCard";
import { useVideo } from "../useVideo";
import { deleteCall, getCall } from "./reusableFunctions";

export const History = () => {
  const { state, dispatch } = useVideo();

  useEffect(async () => {
    const data = await getCall("/api/user/history");
    dispatch({ type: "GET_HISTORY", payload: data.history });
  }, []);

  const deleteHistory = async () => {
    const data = await deleteCall("/api/user/history/all");
    dispatch({ type: "GET_HISTORY", payload: data.history });
  };

  return (
    <div>
      <Navbar />
      <div className="history-videos-body">
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
          <div className="history-videos-card-container">
            {state.history &&
              state.history.map((hvideo) => {
                return <VideoCard item={hvideo} type="history" />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
