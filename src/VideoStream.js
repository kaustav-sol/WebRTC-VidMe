import React from 'react';
import { useRef, useEffect } from 'react';
function VideoStream() {
    let localVideoStream = null;
    let remoteVideoStream = null;

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const hasUserMedia = () => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        return !!navigator.getUserMedia;
    }

    const getMediaStream = async () => {
        if (hasUserMedia()) {
            localVideoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            remoteVideoStream = new MediaStream();
            handlePeerConnection();
            if (localVideoRef.current && remoteVideoRef.current) {
                localVideoRef.current.srcObject = localVideoStream;
                remoteVideoRef.current.srcObject = remoteVideoStream;
            }

        } else {
            alert("getUserMedia() is not supported in your browser");
        }
    }

    const handlePeerConnection = () => {
        try {
            const pc = new RTCPeerConnection();
            localVideoStream.getTracks().forEach(track => pc.addTrack(track, localVideoStream));
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log("New ICE candidate: ", event.candidate);
                }
            }
            pc.ontrack = (event) => {
                remoteVideoStream.addTrack(event.track, remoteVideoStream);
            }
        } catch (error) {
            console.error("Error creating peer connection: ", error);
        }
        const pc = new RTCPeerConnection();
        localVideoStream.getTracks().forEach(track => pc.addTrack(track, localVideoStream));
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("New ICE candidate: ", event.candidate);
            }
        }
        pc.ontrack = (event) => {
            remoteVideoStream.addTrack(event.track, remoteVideoStream);
        }
    }

    useEffect(() => {
        getMediaStream();
    }, []);
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto border">
            <video className='container mx-auto px-4"' ref={localVideoRef} autoPlay playsInline></video>
            <video className='container mx-auto px-4"' ref={remoteVideoRef} autoPlay playsInline></video>
        </div>
    );
}

export default VideoStream;
