export interface IMessage {
    text: string;
    createdAt: Date;
    isMyMessage: "you" | "other";
    user: {
        email: string;
        name: string;
    };
}