import * as Types from './types';

import gql from 'graphql-tag';
export type NotificationSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type NotificationSubscription = { __typename?: 'Subscription', newNotification?: { __typename?: 'Notification', label?: string | null | undefined } | null | undefined };


export const Notification = gql`
    subscription Notification {
  newNotification {
    label
  }
}
    `;