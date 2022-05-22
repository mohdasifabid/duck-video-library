import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useVideo } from "./useVideo";
import { Login } from "./utilities/Login";
import { History } from "./utilities/History";
import { Routes, Route} from "react-router-dom"
import { Playlist } from "./utilities/Playlist";
import { VideoPage } from "./utilities/VideoPage";
import { WatchLater } from "./utilities/WatchLater";
import { LandingPage} from "./utilities/LandingPage";
import { TrendingVideos } from "./utilities/TrendingVideos";
import { useAuthProvider } from "./utilities/authProvider";
import { PrivateRoute } from "./utilities/PrivateRoute";
import { Signup } from "./utilities/Signup";
import { LikedVideos } from "./LikedVideos";
import { Aplaylist } from "./utilities/aPlaylist";


function App() {  
 const { dispatch } = useVideo();
 const { dispatch: authDispatch, state: authState} = useAuthProvider()
 useEffect(() => {
  const getVideos = async () => {
    const response = await axios.get("api/videos");
    dispatch({ type: "GET_VIDEOS", payload: response.data.videos });
  };
  getVideos();
  const token = localStorage.getItem("encodedToken");
  if(token){
    authDispatch({type:"LOGIN_STATUS", payload: true})
  } else {
    authDispatch({type:"LOGIN_STATUS", payload: false})

  }
}, []);



  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/videos/:id" element={<VideoPage/>}/>
        <Route path="/trending" element={<TrendingVideos/>}/>
        <Route path="/playlist/:id" element={<Aplaylist/>}/>
        <Route path="/watch-later" element={<PrivateRoute/>} >
          <Route path="/watch-later" element={<WatchLater/>}/>
        </Route>
        <Route path="/history" element={<PrivateRoute/>}>
          <Route path="/history" element={<History/>}/>
        </Route>
        <Route path="/playlist" element={<PrivateRoute/>}>
          <Route path="/playlist" element={<Playlist/>}/>
        </Route>
        <Route path="/liked" element={<PrivateRoute/>}>
          <Route path="/liked" element={<LikedVideos/>}/>
        </Route>
        {
          authState.isLogin ? <Route path="/login" element={<LandingPage/>}/> : <Route path="/login" element={<Login />}/>
        }
        
        <Route path="/signup" element={<Signup />}/>

      </Routes>
    </div>
  )
}
export default App;
