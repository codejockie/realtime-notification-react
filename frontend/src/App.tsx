import { gql, useSubscription } from "@apollo/client"
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from "react"
import "react-toastify/dist/ReactToastify.css"

import "./App.css"
import { PushNotification } from "./components/PushNotification/PushNotification"
import { NewNotificationSubscription } from "./App.types"

const NEW_NOTIFICATION_SUBSCRIPTION = gql`
  subscription NewNotification {
    newNotification {
      label
    }
  }
`

function App() {
  const { data, loading } = useSubscription<NewNotificationSubscription>(
    NEW_NOTIFICATION_SUBSCRIPTION
  )

  useEffect(() => {
    toast(data?.newNotification?.label)
  }, [data])

  return (
    <div className="App">
      <PushNotification />
      <ToastContainer />
    </div>
  )
}

export default App
