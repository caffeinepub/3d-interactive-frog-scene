import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import FrogScene from './components/FrogScene';
import SceneUI from './components/SceneUI';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-green-100">
        <Canvas
          camera={{ position: [0, 2, 8], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: false }}
        >
          <Suspense fallback={null}>
            <FrogScene />
            <OrbitControls
              enablePan={false}
              minDistance={5}
              maxDistance={15}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
        
        <SceneUI />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
