/**
 * SVG illustrations used in place of photos. Swap any of them for a real
 * <Image /> once you have screenshots. Animations are defined in globals.css.
 */
import type { ReactNode } from "react"
import type { ArtKind, ServiceId } from "@/lib/data"

const C = { i: "#3F3FD9", c: "#FF6B4A", l: "#E7E5FA", p: "#FFE3D6", m: "#D6F2E6", k: "#14181F", g: "#E3E1DA", y: "#FFF3C9" }

function Svg({ w, h, label, className, meet, children }: { w: number; h: number; label: string; className?: string; meet?: boolean; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} preserveAspectRatio={`xMidYMid ${meet ? "meet" : "slice"}`} className={className}>
      {children}
    </svg>
  )
}

type RectProps = { x: number; y: number; w: number; h: number; r?: number; f: string; stroke?: string; strokeWidth?: number }
const Rect = ({ x, y, w, h, r = 0, f, stroke, strokeWidth }: RectProps) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={f} stroke={stroke} strokeWidth={strokeWidth} />
)
const Bg = ({ f, w, h }: { f: string; w: number; h: number }) => <Rect x={0} y={0} w={w} h={h} f={f} />

/* ---------- Project art (600 x 400) ---------- */

function Node({ x, y, w, t, f, tc }: { x: number; y: number; w: number; t: string; f: string; tc: string }) {
  return (
    <g>
      <Rect x={x} y={y} w={w} h={44} r={12} f={f} />
      <text x={x + w / 2} y={y + 27} textAnchor="middle" fontSize={14} fontFamily="sans-serif" fontWeight={600} fill={tc}>
        {t}
      </text>
    </g>
  )
}

function Chip({ x, y, t, a, c }: { x: number; y: number; t: string; a: string; c: string }) {
  return (
    <g>
      <Rect x={x} y={y} w={160} h={76} r={16} f="#fff" />
      <text x={x + 16} y={y + 28} fontSize={13} fontFamily="sans-serif" fill="#5F646D">
        {t}
      </text>
      <text x={x + 16} y={y + 60} fontSize={30} fontFamily="sans-serif" fontWeight={700} fill={c}>
        {a}
      </text>
    </g>
  )
}

function AdCard({ x, y, a, b, t }: { x: number; y: number; a: string; b: string; t: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Rect x={0} y={0} w={150} h={300} r={14} f="#fff" />
      <Rect x={14} y={14} w={122} h={120} r={10} f={a} />
      <circle cx={75} cy={74} r={30} fill={b} />
      <Rect x={14} y={152} w={100} h={10} r={5} f={C.k} />
      <Rect x={14} y={172} w={70} h={8} r={4} f={C.g} />
      <Rect x={14} y={250} w={80} h={26} r={13} f={C.k} />
      <circle cx={126} cy={263} r={13} fill={b} />
      <text x={126} y={268} fontSize={14} textAnchor="middle" fill="#fff" fontFamily="sans-serif" fontWeight={700}>
        {t}
      </text>
    </g>
  )
}

