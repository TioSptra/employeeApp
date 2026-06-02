"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [division, setDivision] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data yang diinput, misalnya kirim ke server
    const employee ={name, email, division};
    const response = await fetch("api/employee", {
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(employee)
    });
    const result = await response.json();
    console.log(result);
  };
  return (
    <main>
      <h1>Employee Registration</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama</label>
          <br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <br />

        <div>
          <label>Divisi</label>
          <br />
          <input type="text" value={division} onChange={(e) => setDivision(e.target.value)} />
        </div>

        <br />

        <button type="submit">Simpan</button>
      </form>
      <h3>Preview</h3>
      <p>Nama : {name}</p>
      <p>Email : {email}</p>
      <p>Divisi : {division}</p>
    </main>
  );
}
