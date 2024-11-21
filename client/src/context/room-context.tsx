import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import socketIO from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { peersReducer } from "./peer-reducer";
import { addPeerAction, removePeerAction } from "./peer-actions";

const url = "http://localhost:8080";

const RoomContext = createContext<null | any>(null);

const socket = socketIO(url);

export const RoomContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [items, setItems] = useState<string[] | null>(null);
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [screenSharingId, setScreenSharingId] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const enterRoom = ({ roomId }: { roomId: string }) => {
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({ participants }: { participants: string[] }) => {
    setItems(participants);
  };
  const removeUser = (peerId: string) => {
    dispatch(removePeerAction(peerId));
  };

  const switchStream = (stream: MediaStream) => {
    setStream(stream);
    setScreenSharingId(me?.id || "");

    //  getting screen share from participants
    if (me?.connections) {
      // Check if `connections` is a `Map`
      if (me.connections instanceof Map) {
        me.connections.forEach((connectionsArray, peerId) => {
          const videoTrack = stream
            ?.getTracks()
            .find((track) => track.kind === "video");
          if (connectionsArray.length > 0) {
            connectionsArray[0].peerConnection
              .getSenders()[1]
              .replaceTrack(videoTrack)
              .catch((err: any) =>
                console.error("Error replacing track in Map:", err)
              );
          }
        });
      } else {
        // Handle as an Object (current implementation)
        Object.values(me.connections).forEach((connectionsArray: any) => {
          const videoTrack = stream
            ?.getTracks()
            .find((track) => track.kind === "video");
          if (connectionsArray.length > 0) {
            connectionsArray[0].peerConnection
              .getSenders()[1]
              .replaceTrack(videoTrack)
              .catch((err: any) =>
                console.error("Error replacing track in Object:", err)
              );
          }
        });
      }
    }
  };
  const shareScreen = () => {
    if (screenSharingId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(switchStream);
    } else navigator.mediaDevices.getDisplayMedia({}).then(switchStream);
  };

  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId); // Create a new peer instance
    setMe(peer);

    // Get media stream (audio + video)
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((mediaStream) => {
        setStream(mediaStream);
      })
      .catch((err) => console.log("Media error: ", err));

    socket.on("room-created", enterRoom);
    socket.on("get-users", getUsers);
    socket.on("user-disconnected", removeUser);

    socket.on("user-started-sharing", (peerId) => setScreenSharingId(peerId));
    socket.on("user-stop-sharing", () => setScreenSharingId(""));

    return () => {
      socket.off("room-created");
      socket.off("get-users");
      socket.off("user-disconnected");
      socket.off("user-started-sharing");
      socket.off("user-stop-sharing");
      socket.off("user-joined");
    };
  }, []);

  useEffect(() => {
    if (!me || !stream) return;

    const handleUserJoined = ({ peerId }: { peerId: string }) => {
      console.log("New user just joined with peerId:", peerId);
      const call = me.call(peerId, stream);

      call.on("stream", (peerStream) => {
        console.log("Received peer stream for:", peerId);
        dispatch(addPeerAction(peerId, peerStream));
      });
    };

    const handleIncomingCall = (call: any) => {
      call.answer(stream); // Answer the incoming call with the stream
      call.on("stream", (peerStream: MediaStream) => {
        console.log("Incoming peer stream event");
        dispatch(addPeerAction(call.peer, peerStream));
      });
    };

    socket.on("user-joined", handleUserJoined);
    me.on("call", handleIncomingCall);

    return () => {
      socket.off("user-joined", handleUserJoined);
      me.off("call", handleIncomingCall);
    };
  }, [me, stream]); // Run effect when `me` or `stream` is ready

  useEffect(() => {
    if (screenSharingId){
      socket.emit("start-sharing", { peerId: screenSharingId, roomId });
    }
    else{
      socket.emit("stop-sharing");
    }
     
  }, [screenSharingId,roomId]);

  return (
    <RoomContext.Provider
      value={{
        socket,
        me,
        items,
        stream,
        peers,
        shareScreen,
        screenSharingId,
        setRoomId,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useSocket = () => useContext(RoomContext);
