interface IconProps {
  size?: number;
  className?: string;
}

export const LambdaIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M4.5 22.5L1.5 22.5L7.5 9L10.5 9L6.75 17.25L9.75 22.5L4.5 22.5Z"/>
    <path d="M12 22.5L9 22.5L15 9L18 9L21 22.5L18 22.5L16.5 16.5L12 22.5Z"/>
    <path d="M13.5 7.5L10.5 7.5L12 4.5L15 4.5L13.5 7.5Z"/>
  </svg>
);

export const KubernetesIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 1L3 5.5V18.5L12 23L21 18.5V5.5L12 1ZM12 3.5L18.5 6.75V11.5L12 15L5.5 11.5V6.75L12 3.5ZM12 6.5C10.9 6.5 10 7.4 10 8.5S10.9 10.5 12 10.5S14 9.6 14 8.5S13.1 6.5 12 6.5Z"/>
    <circle cx="12" cy="8.5" r="1.5"/>
    <path d="M8 12L6 18H8L9 14.5L12 17L15 14.5L16 18H18L16 12L12 15L8 12Z"/>
  </svg>
);

export const TerraformIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M1.5 4.5V11.5L7.5 15V8L1.5 4.5Z"/>
    <path d="M8.5 8V15L14.5 11.5V4.5L8.5 8Z"/>
    <path d="M15.5 4.5V11.5L21.5 8V1L15.5 4.5Z"/>
    <path d="M8.5 16L14.5 19.5V12.5L8.5 16Z"/>
  </svg>
);

export const DockerIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M13 4H15V6H13V4ZM10 4H12V6H10V4ZM7 4H9V6H7V4ZM10 7H12V9H10V7ZM7 7H9V9H7V7ZM4 7H6V9H4V7ZM10 10H12V12H10V10ZM7 10H9V12H7V10ZM4 10H6V12H4V10ZM1 10H3V12H1V10Z"/>
    <path d="M22 11C21.3 10.5 19.8 10.3 18.6 10.6C18.4 9.4 17.6 8.4 16.5 7.8L16 7.5L15.6 8C15.1 8.7 14.8 9.6 14.9 10.5C14.9 10.9 15.1 11.6 15.5 12.1C15.1 12.3 14.3 12.6 13 12.6H0.5C0.3 13.8 0.4 17 2.4 19.3C4 21.2 6.5 22 9.8 22C16.6 22 21.2 18.4 23 12.4C23.4 12.4 24.3 12.5 24.9 11.4L25.2 10.9L22 11Z"/>
  </svg>
);

export const CloudFormationIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M6 18C3.8 18 2 16.2 2 14C2 12.2 3.2 10.6 4.9 10.2C4.9 10.1 4.9 10.1 4.9 10C4.9 7.2 7.1 5 9.9 5C11.8 5 13.5 6.1 14.3 7.7C14.7 7.6 15.1 7.5 15.5 7.5C18 7.5 20 9.5 20 12C20 12.2 20 12.4 20 12.6C21.2 13.2 22 14.5 22 16C22 18.2 20.2 20 18 20H6V18Z"/>
    <path d="M9 13L12 10L15 13M12 10V17" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

export const PulumiIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <circle cx="8" cy="8" r="3"/>
    <circle cx="16" cy="8" r="3"/>
    <circle cx="8" cy="16" r="3"/>
    <circle cx="16" cy="16" r="3"/>
  </svg>
);

export const GitLabIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 21L1 14L4 5L7 12H17L20 5L23 14L12 21Z"/>
    <path d="M7 12L4 5L12 21L7 12Z" fillOpacity="0.7"/>
    <path d="M17 12L20 5L12 21L17 12Z" fillOpacity="0.7"/>
  </svg>
);

// AWS Service Icons
export const EC2Icon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <rect x="3" y="4" width="18" height="16" rx="2" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="6" y="7" width="5" height="4" rx="0.5"/>
    <rect x="13" y="7" width="5" height="4" rx="0.5"/>
    <rect x="6" y="13" width="5" height="4" rx="0.5"/>
    <rect x="13" y="13" width="5" height="4" rx="0.5"/>
  </svg>
);

export const S3Icon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 2L3 6V18L12 22L21 18V6L12 2Z" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 6L6 8.5V15.5L12 18L18 15.5V8.5L12 6Z"/>
    <path d="M12 10V14" stroke="currentColor" strokeWidth="1" fill="none"/>
    <path d="M9 11.5L12 13L15 11.5" stroke="currentColor" strokeWidth="1" fill="none"/>
  </svg>
);

