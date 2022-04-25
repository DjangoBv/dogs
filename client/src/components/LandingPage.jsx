import { Link } from "react-router-dom"

export function LandingPage() {
  return (
    <div className="">
      <h1>Bienvenidos</h1>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  )
}
