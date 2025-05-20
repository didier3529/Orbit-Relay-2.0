import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import { databaseFile } from 'core'
import { SQLocalDrizzle } from 'sqlocal/drizzle'
import { useNavigate, Link } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

interface AirdropSelectionProps {
  existingAirdrop: boolean | null
  onCreateAirdrop: () => void
  onResumeAirdrop: () => void
}

export function AirdropSelection({ existingAirdrop, onCreateAirdrop, onResumeAirdrop }: AirdropSelectionProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [showDownloadButton, setShowDownloadButton] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === '0') {
        setShowDownloadButton((prev) => !prev) // Toggle the state
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleCreateAirdrop = () => {
    if (existingAirdrop) {
      setShowDialog(true)
    } else {
      onCreateAirdrop()
    }
  }

  const handleConfirmCreate = () => {
    setShowDialog(false)
    onCreateAirdrop()
  }

  const downloadDB = async () => {
    const { getDatabaseFile } = new SQLocalDrizzle({
      databasePath: databaseFile,
    })

    const databaseUrl = await getDatabaseFile()
    const fileUrl = URL.createObjectURL(databaseUrl)

    const a = document.createElement('a')
    a.href = fileUrl
    a.download = `orbitrelay-${new Date().toJSON().slice(0, 10)}.db`
    a.click()
    a.remove()

    URL.revokeObjectURL(fileUrl)
  }

  return (
    <main className="flex flex-col items-center justify-center py-8 px-4">
      <Header />
      
      {existingAirdrop === null ? (
        <div className="flex justify-center items-center h-40 w-full">
          <Loader2 className="h-12 w-12 animate-spin text-[#64ffda]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
          {/* Token Launch Card */}
          <div 
            className="orbit-card rounded-lg p-6 flex flex-col h-[220px] cursor-pointer"
            onClick={handleCreateAirdrop}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-[#64ffda] bg-[rgba(100,255,218,0.1)] p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="orbit-icon">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#64ffda]">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2 text-white font-['Orbitron']">New Distribution</h2>
            <p className="text-gray-300 text-sm flex-grow">Initialize new token distribution</p>
          </div>

          {/* Token Metrics Card */}
          <div 
            className="orbit-card rounded-lg p-6 flex flex-col h-[220px] cursor-pointer"
            onClick={() => navigate('/decompress')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-[#64ffda] bg-[rgba(100,255,218,0.1)] p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="orbit-icon">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <line x1="3" x2="21" y1="9" y2="9"></line>
                  <line x1="3" x2="21" y1="15" y2="15"></line>
                  <line x1="9" x2="9" y1="3" y2="21"></line>
                  <line x1="15" x2="15" y1="3" y2="21"></line>
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#64ffda]">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2 text-white font-['Orbitron']">Token Analytics</h2>
            <p className="text-gray-300 text-sm flex-grow">Analyze compressed token data</p>
          </div>

          {/* Distribution Tools Card */}
          <div 
            className="orbit-card rounded-lg p-6 flex flex-col h-[220px] cursor-pointer"
            onClick={() => navigate('/calculator')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-[#64ffda] bg-[rgba(100,255,218,0.1)] p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="orbit-icon">
                  <path d="M5 5C5 4.07953 5.74619 3.33333 6.66667 3.33333H17.3333C18.2538 3.33333 19 4.07953 19 5V19C19 19.9205 18.2538 20.6667 17.3333 20.6667H6.66667C5.74619 20.6667 5 19.9205 5 19V5Z"></path>
                  <path d="M8.33333 8.33333H15.6667"></path>
                  <path d="M8.33333 11.6667H15.6667"></path>
                  <path d="M8.33333 15H12"></path>
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#64ffda]">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2 text-white font-['Orbitron']">Distribution Tools</h2>
            <p className="text-gray-300 text-sm flex-grow">Calculate airdrop parameters</p>
          </div>
        </div>
      )}

      {existingAirdrop && (
        <div className="mt-6">
          <Button 
            onClick={onResumeAirdrop}
          >
            Resume Existing Distribution
          </Button>
        </div>
      )}

      {showDownloadButton && (
        <div className="mt-4">
          <Button 
            variant="outline"
            className="text-[#64ffda] border-[#64ffda] hover:bg-[rgba(100,255,218,0.1)]" 
            onClick={downloadDB}
          >
            Download Database
          </Button>
        </div>
      )}
      
      <Footer />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="orbit-card border-[#64ffda] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-['Orbitron'] text-white">Overwrite Existing Distribution?</DialogTitle>
            <DialogDescription className="text-gray-300">
              An existing distribution was detected. Are you sure you want to create a new distribution? This action will
              overwrite the current distribution.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="text-[#64ffda] border-[#64ffda] hover:bg-[rgba(100,255,218,0.1)]" 
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmCreate}
            >
              Confirm and Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
