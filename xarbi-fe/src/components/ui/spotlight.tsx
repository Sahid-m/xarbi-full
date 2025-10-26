import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Spotlight = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className={cn(
                "absolute -top-40 left-0 md:-top-20 md:left-60 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[100px]",
                className
            )}
        />
    );
};
