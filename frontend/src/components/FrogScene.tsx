import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '../lib/sceneStore';

// Glasses component for Stitch - two round lens frames + nose bridge
function StitchGlasses() {
  return (
    <group position={[0, 0.18, 0.05]}>
      {/* Left lens frame */}
      <mesh position={[-0.22, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.14, 0.025, 12, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Left lens tinted glass */}
      <mesh position={[-0.22, 0, 0.01]}>
        <circleGeometry args={[0.115, 32]} />
        <meshStandardMaterial color="#4a90d9" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Right lens frame */}
      <mesh position={[0.22, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.14, 0.025, 12, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Right lens tinted glass */}
      <mesh position={[0.22, 0, 0.01]}>
        <circleGeometry args={[0.115, 32]} />
        <meshStandardMaterial color="#4a90d9" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Nose bridge */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Left temple arm */}
      <mesh position={[-0.36, 0, -0.04]} rotation={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Right temple arm */}
      <mesh position={[0.36, 0, -0.04]} rotation={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

interface ChainLink {
  x: number;
  y: number;
  rotZ: number;
  angle: number;
}

// Necklace component for Stitch - gold chain around neck with a star pendant
function StitchNecklace() {
  // Gold material shared across chain and pendant
  const goldColor = "#ffd700";
  const goldMetal = 0.85;
  const goldRough = 0.2;

  // Build chain links as small tori arranged in a ring around the neck
  const chainLinks = useMemo<ChainLink[]>(() => {
    const links: ChainLink[] = [];
    const count = 18;
    const radius = 0.28; // neck radius
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.35; // flatten vertically for neck oval
      // Alternate link rotation for chain look
      const rotZ = (i % 2 === 0) ? 0 : Math.PI / 2;
      links.push({ x, y, rotZ, angle });
    }
    return links;
  }, []);

  return (
    // Position at Stitch's neck — slightly below the face, in front of body
    <group position={[0, -0.28, 0.06]}>
      {/* Chain ring — torus tilted to lie around the neck */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.022, 10, 40]} />
        <meshStandardMaterial color={goldColor} metalness={goldMetal} roughness={goldRough} />
      </mesh>

      {/* Individual chain links for detail */}
      {chainLinks.map((link, i) => (
        <mesh
          key={i}
          position={[link.x, link.y, 0]}
          rotation={[Math.PI / 2, link.rotZ, link.angle]}
        >
          <torusGeometry args={[0.028, 0.009, 6, 12]} />
          <meshStandardMaterial color={goldColor} metalness={goldMetal} roughness={goldRough} />
        </mesh>
      ))}

      {/* Pendant chain drop — short vertical segment */}
      <mesh position={[0, -0.28, 0.01]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.18, 8]} />
        <meshStandardMaterial color={goldColor} metalness={goldMetal} roughness={goldRough} />
      </mesh>

      {/* Pendant — star shape approximated with a small sphere + 5 spikes */}
      <group position={[0, -0.42, 0.01]}>
        {/* Center gem */}
        <mesh>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#ff4da6" metalness={0.3} roughness={0.1} emissive="#ff1a8c" emissiveIntensity={0.4} />
        </mesh>
        {/* Star points */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.09, Math.sin(angle) * 0.09, 0]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <coneGeometry args={[0.022, 0.07, 4]} />
              <meshStandardMaterial color={goldColor} metalness={goldMetal} roughness={goldRough} />
            </mesh>
          );
        })}
        {/* Pendant ring connector */}
        <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.022, 0.007, 6, 12]} />
          <meshStandardMaterial color={goldColor} metalness={goldMetal} roughness={goldRough} />
        </mesh>
      </group>
    </group>
  );
}

