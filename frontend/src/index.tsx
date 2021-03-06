import React from "react"
import ReactDOM from "react-dom"
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/client/link/ws"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
})

const wsLink = new WebSocketLink({
  uri: "ws://localhost:5000/subscriptions",
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
