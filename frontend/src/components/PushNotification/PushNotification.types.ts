import * as Types from '../../types';

import gql from 'graphql-tag';
export type PushNotificationMutationMutationVariables = Types.Exact<{
  label: Types.Scalars['String'];
}>;


export type PushNotificationMutationMutation = { __typename?: 'Mutation', pushNotification?: { __typename?: 'Notification', label?: string | null | undefined } | null | undefined };


export const PushNotificationMutation = gql`
    mutation PushNotificationMutation($label: String!) {
  pushNotification(label: $label) {
    label
  }
}
    `;