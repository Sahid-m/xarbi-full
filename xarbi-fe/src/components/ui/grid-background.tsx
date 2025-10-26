import { cn } from "@/lib/utils";

export const GridBackground = ({ className }: { className?: string }) => {
    return (
        <div className={cn("absolute inset-0 -z-10", className)}>
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"
            />
        </div>
    );
};