export function ProjectArt({ kind, className }: { kind: ArtKind; className?: string }) {
  if (kind === "search")
    return (
      <Svg w={600} h={400} label="Illustration: search ranking and traffic growth" className={className}>
        <Bg f={C.l} w={600} h={400} />
        <Rect x={40} y={36} w={520} h={328} r={16} f="#fff" />
        {["#FF6B4A", "#FFD27A", "#8be0bd"].map((c, i) => (
          <circle key={c} cx={64 + i * 18} cy={58} r={5} fill={c} />
        ))}
        <Rect x={130} y={50} w={300} h={16} r={8} f="#F1F0EC" />
        {[130, 190, 250, 310].map((y) => (
          <path key={y} d={`M60 ${y}H540`} stroke="#EEEDE8" strokeWidth={2} />
        ))}
        <path d="M60 340V330L140 300L220 312L300 250L380 222L460 150L540 100V340Z" fill={C.i} opacity={0.12} />
        <path className="dr" pathLength={1} d="M60 330L140 300L220 312L300 250L380 222L460 150L540 100" fill="none" stroke={C.i} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={540} cy={100} r={9} fill="#fff" stroke={C.i} strokeWidth={5} />
        <Rect x={70} y={92} w={210} h={74} r={12} f="#fff" stroke={C.g} />
        <Rect x={86} y={108} w={90} h={8} r={4} f="#C9C8F5" />
        <Rect x={86} y={126} w={170} h={10} r={5} f={C.i} />
        <Rect x={86} y={146} w={140} h={8} r={4} f={C.g} />
      </Svg>
    )
  if (kind === "ads")
    return (
      <Svg w={600} h={400} label="Illustration: ad creative variants being tested" className={className}>
        <Bg f={C.p} w={600} h={400} />
        <AdCard x={40} y={50} a={C.i} b={C.c} t="A" />
        <AdCard x={225} y={30} a={C.k} b={C.l} t="B" />
        <AdCard x={410} y={50} a={C.c} b={C.i} t="C" />
      </Svg>
    )
  if (kind === "local")
    return (
      <Svg w={600} h={400} label="Illustration: local listing and booking calendar" className={className}>
        <Bg f={C.m} w={600} h={400} />
        <path d="M0 120H600M0 280H600M160 0V400M420 0V400M0 330L600 60" stroke="#fff" strokeWidth={16} fill="none" />
        <circle className="pl2" cx={250} cy={200} r={30} fill={C.c} opacity={0.3} />
        <path d="M250 200C216 156 216 114 250 114S284 156 250 200Z" fill={C.c} />
        <circle cx={250} cy={140} r={11} fill="#fff" />
        <Rect x={340} y={180} w={220} h={180} r={14} f="#fff" />
        <Rect x={340} y={180} w={220} h={40} r={14} f={C.k} />
        {[0, 1, 2].flatMap((r) =>
          [0, 1, 2, 3, 4, 5, 6].map((k) => <circle key={`${r}-${k}`} cx={362 + k * 29} cy={252 + r * 34} r={8} fill={(r * 7 + k) % 3 === 0 ? C.i : C.g} />),
        )}
      </Svg>
    )
  if (kind === "email")
    return (
      <Svg w={600} h={400} label="Illustration: abandoned cart email flow" className={className}>
        <Bg f={C.y} w={600} h={400} />
        <path d="M210 82H250M360 82H400M475 104V170M475 214V280M400 192H275V280" stroke={C.k} strokeWidth={2.5} fill="none" strokeDasharray="6 5" />
        <Node x={40} y={60} w={170} t="Cart abandoned" f={C.k} tc="#fff" />
        <Node x={250} y={60} w={110} t="Wait 4 hours" f="#fff" tc={C.k} />
        <Node x={400} y={60} w={150} t="Email 1" f={C.i} tc="#fff" />
        <Node x={400} y={170} w={150} t="Purchased?" f="#fff" tc={C.k} />
        <Node x={400} y={280} w={150} t="Email 2 + offer" f={C.c} tc="#fff" />
        <Node x={210} y={280} w={130} t="Exit flow" f="#fff" tc={C.k} />
        {[40, 70, 55, 100, 130].map((h, i) => (
          <Rect key={i} x={50 + i * 34} y={360 - h} w={22} h={h} r={5} f={i === 4 ? C.c : C.i} />
        ))}
      </Svg>
    )
  return (
    <Svg w={600} h={400} label="Illustration: social ad and performance" className={className}>
      <Bg f={C.p} w={600} h={400} />
      <Rect x={210} y={24} w={180} h={352} r={28} f={C.k} />
      <Rect x={220} y={38} w={160} h={324} r={20} f={C.i} />
      <circle cx={300} cy={150} r={48} fill={C.c} />
      <Rect x={236} y={232} w={128} h={12} r={6} f="#fff" />
      <Rect x={236} y={254} w={90} h={10} r={5} f="rgba(255,255,255,.55)" />
      <Rect x={236} y={310} w={96} h={32} r={16} f="#fff" />
      <Chip x={30} y={90} t="Cost per purchase" a="↓" c={C.i} />
      <Chip x={410} y={220} t="Return on ad spend" a="↑" c={C.c} />
    </Svg>
  )
}

