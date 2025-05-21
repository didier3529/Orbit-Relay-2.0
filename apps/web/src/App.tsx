import { useState, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CreateAirdrop } from './components/CreateAirdrop'
import { ResumeAirdrop } from './components/ResumeAirdrop'
import { AirdropSelection } from './components/AirdropSelection'
import { DecompressPage } from './components/DecompressPage'
import { CostCalculator } from './components/CostCalculator'
// Import from core module (renamed from helius-airship-core)
import { init, exist, databaseFile } from 'core'
import { SQLocalDrizzle } from 'sqlocal/drizzle'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { configureDatabase } from './lib/utils'
// Import the side dropdown components
import { SideDropdown } from './components/ui/SideDropdown'
import { FAQPanel } from './components/sidepanels/FAQPanel'
import { HowItWorksPanel } from './components/sidepanels/HowItWorksPanel'

const { driver, batchDriver } = new SQLocalDrizzle({
  databasePath: databaseFile,
  verbose: false,
})

const db = drizzle(driver, batchDriver)

function App() {
  const [existingAirdrop, setExistingAirdrop] = useState<boolean | null>(null)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSidePanel, setActiveSidePanel] = useState<string | null>(null)
  const location = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function initApp() {
      try {
        await configureDatabase(db)

        // Initialize the airdrop sender
        await init({ db })

        // Check if an airdrop already exists
        const exists = await exist({ db })
        setExistingAirdrop(exists)
      } catch (error) {
        console.error('Error checking for existing airdrop:', error)
        setExistingAirdrop(false)
      }
    }
    void initApp()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false)
    
    // Close any open side panels
    setActiveSidePanel(null)
    
    // Scroll to top on route change
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0)
    }
  }, [location.pathname])

  const handleCreateAirdrop = () => {
    setSelectedAction('create')
  }

  const handleResumeAirdrop = () => {
    setSelectedAction('resume')
  }

  const handleBackToHome = () => {
    setSelectedAction(null)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Close any open side panels when toggling mobile menu
    setActiveSidePanel(null)
  }

  const handlePanelOpen = (panelName: string) => {
    setActiveSidePanel(panelName)
  }

  const handlePanelClose = () => {
    setActiveSidePanel(null)
  }

  // Close side panels if ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveSidePanel(null)
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [])

  return (
    <div className="min-h-screen flex flex-col md:items-center md:justify-center bg-deep-space overflow-hidden relative">
      {/* Star animation layers - using 4 different layers */}
      <div className="stars-layer stars-small"></div>
      <div className="stars-layer stars-medium"></div>
      <div className="stars-layer stars-large"></div>
      <div className="stars-layer stars-xlarge"></div>
      
      {/* Mobile header with menu button */}
      {isMobile && (
        <div className="sticky top-0 w-full p-4 flex justify-between items-center z-40 bg-deep-space bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
          <div className="text-white font-bold text-xl">OrbitRelay</div>
          <button 
            onClick={toggleMobileMenu}
            className="text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      )}

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 bg-deep-space bg-opacity-95 z-30 overflow-y-auto">
          <div className="p-6 pt-20 flex flex-col space-y-6 pb-32">
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg overflow-y-auto max-h-[40vh]">
              <h3 className="text-xl font-bold text-white mb-4">FAQ</h3>
              <FAQPanel />
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg overflow-y-auto max-h-[40vh]">
              <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
              <HowItWorksPanel />
            </div>
          </div>
        </div>
      )}
      
      {/* Main content container */}
      <div 
        ref={contentRef}
        className={`w-full max-w-4xl z-10 p-4 md:p-0 flex-1 overflow-auto ${
          mobileMenuOpen ? 'hidden' : 'block'
        }`}
      >
        <Routes>
          <Route path="/decompress" element={<DecompressPage />} />
          <Route path="/calculator" element={<CostCalculator />} />
          <Route
            path="/"
            element={
              selectedAction === 'create' ? (
                <CreateAirdrop db={db} onBackToHome={handleBackToHome} />
              ) : selectedAction === 'resume' ? (
                <ResumeAirdrop db={db} onBackToHome={handleBackToHome} />
              ) : (
                <AirdropSelection
                  existingAirdrop={existingAirdrop}
                  onCreateAirdrop={handleCreateAirdrop}
                  onResumeAirdrop={handleResumeAirdrop}
                />
              )
            }
          />
        </Routes>
      </div>
      
      {/* Side Dropdowns for desktop - conditionally render based on activeSidePanel state */}
      {!isMobile && (
        <>
          <SideDropdown 
            title="FAQ" 
            position="left"
            className={activeSidePanel === 'HowItWorks' ? 'pointer-events-none' : ''}
          >
            <FAQPanel />
          </SideDropdown>
          
          <SideDropdown 
            title="How It Works" 
            position="right"
            className={activeSidePanel === 'FAQ' ? 'pointer-events-none' : ''}
          >
            <HowItWorksPanel />
          </SideDropdown>
        </>
      )}

      {/* Twitter/X button - fixed at bottom but with proper z-index */}
      <a 
        href="https://twitter.com/orbitrelay" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 
                   flex items-center justify-center w-12 h-12 rounded-full 
                   bg-black border border-gray-700 hover:border-[#64ffda] 
                   transition-all duration-300 ${mobileMenuOpen ? 'hidden' : 'block'}`}
        aria-label="Follow us on Twitter/X"
      >
        <svg 
          className="w-5 h-5 text-white" 
          aria-hidden="true" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
      </a>
    </div>
  )
}

export default App