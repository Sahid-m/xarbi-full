"use client";
import { motion } from "framer-motion";

const TechStack = () => {
    return (
        <section className="py-32 px-4 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        Powered by the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Best</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Built on battle-tested infrastructure trusted by millions
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Arbitrum */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />
                        <div className="relative p-10 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/20 border border-primary/30 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                                    🔷
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-foreground">Arbitrum</h3>
                                    <p className="text-muted-foreground">Layer 2 Scaling</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                Lightning-fast transactions with Ethereum security. Average cost under $0.01.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
                                    95%+ Lower Fees
                                </div>
                                <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium">
                                    2000+ TPS
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Coinbase x402 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />
                        <div className="relative p-10 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 hover:border-accent/50 transition-all duration-300">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                                    💳
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-foreground">x402</h3>
                                    <p className="text-muted-foreground">by Coinbase</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                Revolutionary protocol for HTTP-402 micropayments at internet scale.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium">
                                    Instant Settlement
                                </div>
                                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
                                    Zero Friction
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
