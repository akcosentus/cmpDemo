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
          {/* Widget 1: Billed and Collected by Week */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800">Billed and Collected by Week</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="w-full">
                <svg className="w-full h-56" viewBox="0 0 300 180">
                  {/* Grid lines */}
                  <line x1="30" y1="140" x2="280" y2="140" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="30" y1="105" x2="280" y2="105" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="30" y1="70" x2="280" y2="70" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="30" y1="35" x2="280" y2="35" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Billed Amount Collected line (pink/magenta) */}
                  <polyline
                    points="40,30 75,20 110,25 145,40 180,60 215,55 250,75 280,120"
                    fill="none"
                    stroke="hsl(324, 60%, 50%)"
                    strokeWidth="2"
                  />
                  
                  {/* Week labels */}
                  <text x="40" y="160" fontSize="8" textAnchor="middle" fill="#666">10/26</text>
                  <text x="75" y="160" fontSize="8" textAnchor="middle" fill="#666">11/02</text>
                  <text x="110" y="160" fontSize="8" textAnchor="middle" fill="#666">11/09</text>
                  <text x="145" y="160" fontSize="8" textAnchor="middle" fill="#666">11/16</text>
                  <text x="180" y="160" fontSize="8" textAnchor="middle" fill="#666">11/23</text>
                  <text x="215" y="160" fontSize="8" textAnchor="middle" fill="#666">11/30</text>
                  <text x="250" y="160" fontSize="8" textAnchor="middle" fill="#666">12/07</text>
                  <text x="280" y="160" fontSize="8" textAnchor="middle" fill="#666">12/14</text>
                </svg>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[hsl(144,60%,50%)] mr-1"></span>
                    <span className="text-xs text-gray-600">Billed Amount</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[hsl(324,60%,50%)] mr-1"></span>
                    <span className="text-xs text-gray-600">Collected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: Billed and Collected by Month */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800">Billed and Collected by Month</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="w-full">
                <svg className="w-full h-56" viewBox="0 0 300 180">
                  {/* Grid lines */}
                  <line x1="30" y1="140" x2="280" y2="140" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="30" y1="105" x2="280" y2="105" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="30" y1="70" x2="280" y2="70" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="30" y1="35" x2="280" y2="35" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Collected line (pink/magenta) */}
                  <polyline
                    points="50,50 90,45 130,55 170,40 210,50 250,80"
                    fill="none"
                    stroke="hsl(324, 60%, 50%)"
                    strokeWidth="2"
                  />
                  
                  {/* Month labels */}
                  <text x="50" y="160" fontSize="9" textAnchor="middle" fill="#666">July</text>
                  <text x="90" y="160" fontSize="9" textAnchor="middle" fill="#666">Aug</text>
                  <text x="130" y="160" fontSize="9" textAnchor="middle" fill="#666">Sep</text>
                  <text x="170" y="160" fontSize="9" textAnchor="middle" fill="#666">Oct</text>
                  <text x="210" y="160" fontSize="9" textAnchor="middle" fill="#666">Nov</text>
                  <text x="250" y="160" fontSize="9" textAnchor="middle" fill="#666">Dec</text>
                </svg>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[hsl(144,60%,50%)] mr-1"></span>
                    <span className="text-xs text-gray-600">Billed Amount</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[hsl(324,60%,50%)] mr-1"></span>
                    <span className="text-xs text-gray-600">Collected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3: Denials by Month */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800">Denials by Month</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="w-full">
                <svg className="w-full h-56" viewBox="0 0 300 180">
                  {/* Grid lines */}
                  <line x1="30" y1="140" x2="280" y2="140" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="30" y1="105" x2="280" y2="105" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="30" y1="70" x2="280" y2="70" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="30" y1="35" x2="280" y2="35" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Denials line */}
                  <polyline
                    points="50,100 90,100 130,140 170,60 210,100 250,140"
                    fill="none"
                    stroke="hsl(144, 60%, 50%)"
                    strokeWidth="2"
                  />
                  {/* Data points */}
                  <circle cx="50" cy="100" r="3" fill="hsl(144, 60%, 50%)" />
                  <circle cx="90" cy="100" r="3" fill="hsl(144, 60%, 50%)" />
                  <circle cx="130" cy="140" r="3" fill="hsl(144, 60%, 50%)" />
                  <circle cx="170" cy="60" r="3" fill="hsl(144, 60%, 50%)" />
                  <circle cx="210" cy="100" r="3" fill="hsl(144, 60%, 50%)" />
                  <circle cx="250" cy="140" r="3" fill="hsl(144, 60%, 50%)" />
                  
                  {/* Month labels */}
                  <text x="50" y="160" fontSize="9" textAnchor="middle" fill="#666">Aug</text>
                  <text x="90" y="160" fontSize="9" textAnchor="middle" fill="#666">Sep</text>
                  <text x="130" y="160" fontSize="9" textAnchor="middle" fill="#666">Oct</text>
                  <text x="170" y="160" fontSize="9" textAnchor="middle" fill="#666">Nov</text>
                  <text x="210" y="160" fontSize="9" textAnchor="middle" fill="#666">Dec</text>
                  <text x="250" y="160" fontSize="9" textAnchor="middle" fill="#666">Jan</text>
                </svg>
                <div className="flex items-center justify-center mt-2">
                  <span className="inline-block w-3 h-3 bg-[hsl(144,60%,50%)] mr-2"></span>
                  <span className="text-xs text-gray-600">Denials Received</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 4: Denied Claims By Payer */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800">Denied Claims By Payer</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="w-full text-center">
                <svg className="w-full h-56" viewBox="0 0 200 200">
                  {/* Pie chart circle */}
                  <circle cx="100" cy="100" r="70" fill="hsl(144, 40%, 50%)" />
                  {/* Center hole for donut effect */}
                  <circle cx="100" cy="100" r="45" fill="white" />
                </svg>
                <div className="flex items-center justify-center mt-2">
                  <span className="inline-block w-3 h-3 bg-[hsl(144,40%,50%)] mr-2"></span>
                  <span className="text-xs text-gray-600">NOVITAS SOLUTIONS</span>
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
