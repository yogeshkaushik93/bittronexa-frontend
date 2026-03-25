"use client";
import { useEffect, useState } from "react";
import { getROiPercentageForAdmin } from "../../api/admin-api";
import { backendConfig } from "../../constants/content/MainContent";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  .roi-root {
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
    // background: #0a0a0f;
    color: #e8e8f0;
    padding: 2rem 1rem;
    position: relative;
    overflow-x: hidden;
  }

  .roi-root::before {
    content: '';
    position: fixed;
    top: -200px;
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .roi-root::after {
    content: '';
    position: fixed;
    bottom: -200px;
    left: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .roi-inner {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .roi-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  .roi-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: clamp(1.2rem, 1.5vw, 0.75rem);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6366f1;
    margin-bottom: 0.4rem;
  }

  .roi-title {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    line-height: 1.1;
    background: linear-gradient(135deg, #e8e8f0 30%, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }

  .roi-badge {
    align-self: flex-start;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.3);
    color: #a5b4fc;
    font-family: 'DM Mono', monospace;
    font-size: clamp(0.7rem, 1.5vw, 0.8rem);
    padding: 0.4rem 1rem;
    border-radius: 999px;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  /* Form Card */
  .roi-form-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;
  }

  .roi-form-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent);
    transition: background 0.3s;
  }

  .editing-active .roi-form-card {
    border-color: rgba(245,158,11,0.3);
  }

  .editing-active .roi-form-card::before {
    background: linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent);
  }

  .roi-form-label {
    font-family: 'DM Mono', monospace;
    font-size: 1.3rem;
    font-weight: 700;
    color: #a5b4fc;
    margin-bottom: 1.25rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .roi-form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .roi-input-wrap { position: relative; }

  .roi-input-tag {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-family: 'DM Mono', monospace;
    font-size: .75rem;
    color: #6366f1;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    pointer-events: none;
  }

  .roi-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 1.1rem 1rem 0.6rem 3.5rem;
    color: #e8e8f0;
    font-family: 'DM Mono', monospace;
    font-size: clamp(1.2rem, 2vw, 1.1rem);
    font-weight: 500;
    outline: none;
    transition: all 0.25s;
    box-sizing: border-box;
  }

  .roi-input:focus {
    border-color: rgba(99,102,241,0.6);
    background: rgba(99,102,241,0.07);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }

  .roi-input::placeholder { color: rgba(255,255,255,0.2); }
  .roi-input::-webkit-inner-spin-button,
  .roi-input::-webkit-outer-spin-button { -webkit-appearance: none; }
  .roi-input[type=number] { -moz-appearance: textfield; }

  .roi-btn-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .roi-submit-btn {
    padding: 0.85rem 2.5rem;
    border: none;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.2rem, 2vw, 1rem);
    font-weight: 700;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: all 0.25s;
  }

  .roi-submit-btn.add {
    background: linear-gradient(135deg, #6366f1, #818cf8);
    color: white;
    box-shadow: 0 4px 20px rgba(99,102,241,0.35);
  }
  .roi-submit-btn.add:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99,102,241,0.5);
  }

  .roi-submit-btn.edit {
    background: linear-gradient(135deg, #d97706, #f59e0b);
    color: white;
    box-shadow: 0 4px 20px rgba(217,119,6,0.35);
  }
  .roi-submit-btn.edit:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(217,119,6,0.5);
  }

  .roi-cancel-btn {
    background: none;
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.4);
    border-radius: 12px;
    padding: 0.85rem 1.5rem;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
    font-size: clamp(0.85rem, 2vw, 0.95rem);
    font-weight: 600;
    transition: all 0.2s;
  }
  .roi-cancel-btn:hover {
    border-color: rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.65);
  }

  /* Table */
  .roi-table-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }

  .roi-table-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent);
  }

  .roi-table-header {
    padding: 1.5rem clamp(1.2rem, 3vw, 2rem);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .roi-table-header-title {
    font-size: clamp(0.9rem, 2vw, 1.05rem);
    font-weight: 700;
    color: #e8e8f0;
  }

  .roi-count-pill {
    background: rgba(16,185,129,0.15);
    border: 1px solid rgba(16,185,129,0.25);
    color: #34d399;
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
  }

  .roi-table-wrap { overflow-x: auto; }

  .roi-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 560px;
  }

  .roi-thead th {
    padding: 1rem clamp(1rem, 2.5vw, 1.75rem);
    font-family: 'DM Mono', monospace;
    font-size: clamp(1.5rem, 1.5vw, 1rem);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.35);
    text-align: left;
    font-weight: 500;
    white-space: nowrap;
    background: rgba(0,0,0,0.2);
  }

  .roi-row {
    border-top: 1px solid rgba(255,255,255,0.05);
    transition: background 0.2s;
  }
  .roi-row:hover { background: rgba(99,102,241,0.04); }

  .roi-td {
    padding: 1.1rem clamp(1rem, 2.5vw, 1.75rem);
    vertical-align: middle;
  }

  .roi-amount {
    font-family: 'DM Mono', monospace;
    font-size: clamp(1.4rem, 2vw, 1.5rem);
    color: #e8e8f0;
    font-weight: 500;
  }
  .roi-amount span {
    color: rgba(255,255,255,0.3);
    font-size: 1.4em;
    margin-right: 2px;
  }

  .roi-percent-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: rgba(99,102,241,0.15);
    border: 1px solid rgba(99,102,241,0.25);
    color: #a5b4fc;
    font-family: 'DM Mono', monospace;
    font-size: clamp(1.4rem, 2vw, 1rem);
    font-weight: 500;
    padding: 0.3rem 0.8rem;
    border-radius: 8px;
  }

  .roi-status {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: clamp(1.2rem, 1.8vw, 0.85rem);
    font-weight: 600;
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }
  .roi-status.active {
    background: rgba(16,185,129,0.12);
    border: 1px solid rgba(16,185,129,0.25);
    color: #34d399;
  }
  .roi-status.inactive {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.2);
    color: #f87171;
  }
  .roi-status-dot { width: 6px; height: 6px; border-radius: 50%; }
  .active .roi-status-dot { background: #34d399; }
  .inactive .roi-status-dot { background: #f87171; }

  .roi-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }

  .roi-action-btn {
    padding: 0.5rem 1.1rem;
    border: none;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.2rem, 1.8vw, 0.88rem);
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }
  .roi-action-btn.edit-btn {
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.25);
    color: #fbbf24;
  }
  .roi-action-btn.edit-btn:hover {
    background: rgba(245,158,11,0.22);
    transform: translateY(-1px);
  }
  .roi-action-btn.del-btn {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.2);
    color: #f87171;
  }
  .roi-action-btn.del-btn:hover {
    background: rgba(239,68,68,0.2);
    transform: translateY(-1px);
  }

  .roi-empty {
    text-align: center;
    padding: 3.5rem 1rem;
    color: rgba(255,255,255,0.25);
    font-size: clamp(1.2rem, 2vw, 1rem);
    font-family: 'DM Mono', monospace;
  }

  @media (max-width: 480px) {
    .roi-root { padding: 1.25rem 0.75rem; }
    .roi-actions { gap: 0.4rem; }
    .roi-action-btn { padding: 0.45rem 0.85rem; }
  }
