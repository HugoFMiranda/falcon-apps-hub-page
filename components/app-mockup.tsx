export default function AppMockup({ id, accent }: { id: string; accent: string }) {
  if (id === "falcon-tools") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        <rect x="65" y="8" width="70" height="90" rx="4" fill="white" fillOpacity="0.9" />
        <polygon points="115,8 135,28 115,28" fill="#e5e7eb" />
        <rect x="75" y="35" width="45" height="3" rx="1.5" fill="#d1d5db" />
        <rect x="75" y="44" width="36" height="3" rx="1.5" fill="#d1d5db" />
        <rect x="75" y="53" width="42" height="3" rx="1.5" fill="#d1d5db" />
        <rect x="75" y="62" width="30" height="3" rx="1.5" fill="#d1d5db" />
        <rect x="75" y="74" width="28" height="14" rx="3" fill={accent} fillOpacity="0.9" />
        <text x="89" y="84" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PDF</text>
      </svg>
    );
  }

  if (id === "algorithm-playground") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        <line x1="50" y1="60" x2="100" y2="30" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="100" y1="30" x2="150" y2="60" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="50" y1="60" x2="100" y2="90" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="150" y1="60" x2="100" y2="90" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="100" y1="30" x2="100" y2="90" stroke={accent} strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 3" />
        <circle cx="50" cy="60" r="13" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="150" cy="60" r="13" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="100" cy="90" r="13" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="100" cy="30" r="13" fill={accent} fillOpacity="0.9" />
        <text x="100" y="34" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">A*</text>
        <text x="50" y="64" textAnchor="middle" fill={accent} fontSize="9" fontWeight="600">B</text>
        <text x="150" y="64" textAnchor="middle" fill={accent} fontSize="9" fontWeight="600">C</text>
        <text x="100" y="94" textAnchor="middle" fill={accent} fontSize="9" fontWeight="600">D</text>
      </svg>
    );
  }

  if (id === "food-twin") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        <rect x="18" y="12" width="164" height="20" rx="10" fill="white" fillOpacity="0.75" />
        <circle cx="32" cy="22" r="5.5" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
        <line x1="36" y1="27" x2="40" y2="31" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="50" y="26" fill="#9ca3af" fontSize="8.5">Search a food...</text>
        <text x="18" y="52" fill={accent} fontSize="8" fillOpacity="0.9">Protein</text>
        <rect x="58" y="44" width="90" height="7" rx="3.5" fill="white" fillOpacity="0.2" />
        <rect x="58" y="44" width="68" height="7" rx="3.5" fill={accent} fillOpacity="0.75" />
        <text x="18" y="70" fill={accent} fontSize="8" fillOpacity="0.9">Carbs</text>
        <rect x="58" y="62" width="90" height="7" rx="3.5" fill="white" fillOpacity="0.2" />
        <rect x="58" y="62" width="38" height="7" rx="3.5" fill={accent} fillOpacity="0.75" />
        <text x="18" y="88" fill={accent} fontSize="8" fillOpacity="0.9">Fat</text>
        <rect x="58" y="80" width="90" height="7" rx="3.5" fill="white" fillOpacity="0.2" />
        <rect x="58" y="80" width="52" height="7" rx="3.5" fill={accent} fillOpacity="0.75" />
      </svg>
    );
  }

  if (id === "agendex") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        {/* Calendar header */}
        <rect x="18" y="10" width="164" height="14" rx="3" fill="white" fillOpacity="0.15" />
        <text x="26" y="20" fill="white" fontSize="7" fontWeight="600" fillOpacity="0.9">Mon</text>
        <text x="54" y="20" fill="white" fontSize="7" fontWeight="600" fillOpacity="0.9">Tue</text>
        <text x="82" y="20" fill="white" fontSize="7" fontWeight="600" fillOpacity="0.9">Wed</text>
        <text x="110" y="20" fill={accent} fontSize="7" fontWeight="700">Thu</text>
        <text x="138" y="20" fill="white" fontSize="7" fontWeight="600" fillOpacity="0.9">Fri</text>
        {/* Time slots */}
        <rect x="18" y="28" width="28" height="18" rx="2" fill={accent} fillOpacity="0.85" />
        <text x="32" y="39" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">09:00</text>
        <rect x="18" y="50" width="28" height="12" rx="2" fill={accent} fillOpacity="0.4" />
        <rect x="18" y="66" width="28" height="22" rx="2" fill={accent} fillOpacity="0.6" />
        <rect x="50" y="28" width="28" height="12" rx="2" fill={accent} fillOpacity="0.5" />
        <rect x="50" y="44" width="28" height="22" rx="2" fill={accent} fillOpacity="0.85" />
        <text x="64" y="57" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">10:30</text>
        <rect x="78" y="34" width="28" height="18" rx="2" fill={accent} fillOpacity="0.4" />
        <rect x="78" y="56" width="28" height="12" rx="2" fill={accent} fillOpacity="0.6" />
        <rect x="106" y="28" width="28" height="28" rx="2" fill={accent} />
        <text x="120" y="43" textAnchor="middle" fill="white" fontSize="6" fontWeight="700">Active</text>
        <rect x="106" y="60" width="28" height="16" rx="2" fill={accent} fillOpacity="0.5" />
        <rect x="134" y="32" width="28" height="14" rx="2" fill={accent} fillOpacity="0.45" />
        <rect x="134" y="50" width="28" height="20" rx="2" fill={accent} fillOpacity="0.7" />
        {/* Status bar */}
        <rect x="18" y="96" width="164" height="14" rx="3" fill="white" fillOpacity="0.1" />
        <circle cx="30" cy="103" r="3" fill="#4ade80" />
        <text x="38" y="106" fill="white" fontSize="6.5" fillOpacity="0.8">5 appointments today · 2 in progress</text>
      </svg>
    );
  }

  if (id === "broke-but-optimistic") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        <rect x="18" y="10" width="164" height="100" rx="6" fill="white" fillOpacity="0.08" />
        <rect x="28" y="20" width="60" height="28" rx="4" fill={accent} fillOpacity="0.18" />
        <text x="58" y="31" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600" fillOpacity="0.9">Balance</text>
        <text x="58" y="42" textAnchor="middle" fill={accent} fontSize="9" fontWeight="700">$4,200</text>
        <rect x="112" y="20" width="60" height="28" rx="4" fill={accent} fillOpacity="0.1" />
        <text x="142" y="31" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600" fillOpacity="0.9">Debt</text>
        <text x="142" y="42" textAnchor="middle" fill={accent} fontSize="9" fontWeight="700">$1,850</text>
        <rect x="28" y="56" width="144" height="4" rx="2" fill="white" fillOpacity="0.12" />
        <rect x="28" y="56" width="90" height="4" rx="2" fill={accent} fillOpacity="0.7" />
        <text x="28" y="72" fill={accent} fontSize="7" fillOpacity="0.7">Transactions</text>
        <rect x="28" y="77" width="80" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
        <rect x="28" y="84" width="110" height="3" rx="1.5" fill="white" fillOpacity="0.15" />
        <rect x="28" y="91" width="65" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
        <rect x="28" y="98" width="95" height="3" rx="1.5" fill="white" fillOpacity="0.15" />
        <circle cx="160" cy="80" r="16" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
        <text x="160" y="78" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600">+12%</text>
        <text x="160" y="87" textAnchor="middle" fill={accent} fontSize="6" fillOpacity="0.7">savings</text>
      </svg>
    );
  }

  if (id === "casefile") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        {/* Manor grid */}
        {[0,1,2,3].map((row) =>
          [0,1,2,3,4].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={28 + col * 22}
              y={10 + row * 22}
              width={20}
              height={20}
              rx="2"
              fill="white"
              fillOpacity="0.07"
              stroke={accent}
              strokeOpacity="0.2"
              strokeWidth="0.75"
            />
          ))
        )}
        {/* Highlighted room */}
        <rect x="28" y="10" width="42" height="42" rx="2" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
        {/* Suspect tokens */}
        <circle cx="38" cy="31" r="7" fill={accent} fillOpacity="0.9" />
        <text x="38" y="35" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">?</text>
        <circle cx="60" cy="53" r="7" fill={accent} fillOpacity="0.5" />
        <circle cx="94" cy="20" r="7" fill={accent} fillOpacity="0.35" />
        <circle cx="116" cy="42" r="7" fill={accent} fillOpacity="0.4" />
        <circle cx="138" cy="20" r="7" fill={accent} fillOpacity="0.3" />
        {/* Clue panel */}
        <rect x="156" y="10" width="36" height="78" rx="3" fill="white" fillOpacity="0.08" stroke={accent} strokeOpacity="0.15" strokeWidth="0.75" />
        <rect x="161" y="16" width="26" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5" />
        <rect x="161" y="22" width="20" height="2.5" rx="1.25" fill="white" fillOpacity="0.25" />
        <rect x="161" y="28" width="24" height="2.5" rx="1.25" fill="white" fillOpacity="0.2" />
        <rect x="161" y="34" width="18" height="2.5" rx="1.25" fill="white" fillOpacity="0.25" />
        <rect x="161" y="40" width="22" height="2.5" rx="1.25" fill="white" fillOpacity="0.2" />
        {/* Bottom bar */}
        <rect x="28" y="98" width="120" height="14" rx="3" fill={accent} fillOpacity="0.15" />
        <text x="88" y="108" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600">Identify the killer</text>
      </svg>
    );
  }

  if (id === "anime-calendar") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        {/* Week header */}
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (
          <text key={d} x={16 + i * 26} y="16" fill="white" fontSize="6.5" fontWeight="600" fillOpacity={i === 3 ? 1 : 0.5}>{d}</text>
        ))}
        {/* Shows as colored blocks */}
        <rect x="14" y="22" width="22" height="16" rx="2" fill={accent} fillOpacity="0.85" />
        <text x="25" y="33" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="600">23:00</text>
        <rect x="14" y="42" width="22" height="16" rx="2" fill={accent} fillOpacity="0.4" />
        <rect x="66" y="22" width="22" height="16" rx="2" fill={accent} fillOpacity="0.6" />
        <rect x="66" y="42" width="22" height="22" rx="2" fill={accent} fillOpacity="0.85" />
        <text x="77" y="55" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="600">00:00</text>
        <rect x="92" y="30" width="22" height="16" rx="2" fill={accent} fillOpacity="0.45" />
        <rect x="118" y="22" width="22" height="22" rx="2" fill={accent} />
        <text x="129" y="35" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="700">NEW</text>
        <rect x="118" y="48" width="22" height="14" rx="2" fill={accent} fillOpacity="0.5" />
        <rect x="144" y="26" width="22" height="16" rx="2" fill={accent} fillOpacity="0.55" />
        <rect x="144" y="46" width="22" height="18" rx="2" fill={accent} fillOpacity="0.7" />
        <rect x="170" y="22" width="22" height="14" rx="2" fill={accent} fillOpacity="0.4" />
        <rect x="170" y="40" width="22" height="22" rx="2" fill={accent} fillOpacity="0.65" />
        {/* Progress bar */}
        <rect x="14" y="76" width="178" height="5" rx="2.5" fill="white" fillOpacity="0.12" />
        <rect x="14" y="76" width="110" height="5" rx="2.5" fill={accent} fillOpacity="0.7" />
        <text x="14" y="92" fill="white" fontSize="7" fillOpacity="0.6">Season progress</text>
        <text x="192" y="92" textAnchor="end" fill={accent} fontSize="7" fontWeight="600">62%</text>
        {/* Watched badge */}
        <rect x="14" y="98" width="40" height="14" rx="3" fill={accent} fillOpacity="0.2" />
        <text x="34" y="108" textAnchor="middle" fill={accent} fontSize="6.5" fontWeight="600">✓ 18 ep</text>
        <rect x="58" y="98" width="40" height="14" rx="3" fill="white" fillOpacity="0.08" />
        <text x="78" y="108" textAnchor="middle" fill="white" fontSize="6.5" fillOpacity="0.5">11 left</text>
      </svg>
    );
  }

  if (id === "yomu") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        {/* Phone frame */}
        <rect x="72" y="6" width="56" height="108" rx="7" fill="white" fillOpacity="0.9" />
        <rect x="76" y="14" width="48" height="88" rx="3" fill={accent} fillOpacity="0.08" />
        {/* Manga panels on the page */}
        <rect x="80" y="18" width="40" height="26" rx="2" fill={accent} fillOpacity="0.75" />
        <rect x="80" y="47" width="18" height="22" rx="2" fill={accent} fillOpacity="0.5" />
        <rect x="102" y="47" width="18" height="22" rx="2" fill={accent} fillOpacity="0.35" />
        <rect x="80" y="72" width="40" height="18" rx="2" fill={accent} fillOpacity="0.55" />
        {/* Reading progress */}
        <rect x="80" y="94" width="40" height="3" rx="1.5" fill={accent} fillOpacity="0.15" />
        <rect x="80" y="94" width="26" height="3" rx="1.5" fill={accent} />
        {/* Extension chips either side */}
        <rect x="14" y="30" width="46" height="13" rx="6.5" fill={accent} fillOpacity="0.2" />
        <text x="37" y="39" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600">
          extension
        </text>
        <rect x="14" y="49" width="46" height="13" rx="6.5" fill={accent} fillOpacity="0.12" />
        <text x="37" y="58" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600" fillOpacity="0.8">
          extension
        </text>
        <rect x="140" y="40" width="46" height="13" rx="6.5" fill={accent} fillOpacity="0.16" />
        <text x="163" y="49" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600" fillOpacity="0.9">
          extension
        </text>
        {/* Chapter counter */}
        <text x="100" y="110" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600">
          ch. 42
        </text>
      </svg>
    );
  }

  return null;
}
