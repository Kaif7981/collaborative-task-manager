import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 animate-fadeIn">
        <Login />
        <Register />
      </div>
    </div>
  );
}

export default App;
