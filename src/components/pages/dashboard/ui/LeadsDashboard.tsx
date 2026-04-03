import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  XAxis,
  YAxis,
} from 'recharts';
import type {
  LeadsChannelItem,
  LeadsDashboardViewModel,
} from '@/components/pages/dashboard/model/useLeadsDashboard.ts';

type ActiveShapeProps = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: LeadsChannelItem;
  value: number;
};

const renderActiveShape = (props: unknown) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props as ActiveShapeProps;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.2}
      />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fill="#3B2F24"
        fontSize={8}
        fontFamily="DM Sans"
      >
        {payload.label}
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fill="#2D5A3D"
        fontSize={10}
        fontFamily="DM Sans"
        fontWeight={600}
      >
        {value} leads
      </text>
    </g>
  );
};

export const LeadsDashboard = ({
  visitsTotal,
  visitsSeries,
  visitsXTicks,
  visitsYTicks,
  formatDate,
  rangeLabel,
  rangeOptions,
  menuOpen,
  menuRef,
  onToggleMenu,
  onSelectRange,
  businessData,
  channels,
  onSliceEnter,
  onSliceLeave,
}: LeadsDashboardViewModel) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-[18px] border border-[#EFE7DE] bg-white shadow-[0_20px_40px_rgba(40,30,20,0.08)] p-6">
        <h3 className="font-cormorant text-[16px] leading-6 font-semibold text-[#3B2F24]">
          Registro de visitas
        </h3>
        <div className="mt-2">
          <div className="text-[26px] leading-7.5 font-semibold text-[#2D5A3D] font-dm-sans">
            {visitsTotal.toLocaleString('en-US')}
          </div>
          <div className="text-[12px] text-[#9C9389] font-dm-sans">
            Visitantes
          </div>
        </div>
        <div className="mt-4 h-35">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={visitsSeries}
              margin={{ top: 6, right: 8, left: -6, bottom: 0 }}
            >
              <defs>
                <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4E7E5C" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4E7E5C" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#EEE7E0"
                strokeDasharray="2 3"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                ticks={visitsXTicks}
                tickFormatter={formatDate}
                tick={{ fill: '#9C9389', fontSize: 9, fontFamily: 'DM Sans' }}
                axisLine={false}
                tickLine={false}
                tickMargin={6}
              />
              <YAxis
                ticks={visitsYTicks}
                domain={[0, Math.max(...visitsYTicks)]}
                tick={{ fill: '#9C9389', fontSize: 9, fontFamily: 'DM Sans' }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2D5A3D"
                strokeWidth={2}
                fill="url(#visitsGradient)"
                dot={false}
                activeDot={false}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-[#9C9389] font-dm-sans">
          <span>Rango de tiempo:</span>
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center gap-1 text-[#5F574E]"
              onClick={onToggleMenu}
              aria-expanded={menuOpen}
            >
              <span className="font-semibold">{rangeLabel}</span>
              <span className="text-[10px]">{menuOpen ? '▲' : '▼'}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 bottom-7 w-36 rounded-xl border border-[#EFE7DE] bg-white shadow-[0_12px_26px_rgba(40,30,20,0.12)] p-2">
                <div className="space-y-1">
                  {rangeOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => onSelectRange(option.key)}
                      className={`w-full text-left px-2 py-1 rounded-lg text-[11px] font-dm-sans ${
                        option.active
                          ? 'bg-[#6B9E7A] text-white'
                          : 'text-[#5F574E] hover:bg-[#F3EEE8]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-[18px] border border-[#EFE7DE] bg-white shadow-[0_20px_40px_rgba(40,30,20,0.08)] p-6">
        <h3 className="font-cormorant text-[20px] leading-7 font-bold text-[#3B2F24]">
          Clientes potenciales
        </h3>
        <div className="mt-4 space-y-3">
          {businessData.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.12em] text-[#8B8176] font-dm-sans">
                <span>{item.label}</span>
                <span>{item.percent}%</span>
              </div>
              <div className="h-1 rounded-full bg-[#F3EEE8]">
                <div
                  className="h-full rounded-full bg-[#6B9E7A]"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-[#EFE7DE] bg-white shadow-[0_20px_40px_rgba(40,30,20,0.08)] p-6">
        <h3 className="font-cormorant text-[20px] leading-7 font-bold text-[#3B2F24]">
          Canal de adquisición
        </h3>
        <div className="mt-5 flex items-center justify-center">
          <div className="h-24 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channels}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={28}
                  outerRadius={42}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  paddingAngle={1}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => onSliceEnter(index)}
                  onMouseLeave={onSliceLeave}
                  isAnimationActive={false}
                >
                  {channels.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="my-4 h-px bg-[#EFE7DE]" />
        <div className="space-y-2">
          {channels.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-[11px] text-[#5F574E] font-dm-sans"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}</span>
              </div>
              <span className="text-[#8B8176]">{item.value} leads</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
