import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export const Enhanced3DBooksScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameId = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000030, 15, 50);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0x404080, 0.4);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0x4A90E2, 1.2);
    mainLight.position.set(10, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    // Accent lights for books
    const bookLight1 = new THREE.PointLight(0xFFD700, 0.8, 20);
    bookLight1.position.set(-8, 6, 8);
    scene.add(bookLight1);

    const bookLight2 = new THREE.PointLight(0xFF6B6B, 0.6, 15);
    bookLight2.position.set(8, -4, -6);
    scene.add(bookLight2);

    const accentLight = new THREE.SpotLight(0x00FFFF, 1.5, 25, Math.PI / 8, 0.3, 1);
    accentLight.position.set(0, 12, 0);
    accentLight.target.position.set(0, 0, 0);
    scene.add(accentLight);

    // Central Knowledge Library - Giant Bookshelf
    const libraryGroup = new THREE.Group();
    
    // Main bookshelf structure
    const shelfGeometry = new THREE.BoxGeometry(6, 0.2, 1.5);
    const shelfMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8B4513,
      roughness: 0.4,
      metalness: 0.1,
      clearcoat: 0.3
    });

    // Create multiple shelves
    for (let i = 0; i < 5; i++) {
      const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
      shelf.position.y = i * 1.8 - 4;
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      libraryGroup.add(shelf);
    }

    // Floating Books around the library
    const books: THREE.Group[] = [];
    const bookColors = [
      0xFF6B6B, 0x4ECDC4, 0x45B7D1, 0x96CEB4, 
      0xFFEAA7, 0xDDA0DD, 0xFF9FF3, 0x54A0FF,
      0xF39C12, 0xE74C3C, 0x9B59B6, 0x1ABC9C
    ];

    for (let i = 0; i < 50; i++) {
      const bookGroup = new THREE.Group();
      
      // Book geometry with realistic proportions
      const bookGeometry = new THREE.BoxGeometry(
        0.3 + Math.random() * 0.2, 
        0.8 + Math.random() * 0.4, 
        0.08 + Math.random() * 0.04
      );
      
      const bookMaterial = new THREE.MeshPhysicalMaterial({
        color: bookColors[i % bookColors.length],
        roughness: 0.6,
        metalness: 0.1,
        clearcoat: 0.4,
        clearcoatRoughness: 0.2
      });
      
      const book = new THREE.Mesh(bookGeometry, bookMaterial);
      book.castShadow = true;
      book.receiveShadow = true;
      bookGroup.add(book);
      
      // Add book spine details
      const spineGeometry = new THREE.PlaneGeometry(0.05, 0.6);
      const spineMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.8
      });
      const spine = new THREE.Mesh(spineGeometry, spineMaterial);
      spine.position.z = 0.04;
      spine.position.x = 0.1;
      bookGroup.add(spine);
      
      // Add glowing edge effect
      const edgeGeometry = new THREE.BoxGeometry(0.32, 0.82, 0.1);
      const edgeMaterial = new THREE.MeshBasicMaterial({
        color: bookColors[i % bookColors.length],
        transparent: true,
        opacity: 0.3
      });
      const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
      bookGroup.add(edge);
      
      // Position books in orbital patterns
      const radius = 8 + Math.random() * 6;
      const angle = (i / 50) * Math.PI * 4;
      const height = (Math.random() - 0.5) * 12;
      
      bookGroup.position.x = Math.cos(angle) * radius;
      bookGroup.position.y = height;
      bookGroup.position.z = Math.sin(angle) * radius;
      
      // Random initial rotation
      bookGroup.rotation.x = Math.random() * Math.PI;
      bookGroup.rotation.y = Math.random() * Math.PI;
      bookGroup.rotation.z = Math.random() * Math.PI;
      
      books.push(bookGroup);
      scene.add(bookGroup);
    }

    scene.add(libraryGroup);

    // Academic symbols floating around
    const academicElements: THREE.Group[] = [];
    const symbolGeometries = [
      new THREE.SphereGeometry(0.15, 16, 16), // Globe
      new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16), // Pencil
      new THREE.TorusGeometry(0.2, 0.05, 8, 16), // Ring
      new THREE.ConeGeometry(0.15, 0.3, 8), // Graduation cap
      new THREE.BoxGeometry(0.25, 0.02, 0.25) // Diploma
    ];

    for (let i = 0; i < 30; i++) {
      const symbolGroup = new THREE.Group();
      const geometry = symbolGeometries[i % symbolGeometries.length];
      
      const material = new THREE.MeshPhysicalMaterial({
        color: [0xFFD700, 0x00BFFF, 0xFF69B4, 0x32CD32, 0xFF4500][i % 5],
        transparent: true,
        opacity: 0.8,
        emissive: [0x332200, 0x002233, 0x330022, 0x003322, 0x332200][i % 5],
        emissiveIntensity: 0.2,
        metalness: 0.3,
        roughness: 0.4
      });
      
      const symbol = new THREE.Mesh(geometry, material);
      symbolGroup.add(symbol);
      
      const radius = 5 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 15;
      
      symbolGroup.position.x = Math.cos(angle) * radius;
      symbolGroup.position.y = height;
      symbolGroup.position.z = Math.sin(angle) * radius;
      
      academicElements.push(symbolGroup);
      scene.add(symbolGroup);
    }

    // Knowledge particles
    const particleCount = 300;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.4, 0.8, 0.6);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 15;
    camera.position.y = 2;

    // Animation Loop
    const clock = new THREE.Clock();
    let lastTime = 0;
    
    const animate = (currentTime: number) => {
      frameId.current = requestAnimationFrame(animate);
      
      const deltaTime = currentTime - lastTime;
      if (deltaTime < 16) return; // 60fps limit
      lastTime = currentTime;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Animate library rotation
      libraryGroup.rotation.y += 0.002;
      
      // Animate floating books with complex motion
      books.forEach((book, index) => {
        book.rotation.x += 0.005 + (index % 3) * 0.002;
        book.rotation.y += 0.008 + (index % 4) * 0.001;
        book.rotation.z += 0.003 + (index % 5) * 0.001;
        
        // Orbital motion with sine wave height variation
        const baseAngle = (index / books.length) * Math.PI * 4;
        const radius = 8 + Math.sin(elapsedTime * 0.2 + index) * 2;
        const heightOffset = Math.sin(elapsedTime * 0.3 + index * 0.5) * 3;
        
        book.position.x = Math.cos(baseAngle + elapsedTime * 0.05) * radius;
        book.position.z = Math.sin(baseAngle + elapsedTime * 0.05) * radius;
        book.position.y += Math.sin(elapsedTime * 0.4 + index) * 0.02;
        
        // Animate glow effect
        if (book.children[2] && book.children[2] instanceof THREE.Mesh) {
          const glowMesh = book.children[2] as THREE.Mesh;
          if (glowMesh.material instanceof THREE.MeshBasicMaterial) {
            glowMesh.material.opacity = 0.2 + Math.sin(elapsedTime * 3 + index) * 0.15;
          }
        }
      });
      
      // Animate academic symbols
      academicElements.forEach((element, index) => {
        element.rotation.x += 0.01;
        element.rotation.y += 0.015;
        element.rotation.z += 0.008;
        
        const baseAngle = (index / academicElements.length) * Math.PI * 2;
        const radius = 5 + Math.sin(elapsedTime * 0.3 + index) * 1.5;
        
        element.position.x = Math.cos(baseAngle + elapsedTime * 0.1) * radius;
        element.position.z = Math.sin(baseAngle + elapsedTime * 0.1) * radius;
        element.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.015;
      });
      
      // Animate particles
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime * 0.5 + i * 0.1) * 0.005;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.rotation.y += 0.0005;
      
      // Dynamic lighting
      bookLight1.intensity = 0.8 + Math.sin(elapsedTime * 1.5) * 0.3;
      bookLight2.intensity = 0.6 + Math.cos(elapsedTime * 2) * 0.2;
      accentLight.intensity = 1.5 + Math.sin(elapsedTime) * 0.3;
      
      renderer.render(scene, camera);
    };

    animate(0);
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div 
        ref={mountRef} 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)' }}
      />
      
      {/* Loading overlay */}
      <motion.div
        className={`absolute inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center z-10 ${
          isLoaded ? 'pointer-events-none' : ''
        }`}
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-foreground-secondary text-lg">Loading Digital Library...</p>
        </div>
      </motion.div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 z-5" />
    </div>
  );
};