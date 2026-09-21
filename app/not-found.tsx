import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><div><h1>404</h1><p>This route is outside the system.</p><Link className="button button-primary" href="/">Return home</Link></div></main>;
}
