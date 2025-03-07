
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
      
      // Create Earth globe
      const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
      
      // Create Earth texture loader with error handling
      const textureLoader = new THREE.TextureLoader();
      
      // Load the Earth textures
      const earthMap = textureLoader.load('./earth-map.jpg', undefined, undefined, (e) => {
        console.log('Error loading texture', e);
      });
      
      // If we don't have the map, use fallback colors
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthMap,
        color: 0x0EA5E9, // Ocean blue (will blend with the texture if loaded)
        shininess: 25,
        transparent: false,
        bumpScale: 0.05
      });
      
      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earth);
      
      // Create more pronounced continents
      const continentsGeometry = new THREE.SphereGeometry(1.01, 32, 32);
      
      // Simplified continent areas using a custom pattern
      // This creates a stylized version of Earth's continents
      const continentsMaterial = new THREE.ShaderMaterial({
        uniforms: {
          color1: { value: new THREE.Color(0xF2FCE2) }, // Land color
          color2: { value: new THREE.Color(0x0EA5E9) },  // Ocean color
          time: { value: 0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float time;
          varying vec2 vUv;
          
          // Simple noise function
          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          }
          
          // Continent-like pattern
          float continentPattern(vec2 uv) {
            // North America
            if (uv.x < 0.35 && uv.y > 0.5 && uv.y < 0.85) return 1.0;
            
            // South America
            if (uv.x < 0.35 && uv.x > 0.2 && uv.y > 0.15 && uv.y < 0.5) return 1.0;
            
            // Europe
            if (uv.x > 0.45 && uv.x < 0.55 && uv.y > 0.6 && uv.y < 0.8) return 1.0;
            
            // Africa
            if (uv.x > 0.45 && uv.x < 0.6 && uv.y > 0.35 && uv.y < 0.6) return 1.0;
            
            // Asia
            if (uv.x > 0.55 && uv.x < 0.85 && uv.y > 0.5 && uv.y < 0.8) return 1.0;
            
            // Australia
            if (uv.x > 0.75 && uv.x < 0.9 && uv.y > 0.25 && uv.y < 0.4) return 1.0;
            
            // Antarctica
            if (uv.y < 0.20) return 1.0;
            
            return 0.0;
          }
          
          void main() {
            float pattern = continentPattern(vUv);
            
            // Add some noise to continent edges
            float noise = random(vUv + time * 0.01) * 0.1;
            pattern = smoothstep(0.4, 0.6, pattern + noise);
            
            gl_FragColor = vec4(mix(color2, color1, pattern), pattern * 0.7);
          }
        `,
        transparent: true
      });
      
      const continents = new THREE.Mesh(continentsGeometry, continentsMaterial);
      scene.add(continents);
      
      // Add atmosphere glow
      const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xD3E4FD, // Soft blue
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      });
      
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);
      
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0x555555);
      scene.add(ambientLight);
      
      // Add directional light to simulate sun
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);
      
      // Add subtle point light for highlights
      const pointLight = new THREE.PointLight(0xffffff, 0.5);
      pointLight.position.set(-5, -3, 2);
      scene.add(pointLight);
      
      // Add "network" lines (longitude/latitude)
      const gridMaterial = new THREE.LineBasicMaterial({
        color: 0x8E9196, // Neutral gray
        transparent: true,
        opacity: 0.2
      });
      
      // Create longitude lines
      for (let i = 0; i < 12; i++) {
        const longitude = new THREE.BufferGeometry();
        const points = [];
        const angle = (i / 12) * Math.PI * 2;
        
        for (let j = 0; j <= 180; j++) {
          const phi = (j / 180) * Math.PI;
          const x = Math.sin(phi) * Math.cos(angle);
          const y = Math.cos(phi);
          const z = Math.sin(phi) * Math.sin(angle);
          points.push(new THREE.Vector3(x, y, z));
        }
        
        longitude.setFromPoints(points);
        const line = new THREE.Line(longitude, gridMaterial);
        scene.add(line);
      }
      
      // Create latitude lines
      for (let i = 1; i < 6; i++) {
        const latitude = new THREE.BufferGeometry();
        const points = [];
        const phi = (i / 6) * Math.PI;
        
        for (let j = 0; j <= 360; j++) {
          const angle = (j / 360) * Math.PI * 2;
          const x = Math.sin(phi) * Math.cos(angle);
          const y = Math.cos(phi);
          const z = Math.sin(phi) * Math.sin(angle);
          points.push(new THREE.Vector3(x, y, z));
        }
        
        latitude.setFromPoints(points);
        const line = new THREE.Line(latitude, gridMaterial);
        scene.add(line);
      }
      
      // Add some "data points" on the surface
      const dataPointGeometry = new THREE.SphereGeometry(0.015, 8, 8);
      const dataPointMaterial = new THREE.MeshBasicMaterial({
        color: 0x14B8A6 // crypto.cyan
      });
      
      // Create 20 random data points
      const dataPoints = [];
      for (let i = 0; i < 20; i++) {
        const dataPoint = new THREE.Mesh(dataPointGeometry, dataPointMaterial);
        
        // Random position on sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 1.02;
        
        dataPoint.position.x = radius * Math.sin(phi) * Math.cos(theta);
        dataPoint.position.y = radius * Math.sin(phi) * Math.sin(theta);
        dataPoint.position.z = radius * Math.cos(phi);
        
        scene.add(dataPoint);
        dataPoints.push({
          mesh: dataPoint,
          initialPos: dataPoint.position.clone(),
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      
      // Create connections between nearby points
      const connectionMaterial = new THREE.LineBasicMaterial({
        color: 0x14B8A6, // Match data point color
        transparent: true,
        opacity: 0.3
      });
      
      // Connect some random points with lines
      for (let i = 0; i < 15; i++) {
        const pointA = dataPoints[Math.floor(Math.random() * dataPoints.length)];
        const pointB = dataPoints[Math.floor(Math.random() * dataPoints.length)];
        
        if (pointA !== pointB) {
          const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
            pointA.mesh.position,
            pointB.mesh.position
          ]);
          const connectionLine = new THREE.Line(connectionGeometry, connectionMaterial);
          scene.add(connectionLine);
        }
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
        
        // Update shader time
        if (continentsMaterial.uniforms.time) {
          continentsMaterial.uniforms.time.value = currentTime * 0.0001;
        }
        
        // Gentle rotation for a more sophisticated feel
        const time = currentTime * 0.0001; // Convert to seconds, slow rotation
        
        // Create smooth looping rotations
        earth.rotation.y = (time * 0.3) % (Math.PI * 2);
        continents.rotation.y = (time * 0.3) % (Math.PI * 2);
        atmosphere.rotation.y = (time * 0.25) % (Math.PI * 2);
        
        // Subtle axis tilt
        earth.rotation.x = 0.4; // Fixed Earth tilt
        continents.rotation.x = 0.4;
        atmosphere.rotation.x = 0.4;
        
        // Animate data points with a subtle pulse
        dataPoints.forEach(point => {
          const pulseScale = 1.0 + 0.15 * Math.sin(currentTime * 0.002 + point.pulsePhase);
          point.mesh.scale.set(pulseScale, pulseScale, pulseScale);
        });
        
        if (mountRef.current) {
          renderer.render(scene, camera);
        }
      };
      
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
        earthGeometry.dispose();
        earthMaterial.dispose();
        continentsGeometry.dispose();
        continentsMaterial.dispose();
        atmosphereGeometry.dispose();
        atmosphereMaterial.dispose();
        dataPointGeometry.dispose();
        dataPointMaterial.dispose();
        gridMaterial.dispose();
        connectionMaterial.dispose();
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
