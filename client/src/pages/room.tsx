import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/room-context";
import VideoPlayer from "../components/video-player";
import { PeerState } from "../context/peer-reducer";
import ScreenShareBtn from "../components/screen-share-btn";

const Room = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const { socket, me, peers, stream, shareScreen, screenSharingId, setRoomId } =
    useSocket();

  useEffect(() => {
    if (me && id) {
      socket.emit("join-room", { roomId: id, peerId: me._id });
    }
  }, [id, me, socket]);

  useEffect(() => {
    socket.on("get-users", (data: any) => {
      if (id) {
        setUsers(data[id]);
      }
    });
  }, [id, socket]);
  useEffect(() => {
    setRoomId(id);
  }, [id]);

  const screenSharingVideo =
    screenSharingId === me?.id ? stream : peers[screenSharingId]?.stream;
const {[screenSharingId]:sharing,...peersToShow} = peers;

  if (!me) return <h4>Me is still loading, pelase wait for a while ...</h4>;
  return (
    <div className="px-4 py-2 flex flex-row gap-4">
      {screenSharingVideo && (
        <div className="w-4/5 border-2 rounded-md">
          <VideoPlayer stream={screenSharingVideo} />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="w-44 h-44 rounded-md">
        {screenSharingId !== me?.id && <VideoPlayer stream={stream} />}
          {Object.values(peersToShow as PeerState).map((peer, index) => (
            <div
              className="flex flex-row gap-2 h-44 w-44 rounded-md border"
              key={index}
            >
              <VideoPlayer stream={peer.stream} />
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-2 px-3 py-2 border-t w-full flex justify-center">
<ScreenShareBtn onClick={shareScreen}/>
</div> 
    </div>
  );
};

export default Room;


