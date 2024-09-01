import React from 'react';
import { useRef, useEffect } from 'react';
function VideoStream() {
    const videoRef = useRef(null);

    const hasUserMedia = () => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        return !!navigator.getUserMedia;
    }

    const getMediaStream = async () => {
        if (hasUserMedia()) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } else {
            alert("getUserMedia() is not supported in your browser");
        }
    }

    useEffect(() => {
        getMediaStream();
    }, []);
    return (
        <div>
            <video ref={videoRef} autoPlay playsInline></video>
        </div>
    );
}

export default VideoStream;