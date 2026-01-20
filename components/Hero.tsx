'use client'

export default function Hero() {
  return (
    <div className="pt-[70px] min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <h2 className="text-center text-[32px] font-medium text-[#333] mb-8">
          Welcome to ClaimsManager Provider Portal!
        </h2>

        {/* Add Widget Button */}
        <div className="text-right mb-4">
          <button className="px-4 py-2 bg-[#d4f1d4] text-gray-700 rounded hover:bg-[#c8ecc8] transition-colors text-sm flex items-center ml-auto">
            Add Widget... <span className="ml-1">›</span>
          </button>
        </div>

        {/* Dashboard Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Widget 1: Billed and Collected by Week */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-[#c5e9f2] border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-[15px] font-semibold text-[#333]">Billed and Collected by Week</h3>
              <button className="text-gray-500 hover:text-gray-700 text-xl leading-none font-light">×</button>
            </div>
            <div className="p-4 h-[400px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col">
                <svg className="w-full flex-1" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  <line x1="35" y1="180" x2="310" y2="180" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="35" y1="135" x2="310" y2="135" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="35" y1="90" x2="310" y2="90" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="35" y1="45" x2="310" y2="45" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Y-axis labels */}
                  <text x="5" y="185" fontSize="10" fill="#666">0</text>
                  <text x="5" y="140" fontSize="10" fill="#666">200k</text>
                  <text x="5" y="95" fontSize="10" fill="#666">400k</text>
                  <text x="5" y="50" fontSize="10" fill="#666">500k</text>
                  
                  {/* Pink fill area */}
                  <polygon
                    points="45,50 75,35 105,40 135,60 165,85 195,80 225,105 255,155 285,175 285,180 45,180"
                    fill="#fce7f3"
                    opacity="0.6"
                  />
                  
                  {/* Pink line (Collected) */}
                  <polyline
                    points="45,50 75,35 105,40 135,60 165,85 195,80 225,105 255,155 285,175"
                    fill="none"
                    stroke="#e91e8c"
                    strokeWidth="2.5"
                  />
                  
                  {/* Data points */}
                  <circle cx="45" cy="50" r="3" fill="#e91e8c" />
                  <circle cx="75" cy="35" r="3" fill="#e91e8c" />
                  <circle cx="105" cy="40" r="3" fill="#e91e8c" />
                  <circle cx="135" cy="60" r="3" fill="#e91e8c" />
                  <circle cx="165" cy="85" r="3" fill="#e91e8c" />
                  <circle cx="195" cy="80" r="3" fill="#e91e8c" />
                  <circle cx="225" cy="105" r="3" fill="#e91e8c" />
                  <circle cx="255" cy="155" r="3" fill="#e91e8c" />
                  <circle cx="285" cy="175" r="3" fill="#e91e8c" />
                  
                  {/* Green line (Billed - flat at 0) */}
                  <line x1="45" y1="180" x2="285" y2="180" stroke="#5cb85c" strokeWidth="2.5" />
                  
                  {/* Week labels */}
                  <text x="45" y="200" fontSize="9" textAnchor="middle" fill="#666" transform="rotate(45 45 200)">10/26/2025</text>
                  <text x="75" y="200" fontSize="9" textAnchor="middle" fill="#666" transform="rotate(45 75 200)">11/02/2025</text>
                  <text x="105" y="200" fontSize="9" textAnchor="middle" fill="#666" transform="rotate(45 105 200)">11/09/2025</text>
                  <text x="135" y="200" fontSize="9" textAnchor="middle" fill="#666" transform="rotate(45 135 200)">11/16/2025</text>
                  <text x="165" y="200" fontSize="9" textAnchor="middle" fill="#666" transform="rotate(45 165 200)">11/23/2025</text>
                  <text x="195" y="200" fontSize="9" textAnchor="middle" fill="#666" transform="rotate(45 195 200)">11/30/2025</text>
                  <text x="225" y="200" fontSize="9" textAnchor="middle" fill="#666" transform="rotate(45 225 200)">12/07/2025</text>
                  <text x="255" y="200" fontSize="9" textAnchor="middle" fill="#666" transform="rotate(45 255 200)">12/14/2025</text>
                </svg>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#5cb85c] mr-1.5"></span>
                    <span className="text-[11px] text-gray-700">Billed Amount</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#e91e8c] mr-1.5"></span>
                    <span className="text-[11px] text-gray-700">Billed Amount Collected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: Billed and Collected by Month */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-[#c5e9f2] border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-[15px] font-semibold text-[#333]">Billed and Collected by Month</h3>
              <button className="text-gray-500 hover:text-gray-700 text-xl leading-none font-light">×</button>
            </div>
            <div className="p-4 h-[400px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col">
                <svg className="w-full flex-1" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  <line x1="40" y1="180" x2="300" y2="180" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="135" x2="300" y2="135" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="90" x2="300" y2="90" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="45" x2="300" y2="45" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Y-axis labels */}
                  <text x="5" y="185" fontSize="10" fill="#666">0</text>
                  <text x="5" y="140" fontSize="10" fill="#666">750k</text>
                  <text x="5" y="95" fontSize="10" fill="#666">1.5M</text>
                  <text x="5" y="50" fontSize="10" fill="#666">2M</text>
                  
                  {/* Pink fill area */}
                  <polygon
                    points="60,60 105,55 150,65 195,50 240,60 285,95 285,180 60,180"
                    fill="#fce7f3"
                    opacity="0.6"
                  />
                  
                  {/* Pink line (Collected) */}
                  <polyline
                    points="60,60 105,55 150,65 195,50 240,60 285,95"
                    fill="none"
                    stroke="#e91e8c"
                    strokeWidth="2.5"
                  />
                  
                  {/* Data points */}
                  <circle cx="60" cy="60" r="3" fill="#e91e8c" />
                  <circle cx="105" cy="55" r="3" fill="#e91e8c" />
                  <circle cx="150" cy="65" r="3" fill="#e91e8c" />
                  <circle cx="195" cy="50" r="3" fill="#e91e8c" />
                  <circle cx="240" cy="60" r="3" fill="#e91e8c" />
                  <circle cx="285" cy="95" r="3" fill="#e91e8c" />
                  
                  {/* Green line (Billed - flat at 0) */}
                  <line x1="60" y1="180" x2="285" y2="180" stroke="#5cb85c" strokeWidth="2.5" />
                  
                  {/* Month labels */}
                  <text x="60" y="200" fontSize="10" textAnchor="middle" fill="#666">July</text>
                  <text x="105" y="200" fontSize="10" textAnchor="middle" fill="#666">August</text>
                  <text x="150" y="200" fontSize="10" textAnchor="middle" fill="#666">September</text>
                  <text x="195" y="200" fontSize="10" textAnchor="middle" fill="#666">October</text>
                  <text x="240" y="200" fontSize="10" textAnchor="middle" fill="#666">November</text>
                  <text x="285" y="200" fontSize="10" textAnchor="middle" fill="#666">December</text>
                </svg>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#5cb85c] mr-1.5"></span>
                    <span className="text-[11px] text-gray-700">Billed Amount</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#e91e8c] mr-1.5"></span>
                    <span className="text-[11px] text-gray-700">Billed Amount Collected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3: Denials by Month */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-[#c5e9f2] border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-[15px] font-semibold text-[#333]">Denials by Month</h3>
              <button className="text-gray-500 hover:text-gray-700 text-xl leading-none font-light">×</button>
            </div>
            <div className="p-4 h-[400px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col">
                <svg className="w-full flex-1" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  <line x1="40" y1="180" x2="300" y2="180" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="120" x2="300" y2="120" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="60" x2="300" y2="60" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Y-axis labels */}
                  <text x="20" y="185" fontSize="10" fill="#666">0</text>
                  <text x="20" y="125" fontSize="10" fill="#666">1</text>
                  <text x="20" y="65" fontSize="10" fill="#666">2</text>
                  
                  {/* Green fill area */}
                  <polygon
                    points="60,120 105,120 150,180 195,30 240,120 285,180 285,180 60,180"
                    fill="#d4edda"
                    opacity="0.6"
                  />
                  
                  {/* Green line */}
                  <polyline
                    points="60,120 105,120 150,180 195,30 240,120 285,180"
                    fill="none"
                    stroke="#5cb85c"
                    strokeWidth="2.5"
                  />
                  
                  {/* Data points */}
                  <circle cx="60" cy="120" r="3.5" fill="#5cb85c" />
                  <circle cx="105" cy="120" r="3.5" fill="#5cb85c" />
                  <circle cx="150" cy="180" r="3.5" fill="#5cb85c" />
                  <circle cx="195" cy="30" r="3.5" fill="#5cb85c" />
                  <circle cx="240" cy="120" r="3.5" fill="#5cb85c" />
                  <circle cx="285" cy="180" r="3.5" fill="#5cb85c" />
                  
                  {/* Month labels */}
                  <text x="60" y="200" fontSize="10" textAnchor="middle" fill="#666">August</text>
                  <text x="105" y="200" fontSize="10" textAnchor="middle" fill="#666">September</text>
                  <text x="150" y="200" fontSize="10" textAnchor="middle" fill="#666">October</text>
                  <text x="195" y="200" fontSize="10" textAnchor="middle" fill="#666">November</text>
                  <text x="240" y="200" fontSize="10" textAnchor="middle" fill="#666">December</text>
                  <text x="285" y="200" fontSize="10" textAnchor="middle" fill="#666">January</text>
                </svg>
                <div className="flex items-center justify-center mt-2">
                  <span className="inline-block w-3 h-3 bg-[#5cb85c] mr-1.5"></span>
                  <span className="text-[11px] text-gray-700">Denials Received</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 4: Denied Claims By Payer */}
          <div className="bg-white rounded shadow-sm border border-gray-200">
            <div className="bg-[#c5e9f2] border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-[15px] font-semibold text-[#333]">Denied Claims By Payer</h3>
              <button className="text-gray-500 hover:text-gray-700 text-xl leading-none font-light">×</button>
            </div>
            <div className="p-4 h-[400px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <svg className="w-64 h-64" viewBox="0 0 200 200">
                  {/* Full pie chart circle */}
                  <circle cx="100" cy="100" r="80" fill="#5cb85c" />
                  {/* Small white line for visual detail */}
                  <line x1="100" y1="20" x2="100" y2="100" stroke="white" strokeWidth="2" />
                </svg>
                <div className="flex items-center justify-center mt-3">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#5cb85c] mr-2"></span>
                  <span className="text-[11px] text-gray-700">NOVITAS SOLUTIONS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <hr className="my-10 border-gray-300" />
        <footer className="pb-6 text-center">
          <p className="text-[#666] text-[13px]">© 2026 - SyMed Corporation</p>
        </footer>
      </div>
    </div>
  )
}
