'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isReportsOpen, setIsReportsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#01B2D6] shadow-md">
      <div className="container-fluid px-3">
        <div className="flex items-center justify-between h-[70px]">
          {/* Brand/Logo - Left Side */}
          <a href="/" className="flex items-center text-white hover:opacity-90 transition-opacity">
            <Image 
              src="/cosentus_lion.png" 
              alt="Cosentus Logo" 
              width={48} 
              height={48}
              className="w-12 h-12 object-contain"
            />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white p-2 hover:bg-white/10 rounded order-first mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-1.5">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0.5 flex-1 ml-3">
            <a href="/caselogs" className="px-2.5 py-3 text-white hover:bg-white/10 transition-colors text-[19px] font-normal">
              Case Logs
            </a>
            
            {/* Reports Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsReportsOpen(!isReportsOpen)}
                className="px-2.5 py-3 text-white hover:bg-white/10 transition-colors text-[19px] font-normal flex items-center"
              >
                Reports
                <svg className="ml-1.5 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isReportsOpen && (
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-md shadow-lg py-1 z-50">
                  <a href="/reports/adjustments" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Adjustments Listing</a>
                  <a href="/reports/ar-detail" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">AR Detail</a>
                  <a href="/reports/ar-summary" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">AR Summary</a>
                  <a href="/reports/billing-outcomes" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Billing Outcomes</a>
                  <a href="/reports/cash-receipts" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Cash Receipts</a>
                  <a href="/reports/patient-ledger" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Patient Ledger</a>
                </div>
              )}
            </div>

            <a href="/accounts" className="px-2.5 py-3 text-white hover:bg-white/10 transition-colors text-[19px] font-normal">
              User Accounts
            </a>
          </div>

          {/* Right side - Client & User */}
          <div className="hidden md:flex items-center space-x-0.5">
            <a href="/switch-client" className="px-2.5 py-3 text-white hover:bg-white/10 transition-colors text-[19px] font-normal">
              DEMO ANESTHESIA
            </a>
            <a href="/logout" className="px-2.5 py-3 text-white hover:bg-white/10 transition-colors text-[19px] font-normal">
              Log Out
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <a href="/caselogs" className="px-4 py-3 text-white hover:bg-white/10 transition-colors text-base font-light">
                Case Logs
              </a>
              <a href="/reports" className="px-4 py-3 text-white hover:bg-white/10 transition-colors text-base font-light">
                Reports
              </a>
              <a href="/accounts" className="px-4 py-3 text-white hover:bg-white/10 transition-colors text-base font-light">
                User Accounts
              </a>
              <div className="border-t border-white/20 my-2"></div>
              <a href="/switch-client" className="px-4 py-3 text-white hover:bg-white/10 transition-colors text-base font-light">
                DEMO ANESTHESIA
              </a>
              <a href="/logout" className="px-4 py-3 text-white hover:bg-white/10 transition-colors text-base font-light">
                Log Out
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
