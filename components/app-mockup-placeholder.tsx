/**
 * Inline SVG stand-ins for apps that don't have a captured screenshot yet
 * (gatherroll, pawtine, plura-post — all pre-launch). Each sketches the
 * app's actual UI shape rather than a generic "coming soon" box, so it reads
 * as a preview, not a placeholder-placeholder. Swap for a real capture in
 * `app-mockup.tsx`'s `PLACEHOLDER` set once one exists.
 */

import type { ReactNode } from "react";

function Chrome({
  accent,
  neutral,
  children,
}: {
  accent: string;
  neutral: string;
  children: ReactNode;
}) {
  return (
    <svg viewBox="0 0 320 224" className="h-full w-full" role="presentation">
      <rect width="320" height="224" fill={neutral} opacity="0.03" />
      {children}
      <text
        x="160"
        y="216"
        textAnchor="middle"
        fontSize="9"
        fill={neutral}
        opacity="0.35"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        Preview — screenshot coming soon
      </text>
    </svg>
  );
}

/** GatherRoll: an event album filling up with photos from several guests. */
function GatherRollArt({ accent, neutral }: { accent: string; neutral: string }) {
  const tiles = [0.9, 0.35, 0.6, 0.45, 0.9, 0.25];
  return (
    <Chrome accent={accent} neutral={neutral}>
      <rect x="20" y="18" width="130" height="16" rx="8" fill={accent} opacity="0.15" />
      <rect x="30" y="23" width="60" height="6" rx="3" fill={accent} opacity="0.6" />
      <circle cx="270" cy="26" r="10" fill={accent} opacity="0.5" />
      <circle cx="256" cy="26" r="10" fill={accent} opacity="0.3" />
      <circle cx="284" cy="26" r="10" fill={neutral} opacity="0.15" stroke={accent} strokeOpacity="0.4" />
      {tiles.map((o, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 20 + col * 100;
        const y = 50 + row * 82;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="88"
            height="70"
            rx="8"
            fill={accent}
            opacity={o * 0.35}
            stroke={accent}
            strokeOpacity="0.25"
          />
        );
      })}
    </Chrome>
  );
}

/** Pawtine: a day's pet-care checklist. */
function PawtineArt({ accent, neutral }: { accent: string; neutral: string }) {
  const rows = [
    { label: 78, done: true },
    { label: 100, done: true },
    { label: 60, done: false },
    { label: 88, done: false },
  ];
  return (
    <Chrome accent={accent} neutral={neutral}>
      <circle cx="34" cy="26" r="12" fill={accent} opacity="0.18" />
      <path
        d="M34 20c1.4 0 2.5 1.6 2.5 3.5S35.4 27 34 27s-2.5-1.6-2.5-3.5S32.6 20 34 20Z"
        fill={accent}
        opacity="0.6"
      />
      <rect x="56" y="20" width="70" height="7" rx="3.5" fill={accent} opacity="0.55" />
      <circle cx="280" cy="26" r="14" fill="none" stroke={accent} strokeOpacity="0.3" strokeWidth="3" />
      <path
        d="M280 12a14 14 0 0 1 14 14"
        fill="none"
        stroke={accent}
        strokeOpacity="0.8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {rows.map((r, i) => {
        const y = 58 + i * 34;
        return (
          <g key={i}>
            <rect x="20" y={y} width="280" height="26" rx="8" fill={neutral} opacity="0.04" />
            <circle
              cx="36"
              cy={y + 13}
              r="8"
              fill={r.done ? accent : "none"}
              opacity={r.done ? 0.7 : 1}
              stroke={accent}
              strokeOpacity="0.5"
            />
            {r.done && (
              <path
                d={`M32 ${y + 13} l3 3 l6 -6`}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <rect x="54" y={y + 9} width={r.label} height="8" rx="4" fill={accent} opacity="0.3" />
          </g>
        );
      })}
    </Chrome>
  );
}

/** PluraPost: a compose box fanning out to platform targets and a delivery pipeline. */
function PluraPostArt({ accent, neutral }: { accent: string; neutral: string }) {
  return (
    <Chrome accent={accent} neutral={neutral}>
      <rect x="20" y="16" width="280" height="44" rx="10" fill={neutral} opacity="0.05" stroke={accent} strokeOpacity="0.2" />
      <rect x="32" y="28" width="180" height="6" rx="3" fill={accent} opacity="0.5" />
      <rect x="32" y="40" width="120" height="6" rx="3" fill={accent} opacity="0.3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={244 + (i % 2 === 0 ? 0 : 18) - 9}
          cy={26 + i * 8}
          r="3.5"
          fill={accent}
          opacity={0.25 + i * 0.1}
        />
      ))}
      {["Draft", "Validating", "Queued", "Published"].map((label, i) => {
        const x = 50 + i * 76;
        const active = i <= 2;
        return (
          <g key={label}>
            {i > 0 && (
              <line
                x1={x - 76 + 14}
                x2={x - 14}
                y1="130"
                y2="130"
                stroke={accent}
                strokeOpacity={active ? 0.5 : 0.15}
                strokeWidth="2"
                strokeDasharray={active ? undefined : "3 4"}
              />
            )}
            <circle
              cx={x}
              cy="130"
              r="9"
              fill={active ? accent : "none"}
              opacity={active ? (i === 2 ? 1 : 0.55) : 1}
              stroke={accent}
              strokeOpacity="0.5"
            />
            <text
              x={x}
              y="152"
              textAnchor="middle"
              fontSize="8"
              fill={accent}
              opacity={active ? 0.75 : 0.35}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {label}
            </text>
          </g>
        );
      })}
      <rect x="20" y="176" width="280" height="1" fill={accent} opacity="0.1" />
      <rect x="20" y="188" width="90" height="6" rx="3" fill={neutral} opacity="0.3" />
      <rect x="120" y="188" width="60" height="6" rx="3" fill={accent} opacity="0.35" />
    </Chrome>
  );
}

const ART: Record<string, typeof GatherRollArt> = {
  gatherroll: GatherRollArt,
  pawtine: PawtineArt,
  "plura-post": PluraPostArt,
};

export function hasPlaceholderArt(appId: string): boolean {
  return appId in ART;
}

export default function AppMockupPlaceholder({
  appId,
  accent,
  isDark,
}: {
  appId: string;
  accent: string;
  isDark: boolean;
}) {
  const Art = ART[appId];
  if (!Art) return null;
  const neutral = isDark ? "#ffffff" : "#000000";
  return <Art accent={accent} neutral={neutral} />;
}
