import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">
        Create Account
      </h2>
      <p className="text-gray-500 mb-6">
        Start collaborating today
      </p>

      <div className="space-y-4">
        <input
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition">
          Register
        </button>
      </div>
    </div>
  );
}
