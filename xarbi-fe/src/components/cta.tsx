"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
    "No credit card required",
    "14-day free trial",
    "Deploy in under 60 seconds",
    "Cancel anytime",
];

const CTA = () => {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />

            <div className="relative max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative p-12 md:p-16 rounded-3xl bg-card/50 backdrop-blur-2xl border border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden"
                >
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

                    <div className="relative text-center space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-6xl font-bold">
                                <span className="block text-foreground mb-2">Ready to</span>
                                <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                                    Start Earning?
                                </span>
                            </h2>

                            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
                                Join thousands of developers monetizing their APIs with zero setup.
                            </p>
                        </div>

                        {/* Benefits grid */}
                        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                            {benefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="flex items-center gap-2 justify-center"
                                >
                                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-accent" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA button */}
                        <div className="flex justify-center items-center pt-6">
                            <Button
                                size="lg"
                                className="relative group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-lg font-semibold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow opacity-0 group-hover:opacity-100 transition-opacity rounded-lg blur-xl" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
