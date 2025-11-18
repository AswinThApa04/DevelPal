export default function Home() {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Organize Your Work.  
            <span className="text-blue-600 dark:text-blue-400"> Stay Productive.</span>
          </h1>
  
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            DevPal helps you manage tasks, track progress, and stay focused with a clean and powerful productivity dashboard.
          </p>
  
          <div className="mt-8 flex justify-center gap-4">
            <a 
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            >
              Get Started
            </a>
            <a 
              href="/login"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-lg text-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Login
            </a>
          </div>
        </section>
  
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center">Why DevPal?</h2>
  
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
              <h3 className="text-xl font-semibold mb-3"> Simple & Clean</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Minimal UI that helps you focus on what matters — your work.
              </p>
            </div>
  
            <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
              <h3 className="text-xl font-semibold mb-3"> Smart Task System</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create, update, and organize tasks with ease.
              </p>
            </div>
  
            <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
              <h3 className="text-xl font-semibold mb-3"> Dark Mode</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Beautiful dark mode for working late nights.
              </p>
            </div>
  
          </div>
        </section>
  
        <footer className="text-center py-6 text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} DevPal • Built by Aswin Thapa
        </footer>
  
      </div>
    );
  }
  