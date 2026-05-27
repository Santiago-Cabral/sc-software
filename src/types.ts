export interface BookingFormState {
  businessName: string;
  niche: string;
  contactName: string;
  phone: string;
  selectedDate: string;
  selectedTime: string;
}

export interface CalculatorState {
  dailyInquiries: number;
  minutesPerInquiry: number;
  averageTicket: number;
}

export interface CalculatorResults {
  hoursWastedPerMonth: number;
  potentialLostRevenue: number;
  potentialRecoveredRevenue: number;
  savedDaysPerYear: number;
}

export interface SelectionState {
  barberService: string;
  barberTime: string;
  barberDate: string;
  barberName: string;
  deliveryItems: { id: string; name: string; price: number; quantity: number }[];
  deliveryAddress: string;
  tenisCourt: string;
  tenisTime: string;
  tenisDate: string;
}
