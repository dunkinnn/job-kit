import SectionLabel from '../SectionLabel.tsx'

// Only facts that are true of the product, never made-up usage numbers.
const STATS = [
  { value: '3', label: 'Tools for one job post' },
  { value: '₱0', label: 'Free for fresh grads' },
  { value: '0', label: 'Resumes stored by us' },
  { value: '<1 min', label: 'To see your match' },
]

const statClass = (index: number) =>
  [
    'flex flex-col-reverse gap-1.5 border-b border-line py-5 md:border-b-0 md:px-7 md:py-9',
    index % 2 === 0 ? 'border-r pr-3' : 'pl-4',
    index === 0 && 'md:pl-0',
    index === 1 && 'md:border-r',
  ]
    .filter(Boolean)
    .join(' ')

export default function Intro() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 md:px-7">
      <div className="grid gap-4 pt-16 pb-12 md:grid-cols-3 md:gap-16 md:pt-[120px] md:pb-24">
        <SectionLabel>Built for first-time jobseekers in the Philippines</SectionLabel>
        <p className="headline text-[21px] leading-[1.25] text-accent md:col-span-2 md:text-[34px] md:leading-[1.22] md:tracking-[-0.01em]">
          Most fresh grads send one resume to every job <span className="text-quiet">and hear nothing back.</span> Job Kit reads
          the job post, shows what's missing, and gets you ready for the interview.
        </p>
      </div>
      <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4 md:border-b">
        {STATS.map((stat, index) => (
          <div key={stat.label} className={statClass(index)}>
            <dt className="text-[13px] text-muted md:text-[15px]">{stat.label}</dt>
            <dd className="headline text-[34px] text-accent md:text-[52px]">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
