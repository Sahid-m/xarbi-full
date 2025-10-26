import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5" />
            <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col items-center space-y-8 w-full max-w-md px-4">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-foreground">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to continue to your dashboard</p>
                </div>

                <div className="w-full rounded-lg bg-card p-8 shadow-xl border border-border/50 backdrop-blur-sm">
                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "mx-auto w-full",
                                card: "bg-transparent shadow-none",
                                headerTitle: "text-foreground text-xl font-semibold",
                                headerSubtitle: "text-muted-foreground",
                                socialButtonsBlockButton:
                                    "bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                                socialButtonsBlockButtonText: "font-medium",
                                formButtonPrimary:
                                    "bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30",
                                formFieldInput:
                                    "bg-background text-foreground border border-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",
                                formFieldLabel: "text-foreground font-medium",
                                footerActionText: "text-muted-foreground",
                                footerActionLink: "text-blue-600 hover:text-blue-700 font-medium transition-colors",
                                identityPreviewText: "text-foreground",
                                identityPreviewEditButton: "text-blue-600 hover:text-blue-700",
                                formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground",
                                otpCodeFieldInput: "border-border text-foreground",
                                formResendCodeLink: "text-blue-600 hover:text-blue-700",
                                dividerLine: "bg-border",
                                dividerText: "text-muted-foreground",
                            },
                        }}
                        forceRedirectUrl="/dashboard"
                    />
                </div>

                <p className="text-sm text-muted-foreground text-center">Secure authentication powered by Clerk</p>
            </div>
        </div>
    )
}
