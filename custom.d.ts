export {};
declare global {
    namespace Express {
        interface Request {
            me?: {
                id: number;
                username: string;
                password: string;
                name: string | null;
                region: string | null;
                interests: string | null;
                gender: string;
                about_me: string | null;
                status_message: string | null;
                profile: string | null;
            } | null;
        }
    }
}