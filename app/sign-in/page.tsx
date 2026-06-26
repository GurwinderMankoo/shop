import SignIn from "./_SignIn";
export default function SignInMain() {
    return (
        <div className="grid min-h-screen lg:grid-cols-2 bg-background">

            {/* Left Side: Features the diagonal slash on large screens */}
            {/* Left Side */}
            <div className="hidden lg:flex flex-col justify-center p-12 relative">
                {/* Diagonal background via pseudo */}
                <div
                    className="absolute inset-0 bg-muted"
                    style={{ clipPath: 'polygon(0 0, 70% 0, 100% 100%, 0 100%)' }}
                    aria-hidden="true"
                />
                <div className="max-w-md relative z-10 p-4">
                    <h1 className="text-4xl font-bold">Your Store</h1>
                    <p className="mt-4 text-muted-foreground">
                        Shop thousands of products with secure checkout and fast delivery.
                    </p>
                </div>
            </div>

            {/* Right Side: Centered SignInCard */}
            <div className="flex items-center justify-center p-6 lg:-ml-[15%] relative z-10">
                {/* lg:-ml-[15%] pulls the form slightly left to perfectly balance 
                  and tuck into the empty space created by the diagonal cut.
                */}
                <SignIn />
            </div>
        </div>
    )
}