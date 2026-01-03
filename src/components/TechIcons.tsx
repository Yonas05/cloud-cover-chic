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

export const AnsibleIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <circle cx="12" cy="12" r="10" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 6L16 16H8L12 6Z"/>
    <path d="M10 14L12 9L14 14H10Z" fill="currentColor" fillOpacity="0.5"/>
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

export const JenkinsIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <circle cx="12" cy="10" r="7" fillOpacity="0.3"/>
    <path d="M12 4C15.3 4 18 6.7 18 10C18 12 17 13.8 15.4 14.8L16 20H8L8.6 14.8C7 13.8 6 12 6 10C6 6.7 8.7 4 12 4Z"/>
    <circle cx="10" cy="9" r="1.2" fill="hsl(var(--background))"/>
    <circle cx="14" cy="9" r="1.2" fill="hsl(var(--background))"/>
    <path d="M10 12H14" stroke="hsl(var(--background))" strokeWidth="0.8" strokeLinecap="round"/>
  </svg>
);

export const GitLabIcon = ({ size = 32, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 21L1 14L4 5L7 12H17L20 5L23 14L12 21Z"/>
    <path d="M7 12L4 5L12 21L7 12Z" fillOpacity="0.7"/>
    <path d="M17 12L20 5L12 21L17 12Z" fillOpacity="0.7"/>
  </svg>
);
