import { useState } from "react";
import { useCases } from "../context/CaseContext";
import { useNavigate } from "react-router-dom";
import { users } from "../data/mockData";
import { Scale, FileText, Calendar, User } from "lucide-react";

export default function NewCase() {
  const { addCase } = useCases();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    status: "Active",
    nextHearing: "",
    assignedJudgeId: "",
    assignedLawyerId: "",
    clientId: "",
    documents: []
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.id || !form.title) {
      alert("Case ID and Title are required!");
      return;
    }

    addCase(form);
    navigate("/cases", { state: { message: "New case created successfully!" } });
  }

  return (
  <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
    <div className="bg-white shadow-xl rounded-lg border border-gray-300 w-full max-w-3xl">

      {/* HEADER */}
      <div className="bg-purple-700 text-white p-6 flex items-center gap-3">
        <Scale size={32} />
        <h1 className="text-3xl font-bold">Register New Court Case</h1>
      </div>

      {/* IMPORTANT: FORM STARTS */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">

        {/* CASE INFO */}
        <div>
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Case Information</h2>

          <div className="grid grid-cols-2 gap-4">

            <input
              name="id"
              placeholder="Case ID"
              onChange={handleChange}
              className="border p-3 rounded-lg shadow"
              required
            />

            <div className="flex items-center gap-2 border p-3 rounded-lg shadow bg-gray-50">
              <FileText size={18} className="text-purple-600" />
              <input
                name="title"
                placeholder="Case Title"
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            <textarea
              name="description"
              placeholder="Enter case description..."
              onChange={handleChange}
              className="col-span-2 border p-3 h-28 rounded-lg shadow"
            />
          </div>
        </div>

        {/* HEARING DETAILS */}
        <div>
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Hearing Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow bg-gray-50">
              <Calendar size={18} className="text-purple-600" />
              <input
                type="date"
                name="nextHearing"
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
              />
            </div>

            <select
              name="status"
              onChange={handleChange}
              className="border p-3 rounded-lg shadow bg-gray-50"
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        {/* ASSIGN ROLES */}
        <div>
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Assign Roles</h2>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="assignedJudgeId"
              onChange={handleChange}
              className="border p-3 rounded-lg shadow bg-gray-50"
            >
              <option value="">Select Judge</option>
              {users.filter(u => u.role === "Judge").map(j => (
                <option key={j.id} value={j.id}>{j.name}</option>
              ))}
            </select>

            <select
              name="assignedLawyerId"
              onChange={handleChange}
              className="border p-3 rounded-lg shadow bg-gray-50"
            >
              <option value="">Select Lawyer</option>
              {users.filter(u => u.role === "Lawyer").map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>

            <select
              name="clientId"
              onChange={handleChange}
              className="col-span-2 border p-3 rounded-lg shadow bg-gray-50"
            >
              <option value="">Select Client</option>
              {users.filter(u => u.role === "Person").map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div>
  <label className="font-semibold text-gray-700 mb-1 block">Upload Documents</label>

  <input
  type="file"
  multiple
  onChange={(e) => {
    const fileArray = Array.from(e.target.files).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setForm({ ...form, documents: fileArray });
  }}
  className="border p-3 w-full rounded-lg shadow bg-gray-50"
/>

</div>

          </div>
        </div>

        {/* SUBMIT BUTTON - FIXED */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-3 rounded-lg text-lg font-bold shadow hover:bg-purple-800 transition"
        >
          Submit Case
        </button>

      </form>
      {/* IMPORTANT: FORM ENDS */}

    </div>
  </div>
)};
