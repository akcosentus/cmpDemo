'use client'

export default function Hero() {
  return (
    <div className="pt-[70px] min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Header */}
        <h2 className="text-center text-3xl font-normal text-gray-800 mb-6">
          Welcome to ClaimsManager Provider Portal!
        </h2>

        {/* Add Widget Button */}
        <div className="text-right mb-4">
          <button className="px-4 py-2 bg-[#01B2D6] text-white rounded hover:bg-[#019bb8] transition-colors text-sm">
            Add Widget...
          </button>
        </div>

        {/* Dashboard Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Widget 1: Month-to-Date Revenue */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800">Month-to-Date Revenue (Top Payers)</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full inline-block mb-2"></div>
                <p className="text-gray-500 text-sm">No Data Found!</p>
              </div>
            </div>
          </div>

          {/* Widget 2: Year-to-Date Revenue */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800">Year-to-Date Revenue (Top Payers)</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full inline-block mb-2"></div>
                <p className="text-gray-500 text-sm">No Data Found!</p>
              </div>
            </div>
          </div>

          {/* Widget 3: Claims Awaiting Billing */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800">Claims Awaiting Billing by Receiver</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full inline-block mb-2"></div>
                <p className="text-gray-500 text-sm">No Data Found!</p>
              </div>
            </div>
          </div>

          {/* Widget 4: Denials by Month */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800">Denials by Month</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-full h-64" viewBox="0 0 300 200">
                  {/* Simple line chart representation */}
                  <polyline
                    points="20,100 70,100 120,150 170,80 220,100 270,150"
                    fill="none"
                    stroke="#5cb85c"
                    strokeWidth="2"
                  />
                  {/* Data points */}
                  <circle cx="20" cy="100" r="3" fill="#5cb85c" />
                  <circle cx="70" cy="100" r="3" fill="#5cb85c" />
                  <circle cx="120" cy="150" r="3" fill="#5cb85c" />
                  <circle cx="170" cy="80" r="3" fill="#5cb85c" />
                  <circle cx="220" cy="100" r="3" fill="#5cb85c" />
                  <circle cx="270" cy="150" r="3" fill="#5cb85c" />
                  
                  {/* Month labels */}
                  <text x="20" y="190" fontSize="10" textAnchor="middle" fill="#666">Aug</text>
                  <text x="70" y="190" fontSize="10" textAnchor="middle" fill="#666">Sep</text>
                  <text x="120" y="190" fontSize="10" textAnchor="middle" fill="#666">Oct</text>
                  <text x="170" y="190" fontSize="10" textAnchor="middle" fill="#666">Nov</text>
                  <text x="220" y="190" fontSize="10" textAnchor="middle" fill="#666">Dec</text>
                  <text x="270" y="190" fontSize="10" textAnchor="middle" fill="#666">Jan</text>
                </svg>
                <div className="flex items-center justify-center mt-2">
                  <span className="inline-block w-3 h-3 bg-[#5cb85c] mr-2"></span>
                  <span className="text-xs text-gray-600">Denials Received</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <hr className="my-8 border-gray-300" />
        <footer className="pb-6">
          <p className="text-gray-600 text-sm">© 2026 - SyMed Corporation</p>
        </footer>
      </div>
    </div>
  )
}
