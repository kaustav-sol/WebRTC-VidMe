import { useState } from 'react';
import VideoStream from './VideoStream';
import './App.css';


function App() {
    const [stream, setStream] = useState(false);
    const handleButtonClick = async () => {

    }
    return (
        <div className="App">
            <VideoStream />
        </div>
    );
}
export default App;
