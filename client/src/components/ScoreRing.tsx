import { scoreColor } from '../lib/score.ts'

type Props = {
  score: number
  size?: number
  stroke?: number
  showLabel?: boolean
}

export default function ScoreRing({ score, size = 140, stroke = 10, showLabel = true }: Props) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const filled = (Math.min(Math.max(score, 0), 100) / 100) * circumference

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={scoreColor(score)}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-medium tracking-[-0.02em]" style={{ fontSize: size * 0.26 }}>
          {score}%
        </span>
        {showLabel && <span className="text-xs text-muted">match</span>}
      </div>
    </div>
  )
}
