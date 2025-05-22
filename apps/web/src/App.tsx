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
    <div className="min-h-screen flex flex-col md:flex-row bg-deep-space overflow-hidden relative">
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
      
      {/* Side Dropdowns for desktop - conditionally render based on activeSidePanel state */}
      {!isMobile && (
        <div className="fixed left-0 top-1/4 z-30">
          <SideDropdown 
            title="FAQ" 
            position="left"
            className={activeSidePanel === 'HowItWorks' ? 'pointer-events-none' : ''}
          >
            <FAQPanel />
          </SideDropdown>
        </div>
      )}
      
      {/* Main content container - absolutely centered */}
      <div 
        ref={contentRef}
        className={`w-full flex-1 z-10 flex flex-col items-center justify-center ${
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
      
      {/* Side Dropdowns for desktop - right side */}
      {!isMobile && (
        <div className="fixed right-0 top-1/4 z-30">
          <SideDropdown 
            title="How It Works" 
            position="right"
            className={activeSidePanel === 'FAQ' ? 'pointer-events-none' : ''}
          >
            <HowItWorksPanel />
          </SideDropdown>
        </div>
      )}
    </div>
  )
}

export default App