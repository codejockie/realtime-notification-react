import * as Types from '../../types';

export type PushNotificationMutationVariables = Types.Exact<{
  label: Types.Scalars['String'];
}>;


export type PushNotificationMutation = { __typename?: 'Mutation', pushNotification?: { __typename?: 'Notification', label?: string | null | undefined } | null | undefined };
