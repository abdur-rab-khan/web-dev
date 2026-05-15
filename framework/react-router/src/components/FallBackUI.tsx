function FallBackUI() {
  return (
    <div className="flex items-center justify-center min-h-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center space-y-8 px-4">
        {/* Animated spinner */}
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
          </div>
        </div>

        {/* Loading text */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Loading
          </h1>
          <div className="flex justify-center gap-1">
            <span
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></span>
            <span
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg">
          Please wait while we prepare your content...
        </p>
      </div>
    </div>
  );
}

export default FallBackUI;
