export interface Notification {
    id: number;
    content: string;
    title: string;
    notification_type: string;
    url: string;
    icon: string;
    created_at: string;
    user_read: boolean;
}
