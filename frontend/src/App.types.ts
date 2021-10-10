import * as Types from './types';

export type NewNotificationSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type NewNotificationSubscription = { __typename?: 'Subscription', newNotification?: { __typename?: 'Notification', label?: string | null | undefined } | null | undefined };
