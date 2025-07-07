import { Link } from '@tanstack/react-router'

export function AboutPage() {
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h1 className="text-3xl font-bold mb-4">About Beans App</h1>
      <p className="mb-4">
        This app displays data from a public Google Sheet with live filtering Built with React and TanStack Router.
      </p>
      <p className="mb-4">
        <b>Features:</b>
        <ul className="list-disc ml-6">
          <li>Live data from Google Sheets</li>
          <li>Modern, responsive UI</li>
          <li>Filter and search functionality</li>
          <li>Powered by React, Tailwind, DaisyUI, and TanStack Router</li>
        </ul>
      </p>
      <Link to="/" className="btn btn-primary mt-4">Back to Home</Link>
    </div>
  )
} 