/* ---------- Hero card stack (320 x 400) ---------- */

export type DeckKind = "search" | "ads" | "email" | "analytics"

export function DeckArt({ kind, className }: { kind: DeckKind; className?: string }) {
  if (kind === "search")
    return (
      <Svg w={320} h={400} label="Search results card" className={className}>
        <Bg f={C.l} w={320} h={400} />
        <Rect x={24} y={70} w={272} h={40} r={20} f="#fff" />
        <circle cx={46} cy={90} r={8} fill="none" stroke={C.i} strokeWidth={3} />
        <Rect x={66} y={86} w={120} h={8} r={4} f={C.g} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Rect x={24} y={134 + i * 74} w={272} h={62} r={14} f={i === 0 ? "#fff" : "rgba(255,255,255,.6)"} stroke={i === 0 ? C.i : undefined} strokeWidth={i === 0 ? 2 : undefined} />
            <Rect x={40} y={150 + i * 74} w={80} h={7} r={3.5} f={i === 0 ? "#C9C8F5" : C.g} />
            <Rect x={40} y={166 + i * 74} w={170} h={10} r={5} f={i === 0 ? C.i : "#c9c9d3"} />
          </g>
        ))}
        <circle cx={262} cy={150} r={20} fill="#FF6B4A" />
        <text x={262} y={156} fontSize={16} fill="#fff" textAnchor="middle" fontFamily="sans-serif" fontWeight={700}>
          #1
        </text>
      </Svg>
    )
  if (kind === "ads")
    return (
      <Svg w={320} h={400} label="Ad creative card" className={className}>
        <Bg f={C.p} w={320} h={400} />
        <Rect x={30} y={60} w={260} h={230} r={18} f={C.i} />
        <circle cx={190} cy={150} r={60} fill={C.c} />
        <Rect x={52} y={200} w={120} h={14} r={7} f="#fff" />
        <Rect x={52} y={224} w={170} h={14} r={7} f="rgba(255,255,255,.55)" />
        <Rect x={30} y={316} w={120} h={40} r={20} f={C.k} />
      </Svg>
    )
  if (kind === "email")
    return (
      <Svg w={320} h={400} label="Email card" className={className}>
        <Bg f={C.m} w={320} h={400} />
        <Rect x={30} y={60} w={260} h={300} r={18} f="#fff" />
        <Rect x={30} y={60} w={260} h={56} r={18} f={C.k} />
        <Rect x={52} y={80} w={100} h={10} r={5} f="#aeb0ff" />
        <Rect x={52} y={134} w={216} h={110} r={12} f={C.m} />
        <circle cx={110} cy={190} r={26} fill={C.i} />
        <Rect x={52} y={262} w={150} h={10} r={5} f={C.k} />
        <Rect x={52} y={282} w={200} h={8} r={4} f={C.g} />
        <Rect x={52} y={314} w={110} h={32} r={16} f={C.i} />
      </Svg>
    )
  return (
    <Svg w={320} h={400} label="Analytics card" className={className}>
      <Bg f="#fff" w={320} h={400} />
      <Rect x={24} y={60} w={272} h={300} r={18} f="#F8F7F4" />
      {[40, 70, 55, 100, 130, 170].map((h, i) => (
        <Rect key={i} x={44 + i * 40} y={320 - h} w={26} h={h} r={6} f={i === 5 ? C.c : C.i} />
      ))}
      <path className="dw2" pathLength={1} d="M56 270L96 240L136 252L176 200L216 170L256 120" fill="none" stroke={C.k} strokeWidth={3} strokeLinecap="round" />
    </Svg>
  )
}

/* ---------- Creative samples (300 x 380) ---------- */

const palettes: [string, string][] = [
  [C.l, C.i],
  [C.p, C.c],
  [C.m, C.k],
  [C.k, "#aeb0ff"],
  [C.y, C.i],
  [C.l, C.c],
  [C.p, C.k],
]
export const creativeCount = palettes.length

