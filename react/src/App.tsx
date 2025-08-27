import { useState } from 'react'
import Use from './components/apis/use/Use'
import ThemeContext from './contexts/Contexts'
import Example1 from './components/hooks/useTransition/examples/Example1'
import Example2 from './components/hooks/useTransition/examples/Example2'

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
        {/* <Use /> */}

        {/* Implementing useTransition */}
        {/* <Example1 /> */}
        <Example2 />
      </FullScreen>
    </ThemeContext>
  )
}

export default App

