
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const GlitchingGlobe = () => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Flag to track cleanup
    let isMounted = true;
    
    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = 2.5;
      
      // Initialize renderer with better error handling
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: 'default'
      });
      
      // Make sure the container exists before setting size
      if (mountRef.current) {
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);
      } else {
        // Early return if the mount element disappeared
        return;
      }
      
      // Create globe geometry with more detail for a professional look
      const globeGeometry = new THREE.SphereGeometry(1, 48, 48);
      
      // Create wireframe material with subtle colors from the theme
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x0052FF, // Using crypto.blue from the theme
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      
      // Add second layer
      const glowGeometry = new THREE.SphereGeometry(1.05, 48, 48);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x8B5CF6, // Using crypto.purple from the theme
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      
      // Add third particles layer
      const particlesGeometry = new THREE.SphereGeometry(1.15, 24, 24);
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x14B8A6, // Using crypto.cyan from the theme
        size: 0.03,
        transparent: true,
        opacity: 0.5
      });
      
      // Add a subtle inner core for depth
      const coreGeometry = new THREE.SphereGeometry(0.9, 32, 32);
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x0052FF, // Crypto.blue
        transparent: true,
        opacity: 0.1
      });
      
      const globe = new THREE.Mesh(globeGeometry, wireframeMaterial);
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      
      scene.add(globe);
      scene.add(glow);
      scene.add(particles);
      scene.add(core);
      
      // Subtle glitch effect timing variables - less frequent and less dramatic
      let lastGlitchTime = 0;
      let nextGlitchTime = Math.random() * 4000 + 3000; // Less frequent (3-7 seconds)
      let isGlitching = false;
      let glitchDuration = 0;
      
      // Animation loop with better performance
      let animationFrameId;
      let lastFrameTime = 0;
      const targetFPS = 30;
      const frameInterval = 1000 / targetFPS;
      
      const animate = (currentTime) => {
        if (!isMounted) return;
        
        animationFrameId = requestAnimationFrame(animate);
        
        // Throttle frame rate for better performance
        if (currentTime - lastFrameTime < frameInterval) return;
        lastFrameTime = currentTime;
        
        // Gentle rotation for a more sophisticated feel
        globe.rotation.y += 0.002;
        glow.rotation.y -= 0.001;
        particles.rotation.y += 0.0005;
        core.rotation.y -= 0.0008;
        
        // Subtle axis tilt
        globe.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1;
        glow.rotation.x = Math.sin(Date.now() * 0.0002) * 0.1;
        
        // More refined glitch effect
        const now = Date.now();
        
        if (!isGlitching && now - lastGlitchTime > nextGlitchTime) {
          // Start glitching
          isGlitching = true;
          glitchDuration = Math.random() * 100 + 50; // Shorter duration (50-150ms)
          lastGlitchTime = now;
          
          // Subtle glitch effect
          globe.scale.x += (Math.random() - 0.5) * 0.05;
          globe.scale.y += (Math.random() - 0.5) * 0.05;
          globe.position.x += (Math.random() - 0.5) * 0.05;
          
          // Use only theme colors for glitching
          const themeColors = [0x0052FF, 0x8B5CF6, 0x14B8A6]; // blue, purple, cyan
          wireframeMaterial.color.setHex(themeColors[Math.floor(Math.random() * themeColors.length)]);
        } else if (isGlitching && now - lastGlitchTime > glitchDuration) {
          // Stop glitching
          isGlitching = false;
          nextGlitchTime = Math.random() * 4000 + 3000;
          
          // Reset glitch effect
          globe.scale.set(1, 1, 1);
          globe.position.x = 0;
          wireframeMaterial.color.setHex(0x0052FF); // Reset to default blue
        }
        
        if (mountRef.current) {
          renderer.render(scene, camera);
        }
      };
      
      // Add a subtle pulse animation to the core for more depth
      const pulseCycle = () => {
        if (!isMounted) return;
        
        const t = Date.now() * 0.001;
        const scale = 0.9 + Math.sin(t) * 0.05;
        if (core) {
          core.scale.set(scale, scale, scale);
        }
        
        setTimeout(pulseCycle, 50);
      };
      
      pulseCycle();
      
      // Start animation loop
      animate(0);
      setIsLoaded(true);
      
      // Handle window resize with debounce
      let resizeTimeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (mountRef.current && renderer) {
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
          }
        }, 100);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        isMounted = false;
        
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        
        window.removeEventListener('resize', handleResize);
        
        // Clean DOM element
        if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
        
        // Dispose of resources
        globeGeometry.dispose();
        wireframeMaterial.dispose();
        glowGeometry.dispose();
        glowMaterial.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        coreGeometry.dispose();
        coreMaterial.dispose();
        renderer.dispose();
      };
    } catch (error) {
      console.error("Error in GlitchingGlobe:", error);
      setHasError(true);
      return () => {
        isMounted = false;
      };
    }
  }, []);
  
  return (
    <div ref={mountRef} className="w-full h-full relative">
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          <p>Failed to load 3D visualization</p>
        </div>
      )}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default GlitchingGlobe;
