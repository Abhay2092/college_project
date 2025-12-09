import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { cases as initialCases, users } from '../data/mockData';
import { Search, Plus, FileText, Upload, Gavel } from 'lucide-react';

const CaseManagement = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState(initialCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);

  const fileInputRef = useRef(null); // file input reference

  // 🔹 Handle uploading actual file name
  const handleFileSelect = (event, caseId) => {
    const file = event.target.files[0];
    if (!file) return;

    const newDoc = {
      id: `doc${Date.now()}`,
      name: file.name,
      date: new Date().toISOString().split("T")[0]
    };

    setCases(cases.map(c =>
      c.id === caseId ? { ...c, documents: [...c.documents, newDoc] } : c
    ));

    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase({ ...selectedCase, documents: [...selectedCase.documents, newDoc] });
    }
  };

  // 🔹 Update status
  const handleStatusUpdate = (caseId, newStatus) => {
    setCases(cases.map(c => c.id === caseId ? { ...c, status: newStatus } : c));
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase({ ...selectedCase, status: newStatus });
    }
  };

  // 🔹 Filtered cases based on role & search
  const filteredCases = cases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (user.role === 'Admin') return true;
    if (user.role === 'Judge') return c.assignedJudgeId === user.id;
    if (user.role === 'Lawyer') return c.assignedLawyerId === user.id;
    if (user.role === 'Person') return c.clientId === user.id;
    return false;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Case Management</h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
            />
          </div>
          
          {user.role === 'Admin' && (
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus size={18} />
              <span className="hidden sm:inline">New Case</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Case List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-700">Cases List ({filteredCases.length})</h3>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {filteredCases.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  selectedCase?.id === c.id
                    ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                    : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-800 line-clamp-1">{c.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    c.status === 'Active' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    c.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{c.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{c.id}</span>
                  <span>{c.nextHearing || 'No hearing'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
          {selectedCase ? (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedCase.title}</h3>
                  <p className="text-sm text-gray-500">Case ID: {selectedCase.id}</p>
                </div>

                {/* Status Dropdown */}
                {(user.role === 'Judge' || user.role === 'Admin') && (
                  <select
                    value={selectedCase.status}
                    onChange={(e) => handleStatusUpdate(selectedCase.id, e.target.value)}
                    className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">

                {/* Documents */}
                <section>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex justify-between items-center">
                    Documents
                    {(user.role === 'Lawyer' || user.role === 'Admin') && (
                      <>
                        <button
                          onClick={() => fileInputRef.current.click()}
                          className="text-indigo-600 hover:text-indigo-700 text-xs flex items-center gap-1"
                        >
                          <Upload size={14} /> Upload
                        </button>

                        {/* Hidden File Input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={(e) => handleFileSelect(e, selectedCase.id)}
                        />
                      </>
                    )}
                  </h4>

                  <div className="space-y-2">
                    {selectedCase.documents.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{doc.name}</p>
                            <p className="text-xs text-gray-400">{doc.date}</p>
                          </div>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">View</button>
                      </div>
                    ))}
                    {selectedCase.documents.length === 0 && (
                      <p className="text-sm text-gray-400 italic">No documents attached.</p>
                    )}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Gavel size={48} className="mb-4 opacity-20" />
              <p>Select a case to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseManagement;
