
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
      
      // Maintain aspect ratio
      const aspect = 1; // Force 1:1 aspect ratio for perfect sphere
      const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
      camera.position.z = 2.5;
      
      // Initialize renderer with better error handling
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: 'default'
      });
      
      // Make sure the container exists before setting size
      if (mountRef.current) {
        const containerWidth = mountRef.current.clientWidth;
        const containerHeight = mountRef.current.clientHeight;
        // Use the smaller dimension to maintain aspect ratio
        const size = Math.min(containerWidth, containerHeight);
        renderer.setSize(size, size);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);
      } else {
        // Early return if the mount element disappeared
        return;
      }
      
      // Create a particle-based globe for tech look
      const particleCount = 3000;
      const particles = new THREE.BufferGeometry();
      const positions = [];
      
      // Generate particles in a sphere pattern
      for (let i = 0; i < particleCount; i++) {
        // Use spherical distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 1 + (Math.random() * 0.1 - 0.05); // Slight variation in radius
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        positions.push(x, y, z);
      }
      
      particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      
      // Use only theme colors, no orange
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x0052FF, // crypto.blue
        size: 0.025,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      });
      
      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      
      // Add a subtle wireframe sphere for structure
      const wireframeGeometry = new THREE.SphereGeometry(0.99, 32, 32);
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x8B5CF6, // crypto.purple
        wireframe: true,
        transparent: true,
        opacity: 0.15
      });
      
      const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
      scene.add(wireframe);
      
      // Add inner core for depth
      const coreGeometry = new THREE.SphereGeometry(0.85, 24, 24);
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x14B8A6, // crypto.cyan
        transparent: true,
        opacity: 0.1
      });
      
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      scene.add(core);
      
      // Add some connection lines for a network effect
      const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x8B5CF6, // crypto.purple
        transparent: true,
        opacity: 0.2
      });
      
      // Create 10 random connection lines
      for (let i = 0; i < 10; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const linePoints = [];
        
        // Random start and end points on the sphere
        const start = new THREE.Vector3(
          Math.sin(Math.random() * Math.PI * 2) * Math.cos(Math.random() * Math.PI),
          Math.sin(Math.random() * Math.PI * 2) * Math.sin(Math.random() * Math.PI),
          Math.cos(Math.random() * Math.PI * 2)
        ).normalize();
        
        const end = new THREE.Vector3(
          Math.sin(Math.random() * Math.PI * 2) * Math.cos(Math.random() * Math.PI),
          Math.sin(Math.random() * Math.PI * 2) * Math.sin(Math.random() * Math.PI),
          Math.cos(Math.random() * Math.PI * 2)
        ).normalize();
        
        linePoints.push(start.x, start.y, start.z);
        linePoints.push(end.x, end.y, end.z);
        
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
        const line = new THREE.Line(lineGeometry, linesMaterial);
        scene.add(line);
      }
      
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
        
        // Gentle rotation for a more sophisticated feel - use continuous rotation pattern for perfect looping
        // Use sine/cosine based movement for smooth looping animations
        const time = currentTime * 0.001; // Convert to seconds

        // Create smooth looping rotations using modulo of time
        particleSystem.rotation.y = (time * 0.2) % (Math.PI * 2); 
        wireframe.rotation.y = (time * -0.1) % (Math.PI * 2);
        core.rotation.y = (time * 0.15) % (Math.PI * 2);
        
        // Subtle axis tilt with sine for perfect loops
        particleSystem.rotation.x = Math.sin(time * 0.2) * 0.05;
        wireframe.rotation.x = Math.sin(time * 0.3) * 0.05;
        
        if (mountRef.current) {
          renderer.render(scene, camera);
        }
      };
      
      // Add a subtle pulse animation to particles
      const pulseCycle = () => {
        if (!isMounted) return;
        
        const t = Date.now() * 0.001;
        // Use sine wave for smooth looping pulse
        const scale = 0.025 + Math.sin(t * 0.5) * 0.005;
        if (particleMaterial) {
          particleMaterial.size = scale;
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
            const containerWidth = mountRef.current.clientWidth;
            const containerHeight = mountRef.current.clientHeight;
            // Use the smaller dimension to maintain aspect ratio
            const size = Math.min(containerWidth, containerHeight);
            
            renderer.setSize(size, size);
            camera.aspect = 1; // Maintain 1:1 aspect ratio
            camera.updateProjectionMatrix();
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
        particles.dispose();
        particleMaterial.dispose();
        wireframeGeometry.dispose();
        wireframeMaterial.dispose();
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
    <div ref={mountRef} className="w-full h-full relative flex items-center justify-center">
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