export function CreativeArt({ index, className }: { index: number; className?: string }) {
  const [bg, fg] = palettes[index % palettes.length]
  const dark = bg === C.k
  const shape = index % 3
  return (
    <Svg w={300} h={380} label={`Creative sample ${index + 1}`} className={className}>
      <Bg f={bg} w={300} h={380} />
      {shape === 0 && <circle cx={150} cy={150} r={88} fill={fg} />}
      {shape === 1 && <path d="M62 270V150a88 88 0 0 1 176 0V270Z" fill={fg} />}
      {shape === 2 && [0, 1, 2, 3, 4].map((k) => <Rect key={k} x={40 + k * 44} y={60} w={28} h={200} r={14} f={fg} />)}
      <Rect x={40} y={292} w={150} h={12} r={6} f={dark ? "#fff" : C.k} />
      <Rect x={40} y={314} w={100} h={9} r={4.5} f={dark ? "rgba(255,255,255,.4)" : "rgba(20,24,31,.3)"} />
      <circle cx={252} cy={310} r={16} fill={dark ? "#fff" : C.c} />
    </Svg>
  )
}

/* ---------- Animated service art (480 x 300) ---------- */

function RankCard({ y, me, cls }: { y: number; me: boolean; cls: string }) {
  return (
    <g className={cls}>
      <Rect x={40} y={y} w={250} h={44} r={12} f="#fff" stroke={me ? C.i : undefined} strokeWidth={me ? 2 : undefined} />
      <Rect x={54} y={y + 10} w={70} h={6} r={3} f={me ? "#C9C8F5" : C.g} />
      <Rect x={54} y={y + 24} w={150} h={9} r={4.5} f={me ? C.i : "#c9c9d3"} />
      {me && (
        <>
          <circle cx={266} cy={y + 22} r={15} fill={C.i} />
          <text x={266} y={y + 27} fontSize={13} fill="#fff" textAnchor="middle" fontFamily="sans-serif" fontWeight={700}>
            #1
          </text>
        </>
      )}
    </g>
  )
}

