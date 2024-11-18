import { ADD_PEER, REMOVE_PEER } from "./peer-actions";

export type PeerState = Record<string, { stream: MediaStream }>;

type PeerAction =
  | {
      type: typeof ADD_PEER;
      payload: { peerId: string; stream: MediaStream };
    }
  | {
      type: typeof REMOVE_PEER;
      payload: { peerId: string };
    };

export const peersReducer = (state: PeerState, action: PeerAction) => {
  switch (action.type) {
    case ADD_PEER:
        console.log('add peer is triggered.')
      return {
        ...state,
        [action.payload.peerId]: { stream: action.payload.stream },
      };
    case REMOVE_PEER:
        console.log('remove peer is triggered.')
      const { [action.payload.peerId]: deleted, ...rest } = state;
      return rest;
    default:
        console.log('default')
      return { ...state };
  }
};
