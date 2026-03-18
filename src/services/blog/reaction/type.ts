export interface ReactionResponse {
  status: string;
  code: number;
  data: IReaction[];
  message: string;
}

export interface IReaction {
  id: number;
  type: string;
  emoji: string;
}

export type ICreateReaction = {
  entry_id: number;
  reaction_id: number;
  metadata: ICreateReactionMetaData;
};

export type ICreateReactionMetaData = {
  user_id: number | string;
  first_name: string;
  last_name: string;
  avatar: string;
};
