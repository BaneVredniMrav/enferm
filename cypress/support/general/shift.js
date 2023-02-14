export const ShiftStatuses = {
  Unfilled: 1,
  Booked: 2,
  AmendmentPending: 3,
  RecoveryPending: 4,
  InProgress: 5,
  AwaitingCandidate: 6,
  AwaitingClient: 7,
  AwaitingAgency: 8,
  TimesheetRejected: 9,
  InQuery: 10,
  Invoiced: 11,
  CancellationPending: 12,
  Canceled: 13,
  NeverFilled: 14,
  Completed: 15,
  AmendmentRequired: 16
}

export const ShiftSegments = {
  LongDay: {
    startTime: '05:30',
    endTime: '21:00'
  },
  Night: {
    startTime: '17:00',
    endTime: '08:30'
  },
  Early: {
    startTime: '06:00',
    endTime: '15:00'
  },
  Twilight: {
    startTime: '10:30',
    endTime: '02:00'
  },
  Late: {
    startTime: '12:00',
    endTime: '21:00'
  }
}

export const PaymentTypes = {
  Hourly: 1,
  Daily: 2
}

export const RequestTypes = {
  AllOrNothing: 1,
  Partial: 2
}

export const SendTypes = {
  Combined: 1,
  Sequentially: 2
}

export const SignOffMethods = {
  Push: 1,
  Pin: 2,
  Signature: 3
}

export const ShiftCancellationReasons = {
  Sick: 1,
  NotAvailable: 2,
  ChildcareIssue: 3,
  PersonalIssue: 4,
  DoesNotLikeWard: 5,
  CovidPositive: 6,
  CovidIsolation: 7,
  Holiday: 8,
  Transport: 9,
  Restricted: 10,
  ClientCancelled: 11,
  CoveredBankStaff: 12,
  NotRequired: 13,
  DNA: 14,
  BookedError: 15,
  Other: 16
}
