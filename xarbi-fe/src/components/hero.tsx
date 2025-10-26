"use client";

import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/ui/grid-background";
import { Spotlight } from "@/components/ui/spotlight";
import { TextRotate } from "@/components/ui/text-rotate";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <GridBackground />
            <Spotlight />

            {/* Gradient orbs */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse delay-1000" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-12">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/50 border border-primary/20 backdrop-blur-xl shadow-lg shadow-primary/5">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium">Powered by Arbitrum × Coinbase x402</span>
                        </div>
                    </motion.div>

                    {/* Main headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
                            <TextRotate
                                texts={[
                                    "Monetize APIs In Seconds",
                                    "You Handle Business, We Handle Complexity",
                                    "Turn Code Into Cash",
                                    "Zero Setup, Infinite Revenue"
                                ]}
                                className="block bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent min-h-[1.2em]"
                                interval={3500}
                            />
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                            Drop in a code snippet. Start earning in seconds. Built on Arbitrum with Coinbase&apos;s x402 protocol.
                        </p>

                        <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <p className="text-lg font-semibold text-accent">NO Blockchain Expertise Needed</p>
                        </div>
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
                    >
                        <Button
                            size="lg"
                            className="relative group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Free Trial
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow opacity-0 group-hover:opacity-100 transition-opacity rounded-lg blur-xl" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-border bg-background/50 backdrop-blur-sm hover:bg-secondary/50 px-8 py-6 text-lg font-medium transition-all"
                        >
                            Watch Demo
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16 border-t border-border/50"
                    >
                        {[
                            { value: "<1s", label: "Settlement Time" },
                            { value: "0.1%", label: "Transaction Fee" },
                            { value: "24/7", label: "Uptime" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
