"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [division, setDivision] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editingID, setEditingID] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch("api/employee");
    const data = await response.json();
    setEmployees(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingID) {
      await handleUpdate(e);
      return;
    }
    const employee ={name, email, division};
    const response = await fetch("api/employee", {
      method: "POST",
      headers:{
        "Content-Type" : "application/json" 
      },
      body: JSON.stringify(employee)
    });
    await response.json();
      setName("");
      setEmail("");
      setDivision("");;
    await fetchEmployees();
  };

  const deleteEmployee = async (id) =>{
    const response = await fetch(`api/employee/${id}`,{
      method: "DELETE"
    }
  );
    const result = await response.json();
    console.log(result);
    await fetchEmployees()
  };

  const handleEdit = (employee) =>{
    setName(employee.name);
    setEmail(employee.email);
    setDivision(employee.division);
    setEditingID(employee.id);
  };

  const handleUpdate = async (e) =>{
    e.preventDefault();

    const employee= {name,email,division};
    const response = await fetch(`api/employee/${editingID}`,{
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(employee)
      });
      await response.json();
      setEditingID(null);
      setName("");
      setEmail("");
      setDivision("");
      await fetchEmployees();
  };


  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Employee Management
          </h1>
          <p className="text-slate-600">Kelola data karyawan dengan mudah</p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            {editingID ? "Edit Karyawan" : "Tambah Karyawan"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Masukkan nama"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Masukkan email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Divisi</label>
              <input
                type="text"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Masukkan divisi"
              />
            </div>

            <button 
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition duration-200 ${
                editingID 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {editingID ? "Update Karyawan" : "Simpan Karyawan"}
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          <div className="px-8 py-6 border-b border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800">Daftar Karyawan</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nama</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Divisi</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                      Tidak ada data karyawan
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">{employee.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{employee.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{employee.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {employee.division}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-center space-x-2">
                        <button 
                          onClick={() => handleEdit(employee)}
                          className="inline-px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-xs"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteEmployee(employee.id)}
                          className="inline-px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-xs"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
