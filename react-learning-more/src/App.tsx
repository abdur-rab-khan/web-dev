import MarkdownEditor from './components/code-splitting/Example-1/MarkdownEditor'
import ArtistPage from './components/code-splitting/Example-2/ArtistPage'

interface FullScreenProps {
  children: React.ReactNode
}

const FullScreen: React.FC<FullScreenProps> = ({ children }) => {
  return (
    <main className='h-screen w-screen flex justify-center items-center'>
      {children}
    </main>
  )
}

function App() {

  return (
    <FullScreen>
      {/* Code-Splitting by Lazy-Load */}
      {/* <MarkdownEditor /> */}

      <ArtistPage />
    </FullScreen>
  )
}

export default App