export const RDSIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <ellipse cx="12" cy="6" rx="8" ry="3" fillOpacity="0.4"/>
    <path d="M4 6V18C4 19.7 7.6 21 12 21C16.4 21 20 19.7 20 18V6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <ellipse cx="12" cy="12" rx="8" ry="3" fillOpacity="0.3"/>
    <ellipse cx="12" cy="18" rx="8" ry="3"/>
  </svg>
);

export const VPCIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="3" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="5" y="5" width="6" height="6" rx="1" fillOpacity="0.5"/>
    <rect x="13" y="5" width="6" height="6" rx="1" fillOpacity="0.5"/>
    <rect x="5" y="13" width="6" height="6" rx="1" fillOpacity="0.5"/>
    <rect x="13" y="13" width="6" height="6" rx="1" fillOpacity="0.5"/>
    <path d="M11 8H13M8 11V13M16 11V13M11 16H13" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

export const Route53Icon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <circle cx="12" cy="12" r="9" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 3C12 3 16 7 16 12C16 17 12 21 12 21" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M12 3C12 3 8 7 8 12C8 17 12 21 12 21" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M4 10H20M4 14H20" stroke="currentColor" strokeWidth="1" fill="none"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

export const CloudWatchIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <circle cx="12" cy="12" r="9" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1.5"/>
    <path d="M5 12H7M17 12H19M12 5V7M12 17V19" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

export const IAMIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <circle cx="12" cy="8" r="4" fillOpacity="0.5"/>
    <path d="M4 20C4 16.7 7.6 14 12 14C16.4 14 20 16.7 20 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M15 8L17 6M9 8L7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="8" r="2"/>
  </svg>
);

export const ELBIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <circle cx="12" cy="5" r="3" fillOpacity="0.4"/>
    <circle cx="6" cy="18" r="3" fillOpacity="0.4"/>
    <circle cx="18" cy="18" r="3" fillOpacity="0.4"/>
    <path d="M12 8V12M12 12L6 15M12 12L18 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="5" r="1.5"/>
    <circle cx="6" cy="18" r="1.5"/>
    <circle cx="18" cy="18" r="1.5"/>
  </svg>
);

export const DynamoDBIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 7L12 12L21 7" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M12 12V22" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M8 9L12 11L16 9" stroke="currentColor" strokeWidth="0.8" fill="none"/>
    <path d="M8 15L12 17L16 15" stroke="currentColor" strokeWidth="0.8" fill="none"/>
  </svg>
);

export const SNSIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <circle cx="12" cy="12" r="4"/>
    <circle cx="12" cy="4" r="2" fillOpacity="0.5"/>
    <circle cx="20" cy="12" r="2" fillOpacity="0.5"/>
    <circle cx="12" cy="20" r="2" fillOpacity="0.5"/>
    <circle cx="4" cy="12" r="2" fillOpacity="0.5"/>
    <path d="M12 6V8M12 16V18M6 12H8M16 12H18" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const SQSIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <rect x="3" y="4" width="18" height="16" rx="2" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="5" y="7" width="14" height="3" rx="0.5" fillOpacity="0.6"/>
    <rect x="5" y="11" width="14" height="3" rx="0.5" fillOpacity="0.4"/>
    <rect x="5" y="15" width="14" height="3" rx="0.5" fillOpacity="0.2"/>
    <path d="M8 8.5H16M8 12.5H14M8 16.5H12" stroke="currentColor" strokeWidth="0.8"/>
  </svg>
);

export const APIGatewayIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <rect x="8" y="3" width="8" height="18" rx="1" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 8H8M16 8H21M3 12H8M16 12H21M3 16H8M16 16H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="8" r="1.5"/>
    <circle cx="12" cy="12" r="1.5"/>
    <circle cx="12" cy="16" r="1.5"/>
  </svg>
);

export const ECSIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="6" y="6" width="5" height="5" rx="1"/>
    <rect x="13" y="6" width="5" height="5" rx="1"/>
    <rect x="6" y="13" width="5" height="5" rx="1"/>
    <rect x="13" y="13" width="5" height="5" rx="1"/>
    <path d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5"/>
  </svg>
);

export const EKSIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7L17 10V14L12 17L7 14V10L12 7Z" fillOpacity="0.5"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M12 2V7M12 17V22M3 7L7 10M17 10L21 7M3 17L7 14M17 14L21 17" stroke="currentColor" strokeWidth="0.8"/>
  </svg>
);
