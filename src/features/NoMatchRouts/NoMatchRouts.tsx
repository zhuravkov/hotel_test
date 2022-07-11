import { Link } from "react-router-dom"

export const NoMatchRouts = () => {
  return (
    <div>
      <div>Page not found </div>
      <Link to="/">HomePage</Link>
    </div>
  )
}