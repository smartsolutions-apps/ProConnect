
export type WizardStep = 'UPLOAD' | 'VERIFY' | 'PITCH' | 'SUCCESS';

export interface WizardFormData {
  name: string;
  jobTitle: string;
  university: string;
  location: string;
  skills: string[];
  summary: string;
}

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  data: WizardFormData;
  updateData: (updates: Partial<WizardFormData>) => void;
}