`;

function Roi() {
  const [slabs, setSlabs] = useState([]);
  const [form, setForm] = useState({
    minAmount: "",
    maxAmount: "",
    percent: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch slabs
  const fetchSlabs = async () => {
    const res = await getROiPercentageForAdmin();
    setSlabs(res.data);
  };

  useEffect(() => {
    fetchSlabs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${backendConfig.base}/admin/roi-slab`;
    const payload = editingId
      ? { ...form, _id: editingId } // include ID if editing
      : { ...form };

    // Get token from localStorage (or wherever you store it)
    const token = localStorage.getItem("token");

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ send token in header
      },
      body: JSON.stringify(payload),
    });

    setForm({ minAmount: "", maxAmount: "", percent: "" });
    setEditingId(null);
    fetchSlabs();
  };

  const handleEdit = (slab) => {
    setForm({
      minAmount: slab.minAmount,
      maxAmount: slab.maxAmount,
      percent: slab.percent,
    });
    setEditingId(slab._id);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    await fetch(`/api/admin/roi-slab/${id}`, { method: "DELETE" });
    fetchSlabs();
  };

  const formatAmount = (val) => Number(val).toLocaleString("en-IN");

  return (
    <>
      <style>{style}</style>
      <div className={`roi-root${editingId ? " editing-active" : ""}`}>
        <div className="roi-inner">
          {/* Header */}
          <div className="roi-header">
            <div>
              <div className="roi-eyebrow">Admin Panel</div>
              <h1 className="roi-title">ROI Slab Management</h1>
            </div>
            <div className="roi-badge">
              {slabs.filter((s) => s.isActive).length} Active Slabs
            </div>
          </div>

          {/* 🧾 Form */}
          <div className="roi-form-card">
            <div className="roi-form-label">
              {editingId ? "✦ Edit Existing Slab" : "✦ Add New Slab"}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="roi-form-grid">
                <div className="roi-input-wrap">
                  <span className="roi-input-tag">Min ₹</span>
                  <input
                    type="number"
                    placeholder="e.g. 1000"
                    value={form.minAmount}
                    onChange={(e) =>
                      setForm({ ...form, minAmount: e.target.value })
                    }
                    className="roi-input"
                    required
                  />
                </div>
                <div className="roi-input-wrap">
                  <span className="roi-input-tag">Max ₹</span>
                  <input
                    type="number"
                    placeholder="e.g. 50000"
                    value={form.maxAmount}
                    onChange={(e) =>
                      setForm({ ...form, maxAmount: e.target.value })
                    }
                    className="roi-input"
                    required
                  />
                </div>
                <div className="roi-input-wrap">
                  <span className="roi-input-tag">ROI %</span>
                  <input
                    type="number"
                    placeholder="e.g. 12"
                    value={form.percent}
                    onChange={(e) =>
                      setForm({ ...form, percent: e.target.value })
                    }
                    className="roi-input"
                    required
                  />
                </div>
              </div>
              <div className="roi-btn-row">
                <button
                  type="submit"
                  className={`roi-submit-btn ${editingId ? "edit" : "add"}`}
                >
                  {editingId ? "Update Slab" : "+ Add Slab"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="roi-cancel-btn"
                    onClick={() => {
                      setEditingId(null);
                      setForm({ minAmount: "", maxAmount: "", percent: "" });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* 📊 Table */}
          <div className="roi-table-card">
            <div className="roi-table-header">
              <span className="roi-table-header-title">Configured Slabs</span>
              <span className="roi-count-pill">{slabs.length} total</span>
            </div>
            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead className="roi-thead">
                  <tr>
                    <th>Min Amount</th>
                    <th>Max Amount</th>
                    <th>Monthly ROI</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slabs.map((slab) => (
                    <tr key={slab._id} className="roi-row">
                      <td className="roi-td">
                        <span className="roi-amount">
                          <span>₹</span>
                          {formatAmount(slab.minAmount)}
                        </span>
                      </td>
                      <td className="roi-td">
                        <span className="roi-amount">
                          <span>₹</span>
                          {formatAmount(slab.maxAmount)}
                        </span>
                      </td>
                      <td className="roi-td">
                        <span className="roi-percent-badge">
                          ↑ {slab.percent}%
                        </span>
                      </td>
                      <td className="roi-td">
                        <span
                          className={`roi-status ${slab.isActive ? "active" : "inactive"}`}
                        >
                          <span className="roi-status-dot"></span>
                          {slab.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="roi-td">
                        <div className="roi-actions">
                          <button
                            onClick={() => handleEdit(slab)}
                            className="roi-action-btn edit-btn"
                          >
                            Edit
                          </button>
                          {/* <button
                            onClick={() => handleDelete(slab._id)}
                            className="roi-action-btn del-btn"
                          >
                            Delete
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {slabs.length === 0 && (
                    <tr>
                      <td colSpan="5" className="roi-empty">
                        — No slabs configured yet —
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Roi;
