import { useMutation } from "@apollo/client"
import { useState } from "react"
import gql from "graphql-tag"

const POST_MUTATION = gql`
  mutation PushNotificationMutation($label: String!) {
    pushNotification(label: $label) {
      label
    }
  }
`

export const PushNotification = () => {
  const [pushNotificationMutation] = useMutation(POST_MUTATION)
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
