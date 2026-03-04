"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

// ============================================
// THREE.JS STARFIELD COMPONENT
// ============================================
function Starfield() {
  const ref = useRef<THREE.Points>(null!);
  const count = 2000;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

function Nebula() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });
  
  return (
    <mesh ref={meshRef} scale={3}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial
        color="#4b0082"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 2] }}>
          <Starfield />
          <Nebula />
        </Canvas>
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0015] z-10" />
      
      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 text-center px-4"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <img 
            src="/aureus-logo.jpg" 
            alt="AureusID Logo" 
            className="w-32 h-32 mx-auto rounded-full object-cover border-2 border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-orbitron text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-[0.3em] text-white/90"
          style={{
            textShadow: "0 0 30px rgba(0,240,255,0.3), 0 0 60px rgba(212,175,55,0.2)"
          }}
        >
          AUREUSID
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-lg md:text-xl font-rajdhani text-white/60 tracking-widest"
        >
          The universal reputation layer. Prove facts. Reveal nothing.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-16"
        >
          <button className="btn-gold font-orbitron text-sm md:text-base px-10 py-4 rounded-sm uppercase tracking-widest text-black font-semibold">
            Request Early Access
          </button>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 z-20"
      >
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-cyan-400/50 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

// ============================================
// THE PROBLEM SECTION
// ============================================
function ProblemSection() {
  return (
    <section className="relative py-32 px-4 hex-grid bg-black/80">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold uppercase tracking-wider mb-16">
            The Crisis
          </h2>
          
          <div className="space-y-8">
            {[
              "AI agents outnumber humans.",
              "Bots impersonate identities.",
              "Trust is collapsing."
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative inline-block"
              >
                <span className="text-2xl md:text-3xl font-rajdhani font-medium text-white/90">
                  {text}
                </span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: i * 0.2 + 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute bottom-[-8px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent origin-left"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// THE VISION SECTION
// ============================================
function VisionSection() {
  return (
    <section className="relative py-40 px-4 overflow-hidden">
      {/* Cosmic portal ring background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-[800px] h-[800px] border border-cyan-400/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] border border-indigo-500/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] border border-gold-500/5 rounded-full"
        />
      </div>
      
      <div className="relative max-w-3xl mx-auto text-center z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-orbitron text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6"
          style={{ textShadow: "0 0 20px rgba(212,175,55,0.3)" }}
        >
          One key. Yours forever.
        </motion.h2>
        
        <motion.ul 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 space-y-6 text-left"
        >
          {[
            "Private from the first byte",
            "Portable across every app & chain",
            "Prove anything — reveal nothing",
            "Sovereign identity in an AI world"
          ].map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 text-lg md:text-xl font-rajdhani text-white/80"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

// ============================================
// HOW IT WORKS SECTION
// ============================================
function HowItWorksSection() {
  const steps = [
    { title: "Generate your key", subtitle: "Device-only. Never leaves your hardware." },
    { title: "Receive stamps", subtitle: "Trusted issuers attest to your reputation." },
    { title: "Prove facts", subtitle: "Zero-knowledge proofs. Reveal nothing else." }
  ];
  
  return (
    <section className="relative py-40 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-orbitron text-3xl md:text-4xl font-bold uppercase text-center tracking-wider mb-20"
        >
          How It Works
        </motion.h2>
        
        {/* Timeline */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -translate-y-1/2" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Glowing node */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Outer ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-cyan-400/30 rounded-full"
                />
                {/* Electron orbit */}
                <div className="absolute inset-0 electron-orbit opacity-50">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full absolute" style={{ transform: 'translateX(30px)' }} />
                </div>
                {/* Core */}
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-full node-glow" />
                {/* Step number */}
                <span className="absolute -top-8 font-orbitron text-sm text-cyan-400/70">
                  0{i + 1}
                </span>
              </div>
              
              {/* Content */}
              <div className="mt-8 max-w-[200px]">
                <h3 className="font-orbitron text-lg font-semibold text-white/90 mb-2">
                  {step.title}
                </h3>
                <p className="font-rajdhani text-sm text-white/50">
                  {step.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// EARLY ACCESS SECTION (WITH FORM)
// ============================================
function EarlyAccessSection() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    why: "",
    handle: ""
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, show thank you message
    // In production, connect to Formspree or backend
    setSubmitted(true);
    console.log("Form submitted:", formData);
  };
  
  return (
    <section className="relative py-40 px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="relative max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
            Request Early Access
          </h2>
          <p className="font-rajdhani text-white/50">
            Limited spots. High-agency individuals only.
          </p>
        </motion.div>
        
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-rajdhani text-sm text-white/60 mb-2 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 font-rajdhani text-white/90 placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block font-rajdhani text-sm text-white/60 mb-2 uppercase tracking-wider">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 font-rajdhani text-white/90 placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
                placeholder="Your role"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block font-rajdhani text-sm text-white/60 mb-2 uppercase tracking-wider">
              Why do you want access?
            </label>
            <textarea
              value={formData.why}
              onChange={(e) => setFormData({ ...formData, why: e.target.value })}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 font-rajdhani text-white/90 placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
              placeholder="Tell us why..."
              required
            />
          </div>
          
          <div>
            <label className="block font-rajdhani text-sm text-white/60 mb-2 uppercase tracking-wider">
              X / LinkedIn Handle
            </label>
            <input
              type="text"
              value={formData.handle}
              onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 font-rajdhani text-white/90 placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
              placeholder="@username or LinkedIn URL"
              required
            />
          </div>
          
          <div className="pt-4">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-orbitron text-xl text-[#D4AF37] mb-2">Request Received</h3>
                <p className="font-rajdhani text-white/60">We'll be in touch. Silence is power.</p>
              </div>
            ) : (
              <button 
                type="submit"
                className="btn-gold w-full font-orbitron text-sm px-10 py-4 rounded-sm uppercase tracking-widest text-black font-semibold"
              >
                Request Early Access
              </button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-orbitron text-xs tracking-[0.3em] text-white/40 uppercase mb-6">
          Private. Portable. Permanent.
        </p>
        <a 
          href="#"
          className="inline-block font-rajdhani text-sm text-cyan-400/60 hover:text-cyan-400 transition-colors"
        >
          Request Early Access →
        </a>
      </div>
    </footer>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <VisionSection />
      <HowItWorksSection />
      <EarlyAccessSection />
      <Footer />
    </main>
  );
}
