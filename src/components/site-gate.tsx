import { useEffect, useState, type FormEvent, type ReactNode } from "react"

const KEY = "7cloud-storm-gate"
const PASS = "b644688e8adb3c824513c17ba543d890bec5dd4e331809bd808065310a098cf4"

async function digest(user: string, password: string) {
  const bytes = new TextEncoder().encode(`${user.trim()}\n${password}`)
  const buf = await crypto.subtle.digest("SHA-256", bytes)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

export function SiteGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setOpen(sessionStorage.getItem(KEY) === "1")
    setReady(true)
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const hash = await digest(String(data.get("user") || ""), String(data.get("password") || ""))
    if (hash !== PASS) {
      setError("That username or password is not right.")
      return
    }
    sessionStorage.setItem(KEY, "1")
    setError("")
    setOpen(true)
  }

  if (!ready) return null
  if (open) return children

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-card border border-line bg-panel p-6 shadow-sm">
        <p className="text-xs font-extrabold tracking-normal text-brass uppercase">7 Cloud Engineering</p>
        <h1 className="mt-2 text-2xl font-extrabold">Storm design</h1>
        <p className="mt-2 text-sm text-muted">Sign in to open this reference.</p>
        <label className="mt-5 block text-sm font-bold">
          Username
          <input name="user" autoComplete="username" required className="mt-1 w-full rounded-card border border-line bg-white px-3 py-2 font-normal" />
        </label>
        <label className="mt-3 block text-sm font-bold">
          Password
          <input name="password" type="password" autoComplete="current-password" required className="mt-1 w-full rounded-card border border-line bg-white px-3 py-2 font-normal" />
        </label>
        {error ? <p className="mt-3 text-sm text-alert">{error}</p> : null}
        <button type="submit" className="mt-5 w-full rounded-card bg-pine px-4 py-2.5 text-sm font-bold text-white">
          Sign in
        </button>
      </form>
    </main>
  )
}
