"use client";
import { motion } from "framer-motion";
import { BarChart3, Globe, Shield, Zap } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Sub-second settlements on Arbitrum L2. Zero friction for your users.",
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Military-grade encryption. Your keys, your control. Fully decentralized.",
    },
    {
        icon: Globe,
        title: "Global Scale",
        description: "Accept payments anywhere. No borders, no banks, no conversion fees.",
    },
    {
        icon: BarChart3,
        title: "Real-Time Analytics",
        description: "Beautiful dashboards. Track every request, every payment, every penny.",
    },
];

const Features = () => {
    return (
        <section className="py-32 px-4 relative overflow-hidden bg-secondary/20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

            <div className="relative max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        Built for <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Scale</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to monetize at internet speed
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative p-8 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300">
                                    <feature.icon className="w-8 h-8 text-primary" />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-foreground mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