export function ServiceArt({ id, className }: { id: ServiceId; className?: string }) {
  if (id === "seo")
    return (
      <Svg w={480} h={300} meet label="Animated illustration: a page climbing to first place in search results" className={className}>
        <Bg f={C.l} w={480} h={300} />
        <Rect x={40} y={30} w={250} h={40} r={20} f="#fff" />
        <circle cx={62} cy={50} r={7} fill="none" stroke={C.i} strokeWidth={2.5} />
        <rect className="tz k1" x={80} y={46} width={150} height={8} rx={4} fill={C.g} />
        <RankCard y={152} me={false} cls="dn" />
        <RankCard y={206} me={false} cls="dn" />
        <RankCard y={98} me cls="cl" />
        <Rect x={310} y={98} w={130} h={152} r={14} f="#fff" />
        <path className="dw2" pathLength={1} d="M326 230L350 205L372 214L396 170L420 140" fill="none" stroke={C.i} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    )
  if (id === "ads")
    return (
      <Svg w={480} h={300} meet label="Animated illustration: ad targeting and falling cost per click" className={className}>
        <Bg f={C.p} w={480} h={300} />
        <circle cx={130} cy={150} r={96} fill="#fff" />
        <circle cx={130} cy={150} r={68} fill={C.l} />
        <circle cx={130} cy={150} r={40} fill={C.i} />
        <circle cx={130} cy={150} r={14} fill={C.c} />
        {[0, 1].map((i) => (
          <circle key={i} className="pl2" cx={130} cy={150} r={96} fill="none" stroke={C.c} strokeWidth={3} style={{ animationDelay: `${i * 1.5}s` }} />
        ))}
        <g transform="translate(128 148)">
          <g className="cu">
            <path d="M0 0L0 26L7 20L12 32L17 30L12 18L22 18Z" fill={C.k} stroke="#fff" strokeWidth={2} />
          </g>
        </g>
        <Rect x={280} y={34} w={170} h={44} r={12} f="#fff" />
        <text x={296} y={62} fontSize={14} fontFamily="sans-serif" fontWeight={600} fill={C.k}>
          Cost per click ↓
        </text>
        {[60, 95, 130, 170].map((h, i) => (
          <g key={i} className="bu" style={{ animationDelay: `${i * 0.25}s` }}>
            <Rect x={280 + i * 52} y={250 - h} w={34} h={h} r={8} f={i === 3 ? C.c : C.k} />
          </g>
        ))}
      </Svg>
    )
  if (id === "email")
    return (
      <Svg w={480} h={300} meet label="Animated illustration: an email opening and an automation flow" className={className}>
        <Bg f={C.m} w={480} h={300} />
        <g className="lt">
          <Rect x={92} y={96} w={116} h={84} r={8} f={C.i} />
          <Rect x={106} y={112} w={60} h={8} r={4} f="#fff" />
          <Rect x={106} y={130} w={86} h={6} r={3} f="rgba(255,255,255,.6)" />
        </g>
        <Rect x={70} y={140} w={160} h={100} r={12} f="#fff" />
        <path className="fl" d="M70 140H230L150 196Z" fill={C.g} />
        <path d="M290 82V242" stroke={C.k} strokeWidth={2.5} strokeDasharray="6 5" />
        <Node x={310} y={60} w={140} t="Welcome" f={C.i} tc="#fff" />
        <Node x={310} y={140} w={140} t="Browse" f="#fff" tc={C.k} />
        <Node x={310} y={220} w={140} t="Win-back" f={C.c} tc="#fff" />
        <circle className="pk" cx={290} cy={82} r={8} fill={C.c} />
      </Svg>
    )
  return (
    <Svg w={480} h={300} meet label="Animated illustration: a reporting dashboard filling with data" className={className}>
      <Bg f={C.y} w={480} h={300} />
      <Rect x={40} y={30} w={400} h={240} r={18} f="#fff" />
      {[50, 80, 64, 110, 140, 170].map((h, i) => (
        <g key={i} className="bu" style={{ animationDelay: `${i * 0.2}s` }}>
          <Rect x={64 + i * 40} y={236 - h} w={26} h={h} r={6} f={i === 5 ? C.c : C.i} />
        </g>
      ))}
      <path className="dw2" pathLength={1} d="M77 190L117 160L157 172L197 126L237 98L277 66" fill="none" stroke={C.k} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={370} cy={100} r={38} fill="none" stroke={C.g} strokeWidth={14} />
      <circle className="dd" cx={370} cy={100} r={38} fill="none" stroke={C.i} strokeWidth={14} pathLength={100} transform="rotate(-90 370 100)" />
      <Rect x={320} y={170} w={100} h={8} r={4} f={C.g} />
      <Rect x={320} y={190} w={70} h={8} r={4} f={C.g} />
      <Rect x={320} y={210} w={86} h={8} r={4} f={C.g} />
    </Svg>
  )
}

/* ---------- Portrait ---------- */

export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={`Illustration of ${name}`} className={className}>
      <defs>
        <linearGradient id="avatar-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E7E5FA" />
          <stop offset="1" stopColor="#FFE3D6" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#avatar-bg)" />
      <path d="M26 200c0-46 32-68 74-68s74 22 74 68Z" fill="#3F3FD9" />
      <rect x="88" y="104" width="24" height="34" rx="10" fill="#E0B08C" />
      <ellipse cx="100" cy="84" rx="32" ry="38" fill="#EBC3A0" />
      <path d="M66 86c-6-42 20-58 40-56 26 2 36 24 28 56-6-18-18-28-34-28-14 0-26 8-34 28Z" fill="#1d2230" />
      <path d="M66 86c-8 32-2 56 12 66-6-22-6-44-4-62Z" fill="#1d2230" />
      <path d="M134 86c6 24 4 46-6 60 8-18 8-40 6-60Z" fill="#1d2230" />
      <circle cx="150" cy="40" r="9" fill="#FF6B4A" opacity=".9" />
    </svg>
  )
}
