import { useEffect, useState } from 'react';
import VideoStream from './VideoStream';
import { initializeApp } from "firebase/app";
import './App.css';

const firebaseConfig = {
    apiKey: "AIzaSyDqNg0bzlWX2nLRPjzPZGeAi2FTxLJzIVs",
    authDomain: "webrtc-vidme.firebaseapp.com",
    projectId: "webrtc-vidme",
    storageBucket: "webrtc-vidme.appspot.com",
    messagingSenderId: "465596244398",
    appId: "1:465596244398:web:9f8b8835818d31a6c1a83f",
    measurementId: "G-P3DWGJFLVC"
};

const servers = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        }
    ]
};



function App() {
    const [localStream, setLocalStream] = useState(false);

    const handleLocalButtonClick = (action) => {
        if (action === "start") {
            setLocalStream(true);
        } else {
            setLocalStream(false);
        }

    }

    useEffect(() => {
        const pc = new RTCPeerConnection(servers);
    }, []);

    return (
        <div className="App">
            {(localStream) ? <VideoStream /> : <p>Stream is OFF</p>}
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => { handleLocalButtonClick("start") }}>Start Local Stream</button>
            <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => { handleLocalButtonClick("stop") }}>Stop Local Stream</button>
        </div>
    );
}
export default App;
