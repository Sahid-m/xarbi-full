import { Github, MessageCircle, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl shadow-lg shadow-primary/20">
                            ⚡
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            PayAPI
                        </span>
                    </div>

                    <p className="text-muted-foreground text-sm">
                        © 2024 PayAPI. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                            <MessageCircle className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
