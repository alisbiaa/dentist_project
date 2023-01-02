export class CreateProfileDto {
  //    note. DTO stands for Data Transfer Object
  id: number;
  first_name: string;
  last_name: string;
  gender: 'F' | 'M';
  date_of_birth: number; // note. all dates are epoch numbers
  passport_id: number | undefined;
  national_id: number | undefined;
  role_id: number; // note. FK -> roles model
  active: boolean;
}