export default function FrogScene() {
  const stitchGroupRef = useRef<THREE.Group>(null);
  const angelRef = useRef<THREE.Mesh>(null);
  const userRef = useRef<THREE.Mesh>(null);
  const stickRef = useRef<THREE.Mesh>(null);
  const windowRef = useRef<THREE.Mesh>(null);
  const flashRef = useRef<THREE.Mesh>(null);
  const disclaimerRef = useRef<THREE.Group>(null);
  
  const { isPlaying } = useSceneStore();
  
  // Load textures
  const frogTexture = useTexture('/assets/generated/frog-character-transparent.dim_512x512.png');
  const angelTexture = useTexture('/assets/generated/angel-character-transparent.dim_512x512.png');
  const userTexture = useTexture('/assets/generated/user-avatar-transparent.dim_512x512.png');
  const stickTexture = useTexture('/assets/generated/wooden-stick-transparent.dim_256x256.png');
  const windowTexture = useTexture('/assets/generated/window-frame-transparent.dim_512x512.png');

  // Configure textures
  useMemo(() => {
    [frogTexture, angelTexture, userTexture, stickTexture, windowTexture].forEach(tex => {
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  }, [frogTexture, angelTexture, userTexture, stickTexture, windowTexture]);

  useFrame((state) => {
    if (!isPlaying) return;
    
    const time = state.clock.getElapsedTime();
    const loopDuration = 3;
    const t = (time % loopDuration) / loopDuration;
    
    // Stitch jumping animation (group now)
    if (stitchGroupRef.current) {
      const jumpProgress = Math.min(t * 1.5, 1);
      const jumpHeight = Math.sin(jumpProgress * Math.PI) * 3;
      const jumpForward = jumpProgress * 4;
      
      stitchGroupRef.current.position.set(-1 + jumpForward, -0.5 + jumpHeight, 0);
      stitchGroupRef.current.rotation.z = jumpProgress * Math.PI * 0.5;
      
      // Squash and stretch
      const squash = 1 - Math.sin(jumpProgress * Math.PI) * 0.2;
      stitchGroupRef.current.scale.set(1.2 / squash, 1.2 * squash, 1.2);
    }
    
    // Angel floating animation
    if (angelRef.current) {
      angelRef.current.position.y = 2 + Math.sin(time * 2) * 0.3;
      angelRef.current.rotation.z = Math.sin(time * 1.5) * 0.1;
    }
    
    // User avatar subtle movement
    if (userRef.current) {
      userRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    }
    
    // Stick wobble
    if (stickRef.current) {
      stickRef.current.rotation.z = -0.3 + Math.sin(time * 3) * 0.1;
    }
    
    // Flash effect on loop restart
    if (flashRef.current && flashRef.current.material instanceof THREE.Material) {
      const flashTiming = t < 0.05 ? 1 - (t / 0.05) : 0;
      flashRef.current.material.opacity = flashTiming * 0.8;
    }
    
    // Disclaimer floating animation
    if (disclaimerRef.current) {
      disclaimerRef.current.position.y = -1.5 + Math.sin(time * 1.5) * 0.15;
    }
  });

  const handleDisclaimerClick = () => {
    window.open('https://sites.google.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-3, 3, 2]} intensity={0.5} color="#ffd700" />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#7ec850" />
      </mesh>
      
      {/* Window Frame */}
      <mesh ref={windowRef} position={[-1, 1, -1]} castShadow>
        <planeGeometry args={[2.5, 3]} />
        <meshStandardMaterial
          map={windowTexture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Window backing */}
      <mesh position={[-1, 1, -1.05]}>
        <planeGeometry args={[2, 2.5]} />
        <meshStandardMaterial color="#87ceeb" />
      </mesh>
      
      {/* Stitch character group — glasses and necklace are parented here so they animate together */}
      <group ref={stitchGroupRef} position={[-1, -0.5, 0]}>
        {/* Stitch sprite */}
        <mesh castShadow>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial
            map={frogTexture}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Glasses on Stitch's face */}
        <StitchGlasses />
        {/* Necklace around Stitch's neck */}
        <StitchNecklace />
      </group>
      
      {/* Wooden Stick */}
      <mesh ref={stickRef} position={[-2, -0.5, -0.5]} rotation={[0, 0, -0.3]} castShadow>
        <planeGeometry args={[0.3, 2]} />
        <meshStandardMaterial
          map={stickTexture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Angel Character */}
      <mesh ref={angelRef} position={[2, 2, 0]} castShadow>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial
          map={angelTexture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* User Avatar */}
      <mesh ref={userRef} position={[3, 0, 2]} castShadow>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial
          map={userTexture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Flash overlay for reload effect */}
      <mesh ref={flashRef} position={[0, 0, 5]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
      
      {/* Decorative clouds */}
      <Cloud position={[-4, 3, -3]} />
      <Cloud position={[5, 4, -4]} scale={0.8} />
      <Cloud position={[0, 5, -5]} scale={1.2} />
      
      {/* Floating Disclaimer Note */}
      <group ref={disclaimerRef} position={[4, -1.5, 3]}>
        <Html
          transform
          occlude={false}
          position={[0, 0, 0]}
          style={{
            pointerEvents: 'auto',
            userSelect: 'none',
          }}
        >
          <div
            onClick={handleDisclaimerClick}
            className="cursor-pointer rounded-lg bg-yellow-100/80 px-4 py-2 shadow-lg backdrop-blur-sm transition-all hover:bg-yellow-200/90 hover:shadow-xl hover:scale-105"
            style={{
              border: '2px solid rgba(234, 179, 8, 0.6)',
              minWidth: '200px',
              maxWidth: '220px',
            }}
          >
            <p className="text-xs font-semibold text-gray-800 text-center leading-relaxed">
              📋 Disclaimer available at Google Sites.
            </p>
          </div>
        </Html>
      </group>
    </>
  );
}

function Cloud({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.4, 0.1, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.4, 0.1, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
