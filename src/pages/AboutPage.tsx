import { Link } from '@tanstack/react-router'

export function AboutPage() {
  return (
    <div className="card bg-base-100 shadow-xl p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">About the r/espresso Coffee Bean Database</h1>
      
      <div className="mb-6">
        <p className="mb-4 text-sm sm:text-base">
          Welcome to the r/espresso Coffee Bean Database—a community-driven platform where coffee enthusiasts share their favorite beans and brewing recipes. This resource was created to address the common questions we see on r/espresso about coffee bean recommendations and brewing parameters.
        </p>
        
        <p className="mb-4 text-sm sm:text-base">
          Whether you're a newcomer to espresso or a seasoned home barista, this database provides a collaborative knowledge base to discover new coffees and get inspiration for your brewing journey.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">How it works:</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm sm:text-base">1. Submit your brews</h3>
            <p className="text-xs sm:text-sm text-base-content/70 ml-2 sm:ml-4">
              Share your favorite coffees and brewing parameters using our Google Form. The form collects:
            </p>
            <ul className="list-disc ml-4 sm:ml-8 text-xs sm:text-sm text-base-content/70 mt-1">
              <li>Basic details about the beans (roaster, roast date, etc.)</li>
              <li>Your brewing recipe (dose, yield, shot time)</li>
              <li>Equipment used</li>
            </ul>
            <p className="text-xs sm:text-sm text-base-content/70 ml-2 sm:ml-4 mt-1">
              No Google account required and no personal information is collected.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm sm:text-base">2. Explore the database</h3>
            <p className="text-xs sm:text-sm text-base-content/70 ml-2 sm:ml-4">
              View all submissions in our publicly accessible Google Sheet. Use filters (e.g., Roaster's country, Cost-per-unit-weight) by selecting Data &gt; Create filter view in the toolbar.
            </p>
            <p className="text-xs sm:text-sm text-base-content/70 ml-2 sm:ml-4 mt-1">
              <strong>Note:</strong> The spreadsheet is view-only and updates automatically with new submissions. For the best experience, view on a desktop browser.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">Our goal:</h2>
        <p className="mb-4 text-sm sm:text-base">
          We hope this grows into an invaluable resource for the coffee community—a way to share your favourite coffees and provide others with a reference point to kickstart their brews. This is your chance to contribute to (and benefit from) a collaborative coffee knowledge base!
        </p>
      </div>

      <div className="mb-6 p-3 sm:p-4 bg-base-200 rounded-lg">
        <h2 className="text-base sm:text-lg font-semibold mb-2">Features:</h2>
        <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-xs sm:text-sm">
          <li>Live data from Google Sheets</li>
          <li>Modern, responsive UI</li>
          <li>Filter and search functionality</li>
          <li>Community-driven coffee recommendations</li>
          <li>Brewing recipe database</li>
          <li>Powered by React, Tailwind, DaisyUI, and TanStack Router</li>
        </ul>
      </div>

      <div className="text-xs sm:text-sm text-base-content/70 mb-4">
        <p>
          <strong>Credit:</strong> This database was originally created by LuckyBahamut and the r/espresso mod team. 
          For the original Google Sheet and Reddit post, please visit the{' '}
          <a 
            href="https://www.reddit.com/r/espresso/comments/1i17bed/introducing_the_respresso_coffee_bean_database_a/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link link-primary"
          >
            original r/espresso post
          </a>{' '}
          and the{' '}
          <a 
            href="https://docs.google.com/spreadsheets/d/1dUpWjrkeTVPtIuSVmvjXrt7zq-E_wYg-0e9JMl_glNA/edit?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link link-primary"
          >
            Google Sheet database
          </a>.
        </p>
      </div>

      <Link to="/" className="btn btn-primary mt-4 w-full sm:w-auto">Back to Home</Link>
    </div>
  )
} 