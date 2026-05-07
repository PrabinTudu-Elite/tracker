import SvgIcon from '@mui/material/SvgIcon';

export default function SattronIcon() {
  return (
    <SvgIcon sx={{ height: 60, width: 150, mr: 2 }}>
      <svg width="320" height="120" viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
        </defs>

        <g transform="translate(40,20)">
          <path d="M40 0C22 0 8 14 8 32c0 22 32 56 32 56s32-34 32-56C72 14 58 0 40 0z" fill="url(#grad)" />
          <circle cx="40" cy="32" r="10" fill="white" />
        </g>

        <g stroke="#0072ff" strokeWidth="2" fill="none">
          <path d="M110 50 Q125 30 140 50" />
          <path d="M105 60 Q125 20 145 60" />
          <path d="M100 70 Q125 10 150 70" />
        </g>

        <text x="90" y="95" fontFamily="Arial, Helvetica, sans-serif" fontSize="40" fill="#222" letterSpacing="2">
          <tspan fill="#0072ff">SAT</tspan><tspan fill="#00c6ff">TRON</tspan>
        </text>
      </svg>
    </SvgIcon>
  );
}
