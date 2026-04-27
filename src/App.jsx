import { useState, useEffect } from "react"
import { AlmaForm } from "./components/AlmaForm.jsx"
import { Nav } from "../src/components/nav.jsx"
import { LogsView } from "./components/LogsView.jsx"

export const App = () => {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  if (hash === "#logs") return <LogsView />

  return (
    <main className="w-100 mb-5">
      <Nav />
      <AlmaForm />
    </main>
  )
}
