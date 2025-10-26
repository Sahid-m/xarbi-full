import DashboardClient from "@/components/dashboard";
import { syncUser } from "@/lib/sync-user";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
    const { userId } = await auth();
    if (!userId) return <p className="p-6">Please sign in first.</p>;

    // Sync the user with DB
    const user = await syncUser();

    return <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <DashboardClient />
    </div>;
}

// ✅ Client-side part (project management UI)
