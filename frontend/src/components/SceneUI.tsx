import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Play, Pause } from 'lucide-react';
import { useSceneStore } from '../lib/sceneStore';
import { toast } from 'sonner';

export default function SceneUI() {
  const { isPlaying, togglePlay, resetAnimation } = useSceneStore();

  const handleReset = () => {
    resetAnimation();
    toast.success('Scene reloaded!', {
      duration: 1500,
    });
  };

  return (
    <>
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              🐸 Frog's Great Escape
            </h1>
            <p className="text-sm text-white/90 drop-shadow">
              Watch the frog jump out of the window!
            </p>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <Card className="bg-white/95 backdrop-blur shadow-xl border-2 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Button
                onClick={togglePlay}
                variant="default"
                size="lg"
                className="gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-5 w-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Play
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <RotateCcw className="h-5 w-5" />
                Reload Scene
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="absolute top-24 right-4 z-10">
        <Card className="bg-white/90 backdrop-blur shadow-lg max-w-xs">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2">🎮 Controls</h3>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Drag to rotate the camera</li>
              <li>• Scroll to zoom in/out</li>
              <li>• Click buttons to control animation</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-4 z-10">
        <p className="text-xs text-white/80 drop-shadow">
          © 2025. Built with love using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </>
  );
}
