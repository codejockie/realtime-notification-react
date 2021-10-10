import { useMutation } from "@apollo/client"
import { useState } from "react"
import gql from "graphql-tag"
import {
  PushNotificationMutation,
  PushNotificationMutationVariables,
} from "./PushNotification.types"

const PUSH_NOTIFICATION = gql`
  mutation PushNotification($label: String!) {
    pushNotification(label: $label) {
      label
    }
  }
`

export const PushNotification = () => {
  const [pushNotificationMutation] = useMutation<
    PushNotificationMutation,
    PushNotificationMutationVariables
  >(PUSH_NOTIFICATION)
  const [notification, setNotification] = useState({ label: "" })

  const pushNotification = async () => {
    const { label } = notification
    await pushNotificationMutation({
      variables: {
        label,
      },
    })
    setNotification({ label: "" })
  }

  return (
    <div>
      <input
        value={notification.label}
        onChange={(e) => setNotification({ label: e.target.value })}
        type="text"
        placeholder="A label"
      />
      <button onClick={pushNotification}>Submit</button>
    </div>
  )
}
