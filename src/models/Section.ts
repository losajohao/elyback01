export interface Section {
  id: number;
  grade_id: number;
  name: string;
  period_id: number;
  classroom: string;
  capacity: number;
  tutor_id: number | null;
  createdAt: Date;
  updatedAt: Date;
}
