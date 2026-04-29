export type UserRole = "babysitter" | "family" | "admin";

export type VerificationStatus = "draft" | "submitted" | "verified" | "rejected";
export type JobStatus =
  | "draft"
  | "published"
  | "under_review"
  | "matched"
  | "confirmed"
  | "completed"
  | "cancelled";
export type ApplicationStatus =
  | "submitted"
  | "shortlisted"
  | "accepted"
  | "declined"
  | "withdrawn";
export type SafetySeverity = "info" | "attention" | "critical";

export interface TrustCheckpoint {
  label: string;
  detail: string;
}

export interface Job {
  id: string;
  title: string;
  city: string;
  date: string;
  hours: string;
  pay: string;
  status: JobStatus;
  children: string;
  requirements: string[];
  contactUnlocked: boolean;
}

export interface Application {
  id: string;
  sitterName: string;
  badges: string[];
  note: string;
  status: ApplicationStatus;
  responseTime: string;
}

export interface SafetyCase {
  id: string;
  title: string;
  severity: SafetySeverity;
  owner: string;
  nextAction: string;
}

export interface AuditEvent {
  id: string;
  at: string;
  actor: string;
  action: string;
  reason: string;
}

export interface RoleExperience {
  role: UserRole;
  label: string;
  heading: string;
  intro: string;
  priorities: string[];
  trustChecklist: TrustCheckpoint[];
  jobs: Job[];
  applications: Application[];
  safetyCases: SafetyCase[];
  auditTrail: AuditEvent[];
}
