export type MessageInsideT = {
  message: string, date: string, time: string}

export interface MessageI {
    username: string;
    email: string;
    title: string;
    description: string;
    limit: string;
    link: string;
  messageBox: {}[]
}

export interface AddMessageBodyI {
  username: string;
  link: string;
  message: string;
  date: string;
  time: string;
}