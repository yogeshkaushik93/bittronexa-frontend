// import { useState } from "react";
// import { ShieldCheck, AlertTriangle } from "lucide-react";

// const PrincipalTerms = ({ onClose, onAgree }) => {
//     const [checked, setChecked] = useState(false);

//     return (
//         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="w-full max-w-5xl bg-[#0B0F19] text-gray-200 rounded-2xl shadow-2xl border !border-gray-700 flex flex-col max-h-[90vh]">

//                 <div className="flex justify-between items-center rounded-2xl px-8 py-4 border-b border-gray-700 sticky top-0 bg-[#0B0F19] z-10">
//                     <h2 className="text-3xl font-bold text-white tracking-wide">
//                         Principal Withdrawal Terms
//                     </h2>
//                     <button onClick={onClose} className="text-gray-200 hover:text-white text-3xl">✕</button>
//                 </div>

//                 {/* Content */}
//                 <div className="p-8 overflow-y-auto space-y-8 text-base leading-relaxed">
//                     <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-xl border !border-cyan-500/20">
//                         <p className="text-cyan-400 font-semibold text-2xl">Bittronexa.com</p>
//                         <p className="text-lg text-gray-300">Last Updated: 6 February 2026</p>
//                     </div>
//                     <p className="text-gray-300 text-lg">
//                         By clicking <span className="text-cyan-400 font-semibold">“I Agree & Proceed”</span>, you confirm that you understand and accept all terms.
//                     </p>

//                     {/* Sections */}
//                     <Section title="1. Nature of Withdrawal">
//                         <li>Only original invested amount can be withdrawn</li>
//                         <li>Separate from rewards & bonuses</li>
//                         <li className="text-red-400">Irreversible once submitted</li>
//                     </Section>

//                     <Section title="2. User Roles">
//                         <li>Users, Investors, Leaders</li>
//                         <li>All treated equally</li>
//                     </Section>

//                     {/* Table */}
//                     <div className="bg-[#111827] p-6 rounded-xl border !border-gray-700">
//                         <h3 className="text-2xl font-semibold mb-4 text-white">Deduction Policy</h3>

//                         <div className="overflow-hidden rounded-lg border !border-gray-700">
//                             <table className="w-full text-sm">
//                                 <thead className="bg-[#1F2937] text-gray-300">
//                                     <tr>
//                                         <th className="p-4 text-left">Time</th>
//                                         <th className="p-4 text-left">Deduction</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr className="border-t border-gray-700">
//                                         <td className="p-4">0–90 days</td>
//                                         <td className="p-4 text-red-400 font-semibold">15%</td>
//                                     </tr>
//                                     <tr className="border-t border-gray-700">
//                                         <td className="p-4">91–180 days</td>
//                                         <td className="p-4 text-orange-400 font-semibold">10%</td>
//                                     </tr>
//                                     <tr className="border-t border-gray-700">
//                                         <td className="p-4">After 180 days</td>
//                                         <td className="p-4 text-green-400 font-semibold">0%</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>

//                     <Section title="3. Principal Burning">
//                         <li>TP = Total rewards</li>
//                         <li>Max cap = 300%</li>
//                         <li>P1 = TP / 2</li>
//                         <li>Principal = Principal – P1</li>
//                     </Section>

//                     <Section title="4. Final Calculation">
//                         <li>Before 180 days: Deduction + Burning</li>
//                         <li>After 180 days: Only Burning</li>
//                     </Section>

//                     {/* Risk Card */}
//                     <div className="bg-red-500/10 border !border-red-500/20 p-6 rounded-xl">
//                         <div className="flex items-center gap-2 mb-3">
//                             <AlertTriangle className="text-red-400" />
//                             <h3 className="text-2xl font-semibold text-red-400">Risk Notice</h3>
//                         </div>
//                         <ul className="space-y-1 text-gray-300">
//                             <li>Digital assets are high risk</li>
//                             <li>Delays & liquidity issues possible</li>
//                             <li>User accepts all risks</li>
//                         </ul>
//                     </div>

