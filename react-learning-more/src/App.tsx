import { useState } from 'react'
import Use from './components/apis/use/Use'
import ThemeContext from './contexts/Contexts'

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
  const [theme, setTheme] = useState<"light" | "dark">('light');

  return (
    <ThemeContext value={{ theme: theme, setTheme }}>
      <FullScreen>
        {/* Code-Splitting by Lazy-Load */}
        {/* <MarkdownEditor /> */}

        {/* Showing all artist albums */}
        {/* <ArtistPage /> */}

        {/* Implementation of use */}
        <Use />
      </FullScreen>
    </ThemeContext>
  )
}

export default App

