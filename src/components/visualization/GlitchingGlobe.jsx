
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const GlitchingGlobe = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2.5;
    
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    // Create globe geometry
    const globeGeometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create wireframe material with glitch effect
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6, // Purple color
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    
    // Add second glowing layer
    const glowGeometry = new THREE.SphereGeometry(1.05, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x0EA5E9, // Blue color
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    // Add third particles layer
    const particlesGeometry = new THREE.SphereGeometry(1.15, 16, 16);
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xD946EF, // Pink color
      size: 0.05,
      transparent: true,
      opacity: 0.7
    });
    
    const globe = new THREE.Mesh(globeGeometry, wireframeMaterial);
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    
    scene.add(globe);
    scene.add(glow);
    scene.add(particles);
    
    // Glitch effect timing variables
    let lastGlitchTime = 0;
    let nextGlitchTime = Math.random() * 2000 + 1000; // Random time between 1-3 seconds
    let isGlitching = false;
    let glitchDuration = 0;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Constant rotation
      globe.rotation.y += 0.003;
      glow.rotation.y -= 0.002;
      particles.rotation.y += 0.001;
      
      // Random axis rotation for more complex movement
      globe.rotation.x = Math.sin(Date.now() * 0.0005) * 0.2;
      glow.rotation.x = Math.sin(Date.now() * 0.0003) * 0.2;
      
      // Glitch effect timing
      const currentTime = Date.now();
      
      if (!isGlitching && currentTime - lastGlitchTime > nextGlitchTime) {
        // Start glitching
        isGlitching = true;
        glitchDuration = Math.random() * 200 + 100; // Glitch for 100-300ms
        lastGlitchTime = currentTime;
        
        // Apply glitch effect
        globe.scale.x += (Math.random() - 0.5) * 0.1;
        globe.scale.y += (Math.random() - 0.5) * 0.1;
        globe.position.x += (Math.random() - 0.5) * 0.1;
        wireframeMaterial.color.setHex(
          Math.random() > 0.5 ? 0xF97316 : 0x8B5CF6
        );
      } else if (isGlitching && currentTime - lastGlitchTime > glitchDuration) {
        // Stop glitching
        isGlitching = false;
        nextGlitchTime = Math.random() * 2000 + 1000; // Random time for next glitch
        
        // Reset glitch effect
        globe.scale.set(1, 1, 1);
        globe.position.x = 0;
        wireframeMaterial.color.setHex(0x8B5CF6);
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      
      // Dispose of resources
      globeGeometry.dispose();
      wireframeMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return <div ref={mountRef} className="w-full h-full" />;
};

export default GlitchingGlobe;
