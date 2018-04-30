import { prepareCreditTransfer } from '../../../src/actions/creditTransfersActions';
import { CREDIT_TRANSFER_STATUS, CREDIT_TRANSFER_TYPES, DEFAULT_ORGANIZATION } from '../../../src/constants/values';

test('prepareCreditTransfer should return the right data for Credit Transfers (Sell)', () => {
  const data = prepareCreditTransfer({
    creditsFrom: {
      id: 2
    },
    creditsTo: {
      id: 5
    },
    note: '',
    numberOfCredits: 100,
    tradeEffectiveDate: '01/01/2018',
    transferType: CREDIT_TRANSFER_TYPES.sell.id,
    zeroDollarReason: ''
  });

  expect({
    initiator: 2,
    note: '',
    numberOfCredits: 100,
    respondent: 5,
    status: CREDIT_TRANSFER_STATUS.approved.id,
    tradeEffectiveDate: '01/01/2018',
    type: CREDIT_TRANSFER_TYPES.sell.id,
    zeroReason: ''
  }).toEqual(data);
});

test('prepareCreditTransfer should return the right data for Part 3 Award', () => {
  const data = prepareCreditTransfer({
    creditsFrom: {
      id: 0
    },
    creditsTo: {
      id: 5
    },
    note: '',
    numberOfCredits: 100,
    tradeEffectiveDate: '01/01/2018',
    transferType: CREDIT_TRANSFER_TYPES.part3Award.id,
    zeroDollarReason: ''
  });

  expect({
    initiator: DEFAULT_ORGANIZATION.id,
    note: '',
    numberOfCredits: 100,
    respondent: 5,
    status: CREDIT_TRANSFER_STATUS.approved.id,
    tradeEffectiveDate: '01/01/2018',
    type: CREDIT_TRANSFER_TYPES.part3Award.id,
    zeroReason: ''
  }).toEqual(data);
});

test('prepareCreditTransfer should return the right data for Validation', () => {
  const data = prepareCreditTransfer({
    creditsFrom: {
      id: 0
    },
    creditsTo: {
      id: 5
    },
    note: '',
    numberOfCredits: 100,
    tradeEffectiveDate: '01/01/2018',
    transferType: CREDIT_TRANSFER_TYPES.validation.id,
    zeroDollarReason: ''
  });

  expect({
    initiator: DEFAULT_ORGANIZATION.id,
    note: '',
    numberOfCredits: 100,
    respondent: 5,
    status: CREDIT_TRANSFER_STATUS.approved.id,
    tradeEffectiveDate: '01/01/2018',
    type: CREDIT_TRANSFER_TYPES.validation.id,
    zeroReason: ''
  }).toEqual(data);
});

test('prepareCreditTransfer should return the right data for Reduction', () => {
  const data = prepareCreditTransfer({
    creditsFrom: {
      id: 5
    },
    creditsTo: {
      id: 0
    },
    note: '',
    numberOfCredits: 100,
    tradeEffectiveDate: '01/01/2018',
    transferType: CREDIT_TRANSFER_TYPES.retirement.id,
    zeroDollarReason: ''
  });

  expect({
    initiator: 5,
    note: '',
    numberOfCredits: 100,
    respondent: DEFAULT_ORGANIZATION.id,
    status: CREDIT_TRANSFER_STATUS.approved.id,
    tradeEffectiveDate: '01/01/2018',
    type: CREDIT_TRANSFER_TYPES.retirement.id,
    zeroReason: ''
  }).toEqual(data);
});
