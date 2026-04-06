"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Download, Layout, Shield, Zap, ChevronRight } from "lucide-react";

export default function LandingPage() {
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateWidth = () => {
    if (sliderRef.current) {
      setContainerWidth(sliderRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleDownload = async () => {
    // Check if the user is on a Mac
    if (navigator.userAgent.toLowerCase().includes('mac')) {
      alert("Poster is currently only available for Windows. Mac support is coming soon!");
      return;
    }

    try {
      const res = await fetch("https://api.github.com/repos/nueldotdev/Poster/releases/latest");
      const data = await res.json();
      const exeAsset = data.assets?.find((a: any) => a.name.endsWith(".exe"));
      if (exeAsset) {
        window.location.href = exeAsset.browser_download_url;
      } else {
        alert("The Windows installer is currently unavailable. Please check back later!");
      }
    } catch (error) {
      alert("We couldn't connect to the download server. Please try again later!");
    }
  };

  return (
    <div className="flex-1 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-border-custom">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Poster Logo" width={32} height={32} className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight text-text-primary">Poster</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#features" className="hover:text-accent transition-colors">Features</a>
            <a href="#comparison" className="hover:text-accent transition-colors">AI</a>
          </div>
          <button onClick={handleDownload} className="cursor-pointer bg-accent text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
            <Download size={16} />
            Download
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary mb-6 tracking-tight leading-[1.1]">
            Your Wallpapers,<br /> 
            <span className="text-accent">Perfectly Optimized.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate desktop companion to organize, optimize, and set your favorite images. 
            Experience native-resolution clarity with automated optimal scaling.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleDownload} className="cursor-pointer w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
              <Download size={20} />
              Download for Windows
            </button>
          </div>
          
          {/* App Preview Mockup */}
          <div className="mt-16 relative mx-auto max-w-5xl group animate-float">
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative rounded-2xl overflow-hidden border border-border-custom shadow-2xl bg-surface-2 aspect-[16/10] flex items-center justify-center">
               <Image 
                 src="/demo-imgs/dashboard.png"
                 alt="Dashboard Mockup"
                 fill
                 className="object-cover"
                 priority
               />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 bg-surface-2/50 border-y border-border-custom px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">AI Enhancement</h2>
              <span className="bg-text-secondary/20 text-text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Coming Soon</span>
            </div>
            <p className="text-text-secondary max-w-xl mx-auto">
              Transform low-quality images into stunning high-definition wallpapers with our upcoming integrated AI enhancement model. (Currently in development).
            </p>
          </div>

          <div 
            ref={sliderRef}
            className="relative mx-auto max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white cursor-ew-resize select-none touch-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Full resolution) */}
            <div className="absolute inset-0 bg-accent/10">
               <div className="absolute inset-0 overflow-hidden">
                  <Image 
                    src="/demo-imgs/after.webp" 
                    alt="After" 
                    fill 
                    className="object-cover"
                  />
               </div>
            </div>

            {/* Before Image (Blurry/Low res) Container */}
            <div 
              className="absolute inset-0 overflow-hidden border-r-2 border-white z-10"
              style={{ width: `${sliderPos}%` }}
            >
              <div 
                className="absolute inset-0 h-full"
                style={{ width: containerWidth > 0 ? `${containerWidth}px` : '100vw' }}
              >
                <Image 
                  src="/demo-imgs/before.jpg" 
                  alt="Before" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 z-20 w-1 bg-white"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-text-muted rounded-full"></div>
                  <div className="w-1 h-4 bg-text-muted rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-6 left-6 z-30 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
              Original
            </div>
            <div className="absolute bottom-6 right-6 z-30 bg-accent backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
              AI Enhanced
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-text-primary">Everything you need for your screen.</h2>
          <p className="text-text-secondary">Powerful tools packaged in a beautiful, minimal interface.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="text-accent" size={32} />,
              title: "One-Click Apply",
              desc: "Set your desktop wallpaper instantly with perfect resolution scaling for any monitor."
            },
            {
              icon: <Layout className="text-accent" size={32} />,
              title: "Library Management",
              desc: "Organize your collection and find your favorite wallpapers in seconds."
            },
            {
              icon: <Shield className="text-accent" size={32} />,
              title: "Optimized Formats",
              desc: "Automatic conversion to high-quality WebP to save space while maintaining crystal clarity."
            }
          ].map((feature, i) => (
            <div key={feature.title} className="p-8 rounded-3xl bg-surface border border-border-custom hover:shadow-xl transition-shadow text-left group">
              <div className="mb-6 p-4 bg-accent-muted w-fit rounded-2xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-primary">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Updates Section */}
      <section id="changelog" className="py-24 px-6 bg-surface-2/30 border-y border-border-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-text-primary">Recent Updates</h2>
            <p className="text-text-secondary">Follow along as we constantly improve Poster.</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-6 p-6 rounded-2xl bg-surface border border-border-custom hover:shadow-md transition-shadow">
               <div className="hidden sm:flex flex-col items-center">
                 <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm mb-2 pt-1 uppercase tracking-wider">NEW</div>
                 <div className="w-0.5 h-full bg-border-custom/50 rounded-full"></div>
               </div>
               <div>
                 <div className="flex items-center gap-3 mb-2">
                   <h3 className="text-xl font-bold text-text-primary">v1.0.4 - Final Hotfix</h3>
                   <span className="text-xs font-semibold bg-accent-muted text-accent px-2 py-1 rounded-md">Latest</span>
                 </div>
                 <p className="text-text-secondary text-sm leading-relaxed">Fixed the installation process to properly unpack native system binaries recursively while keeping JS source files compressed. Stability is guaranteed, hopefully!</p>
               </div>
            </div>

            <div className="flex gap-6 p-6 rounded-2xl bg-surface border border-border-custom/50 hover:shadow-md transition-shadow opacity-75">
               <div className="hidden sm:flex flex-col items-center">
                 <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center text-text-muted font-bold text-sm mb-2 pt-1 uppercase tracking-wider">v1</div>
                 <div className="w-0.5 h-full bg-border-custom/50 rounded-full"></div>
               </div>
               <div>
                 <div className="flex items-center gap-3 mb-2">
                   <h3 className="text-xl font-bold text-text-primary">v1.0.3 - Hotfix</h3>
                 </div>
                 <p className="text-text-secondary text-sm leading-relaxed">Fixed the installation process to properly unpack native system binaries recursively while keeping JS source files compressed</p>
               </div>
            </div>
            <div className="flex gap-6 p-6 rounded-2xl bg-surface border border-border-custom/50 hover:shadow-md transition-shadow opacity-75">
               <div className="hidden sm:flex flex-col items-center">
                 <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center text-text-muted font-bold text-sm mb-2 pt-1 uppercase tracking-wider">v1</div>
                 <div className="w-0.5 h-full bg-border-custom/50 rounded-full"></div>
               </div>
               <div>
                 <div className="flex items-center gap-3 mb-2">
                   <h3 className="text-xl font-bold text-text-primary">v1.0.1 - Engine Upgrade</h3>
                 </div>
                 <p className="text-text-secondary text-sm leading-relaxed">Swapped legacy PowerShell wallpaper scripts for a seamless, cross-platform module. Poster now sets wallpapers significantly faster and lays the foundation for future Mac support.</p>
               </div>
            </div>
            
            <div className="flex gap-6 p-6 rounded-2xl bg-surface border border-border-custom/50 hover:shadow-md transition-shadow opacity-75">
               <div className="hidden sm:flex flex-col items-center">
                 <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center text-text-muted font-bold text-sm mb-2 pt-1 uppercase tracking-wider">v1</div>
               </div>
               <div>
                 <div className="flex items-center gap-3 mb-2">
                   <h3 className="text-xl font-bold text-text-primary">v1.0.0 - Initial Release</h3>
                 </div>
                 <p className="text-text-secondary text-sm leading-relaxed">The very first official launch of Poster! Complete with our fluid UI, high-fidelity local scaling via Sharp, and instant wallpaper applications.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-surface overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent skew-x-12 translate-x-1/2 opacity-40"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-[1.2] text-text-primary">Ready to transform your desktop?</h2>
          <p className="text-lg opacity-70 mb-12 max-w-2xl mx-auto text-text-secondary font-medium">Download Poster today and start building your perfect wallpaper collection.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleDownload} className="cursor-pointer bg-accent text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-accent-light transition-all shadow-lg hover:shadow-accent/20">
              Download Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border-custom">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Poster Logo" width={24} height={24} />
            <span className="font-bold text-lg tracking-tight text-text-primary">Poster</span>
          </div>
          <p className="text-text-muted text-sm font-medium">
            Made with <span className="text-red-500">❤️</span> by <a href="https://nueldotdev.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-bold">nueldotdev</a>
          </p>
          <div className="flex items-center gap-6 text-sm text-text-secondary font-medium">
            <a href="https://github.com/nueldotdev/Poster" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