//                     {/* Declaration */}
//                     <div className="bg-green-500/10 border !border-green-500/20 p-6 rounded-xl">
//                         <div className="flex items-center gap-2 mb-3">
//                             <ShieldCheck className="text-green-400" />
//                             <h3 className="text-2xl font-semibold text-green-400">Final Declaration</h3>
//                         </div>
//                         <ul className="space-y-1 text-green-300">
//                             <li>✔ I understand deductions</li>
//                             <li>✔ I accept risks</li>
//                             <li>✔ I agree to calculation</li>
//                             <li>✔ I release liability</li>
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 px-8 py-4 rounded-2xl border-t border-gray-700 sticky bottom-0 bg-[#0B0F19]">
//                     <label className="flex items-center gap-2 text-xl">
//                         <input
//                             type="checkbox"
//                             onChange={(e) => setChecked(e.target.checked)}
//                             className="accent-cyan-500 w-6 h-6"
//                         />
//                         I agree to all terms
//                     </label>

//                     <div className="flex gap-3 w-full sm:w-auto">
//                         <button
//                             onClick={onClose}
//                             className="flex-1 sm:flex-none px-5 py-3 border !border-gray-600 text-xl rounded-lg hover:bg-gray-800 transition"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             disabled={!checked}
//                             onClick={onAgree}
//                             className="flex-1 sm:flex-none text-xl px-6 py-3 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white rounded-lg font-semibold transition"
//                         >
//                             I Agree & Proceed →
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Section = ({ title, children }) => (
//     <div className="bg-[#111827] p-6 rounded-xl border !border-gray-700">
//         <h3 className="text-3xl font-semibold mb-3 text-white">{title}</h3>
//         <ul className="list-disc pl-6 space-y-2 text-gray-300 text-xl">{children}</ul>
//     </div>
// );

// export default PrincipalTerms;


import { useState } from "react";
import { ShieldCheck, AlertTriangle } from "lucide-react";

const PrincipalTerms = ({ onClose, onAgree }) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-5xl bg-[#0B0F19] text-gray-200 rounded-2xl shadow-2xl border !border-gray-700 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex justify-between items-center rounded-2xl px-8 py-4 border-b border-gray-700 sticky top-0 bg-[#0B0F19] z-10">
                    <h2 className="text-3xl font-bold text-white tracking-wide">
                        Principal Withdrawal Terms & Conditions
                    </h2>
                    <button onClick={onClose} className="text-gray-200 hover:text-white text-3xl">✕</button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto space-y-8 text-base leading-relaxed">

                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-xl border !border-cyan-500/20">
                        <p className="text-cyan-400 font-semibold text-2xl">Website: Bittronexa.com</p>
                        <p className="text-lg text-gray-300">Last Updated: 6 February 2026</p>
                    </div>

                    <p className="text-gray-300 text-lg">
                        By clicking <span className="text-cyan-400 font-semibold">“I Agree & Proceed”</span>, you (“User”, “Investor”, or “Leader”) confirm that you have read, understood, and accepted these Principal Withdrawal Terms.
                    </p>

                    {/* 1 */}
                    <Section title="1. Nature of Principal Withdrawal">
                        <li>Refers strictly to withdrawal of original invested amount</li>
                        <li>Separate from reward, income, referral, or bonus withdrawals</li>
                        <li>Principal Withdrawal is final and irreversible once submitted</li>
                    </Section>

                    {/* 2 */}
                    <Section title="2. User Roles Covered">
                        <li>Users</li>
                        <li>Investors</li>
                        <li>Leaders / Team Leaders / Referral Leaders</li>
                        <li>All roles are treated equally</li>
                    </Section>

                    {/* 3 Table */}
                    <div className="bg-[#111827] p-6 rounded-xl border !border-gray-700">
                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            3. Lock-In & Time-Based Deduction Policy
                        </h3>

                        <p className="text-gray-300 text-lg mb-4">
                            Deductions are calculated from investment date to withdrawal request date. System timestamp is final and binding.
                        </p>

                        <div className="overflow-hidden rounded-lg border !border-gray-700">
                            <table className="w-full text-sm">
                                <thead className="bg-[#1F2937] text-gray-300">
                                    <tr>
                                        <th className="p-4 text-left">Withdrawal Time</th>
                                        <th className="p-4 text-left">Deduction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t border-gray-700">
                                        <td className="p-4">0–90 days</td>
                                        <td className="p-4 font-semibold">15%</td>
                                    </tr>
                                    <tr className="border-t border-gray-700">
                                        <td className="p-4">91–180 days</td>
                                        <td className="p-4 font-semibold">10%</td>
                                    </tr>
                                    <tr className="border-t border-gray-700">
                                        <td className="p-4">After 180 days</td>
                                        <td className="p-4 text-green-400 font-semibold">No deduction</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 4 */}
                    <Section title="4. Mandatory Principal Burning Mechanism">
                        <li>TP = Total rewards/income generated until withdrawal date</li>
                        <li>Maximum reward cap = 300% of invested principal</li>
                        <li>P1 = TP / 2</li>
                        <li>Adjusted Principal = Principal – P1</li>
                        <li>This reduction applies in every principal withdrawal without exception. </li>
                        <li>If reward is 0,  TP = 0 → P1 = 0</li>
                    </Section>

                    {/* 5 */}
                    <Section title="5. Final Withdrawal Calculation">
                        <li>Before 180 days: Final Amount = (Principal – Applicable deduction) – P1</li>
                        <li>After 180 days: Final Amount = Principal – P1</li>
                    </Section>

                    {/* 6 */}
                    <Section title="6. Maximum Reward Cap">
                        <li>Maximum reward per investment = 300% of principal</li>
                        <li>Once cap is reached, no further rewards accrue </li>
                        <li>Principal Burning is calculated only on capped rewards</li>
                    </Section>

                    {/* 7 */}
                    <Section title="7. Fees & Charges">
                        <li>Withdrawal fees</li>
                        <li>Service charges</li>
                        <li>Gas/network fees</li>
                        <li>Processing fees</li>
                        <li>Fees may change at any time without prior notice. </li>
                        <li>Final received amount may be lower than calculated payout.</li>
                    </Section>

                    {/* 8 */}
                    <Section title="8. Processing Timeline">
                        <li>1–30 business days processing time</li>
                        <li>Depends on liquidity availability, blockchain/network congestion , compliance availability, operational or technical delays.</li>
                        <li>Instant withdrawal is not guaranteed</li>
                    </Section>

                    {/* Risk */}
                    <div className="bg-red-500/10 border !border-red-500/20 p-6 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle size={20} />
                            <h3 className="text-2xl font-semibold">
                                9. Risk Disclosure & Liability Waiver
                            </h3>
                        </div>
                        <ul className="space-y-2 text-xl text-gray-300 list-disc pl-6">
                            <li>Digital assets involve high risk and regulatory uncertainty </li>
                            <li>Liquidity shortages, exchange failures, cyber incidents, or force-majeure events may
                                impact withdrawals </li>
                            <li>Regulatory changes in any country may affect services</li>
                            <li>By proceeding, the User releases Bittronexa from all liability related to:</li>
                            <li>Principal Burning reductions</li>
                            <li>Time-based deductions </li>
                            <li>Processing delays</li>
                            <li>Technical or blockchain failures</li>
                            <li>Regulatory or legal actions</li>
                        </ul>
                    </div>

                    {/* 10 */}
                    <Section title="10. No Cancellation & No Dispute">
                        <li>Cannot cancel or reverse withdrawal</li>
                        <li>Calculation method cannot be disputed</li>
                        <li>User waives any claim for losses, damages, or compensation</li>
                    </Section>

                    {/* 11 */}
                    <Section title="11. Compliance & Security Checks">
                        <li>Pause or delay withdrawals for KYC/AML verification</li>
                        <li>Request identity and source-of-funds documents </li>
                        <li>Reject suspicious or fraudulent requests </li>
                    </Section>

                    {/* 12 */}
                    <Section title="12. Governing Law">
                        <li>These terms are governed by the laws of the United Kingdom and apply to users globally.</li>
                    </Section>

                    {/* Declaration */}
                    <div className="bg-green-500/10 border !border-green-500/20 p-6 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="text-green-400" />
                            <h3 className="text-2xl font-semibold text-green-400">
                                13. Final Declaration
                            </h3>
                        </div>
                        <ul className="space-y-2 text-white">
                            <p className="text-lg">By clicking “I Agree to all terms”, you confirm:</p>
                            <li>✔ I understand deductions and burning rules</li>
                            <li>✔ I understand risks and processing time</li>
                            <li>✔ I accept payout calculation</li>
                            <li>✔ I release Bittronexa from liability</li>
                            <li>✔ I voluntarily request withdrawal</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 px-8 py-4 rounded-2xl border-t border-gray-700 sticky bottom-0 bg-[#0B0F19]">
                    <label className="flex items-center gap-2 text-xl">
                        <input
                            type="checkbox"
                            onChange={(e) => setChecked(e.target.checked)}
                            className="accent-cyan-500 w-6 h-6"
                        />
                        I agree to all terms
                    </label>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <button
                            onClick={onClose}
                            className="flex-1 sm:flex-none px-5 py-3 border !border-gray-600 text-xl rounded-lg hover:bg-gray-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={!checked}
                            onClick={onAgree}
                            className="flex-1 sm:flex-none text-xl px-6 py-3 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white rounded-lg font-semibold transition"
                        >
                            I Agree & Proceed →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <div className="bg-[#111827] p-6 rounded-xl border !border-gray-700">
        <h3 className="text-3xl font-semibold mb-3 text-white">{title}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 text-xl">{children}</ul>
    </div>
);

export default PrincipalTerms;