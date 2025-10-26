"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code2, DollarSign, Rocket } from "lucide-react";

const steps = [
    {
        icon: Code2,
        number: "01",
        title: "Make a Project",
        description: "Create your project on our website in seconds. No blockchain expertise needed.",
        code: "// Create project on PayAPI",
    },
    {
        icon: DollarSign,
        number: "02",
        title: "Paste Code Snippet",
        description: "Drop our simple code snippet into your API. That's it. We handle everything else.",
        code: "<script src='payapi.js'></script>",
    },
    {
        icon: Rocket,
        number: "03",
        title: "Done!",
        description: "Start earning immediately. Track revenue in real-time. No blockchain expertise required.",
        code: "// You're live! 🚀",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-32 px-4 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20 space-y-4"
                >
                    <h2 className="text-5xl md:text-6xl font-bold">
                        <span className="text-foreground">Three Steps.</span>
                        <br />
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Infinite Revenue.
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        No blockchain expertise needed. No complex setup. Just pure profit.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="relative p-8 bg-card/30 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-500 group h-full overflow-hidden">
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                {/* Spotlight effect */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                <div className="relative space-y-6">
                                    {/* Number badge */}
                                    <div className="flex items-start justify-between">
                                        <div className="text-7xl font-bold text-primary/10 leading-none">
                                            {step.number}
                                        </div>
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300">
                                            <step.icon className="w-7 h-7 text-primary" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-bold text-foreground">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Code snippet */}
                                    <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border/50 font-mono text-sm text-accent">
                                        {step.code}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
