import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import CreditTransferSigningHistory from '../components/CreditTransferSigningHistory'
import store from '../../store/store'
import moment from 'moment'

describe('CreditTransferSigningHistory', () => {
  test('renders the component correctly', () => {
    const historyMock = [{
      user: {
        firstName: 'John',
        lastName: 'Doe',
        organization: {
          name: 'Organization Name'
        }
      },
      status: {
        id: 'someStatusId'
      },
      createTimestamp: new Date()
    }]

    const props = {
      history: historyMock,
      dateOfWrittenAgreement: moment().format('LL'),
      categoryDSelected: false
    }

    const component = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <CreditTransferSigningHistory {...props} />
        </Provider>
      </BrowserRouter>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render the component with dateOfWrittenAgreement as null', () => {
    const historyMock = [{
      user: {
        firstName: 'John',
        lastName: 'Doe',
        organization: {
          name: 'Organization Name'
        }
      },
      status: {
        id: 'someStatusId'
      },
      createTimestamp: new Date()
    }]

    const props = {
      history: historyMock,
      dateOfWrittenAgreement: null,
      categoryDSelected: false
    }

    const component = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <CreditTransferSigningHistory {...props} />
        </Provider>
      </BrowserRouter>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  let agreementDate = new Date()

  test('returns category A if differenceInMonths <= 6', () => {
    agreementDate.setMonth(agreementDate.getMonth() - 5) // Five months ago
    const result = CreditTransferSigningHistory.calculateTransferCategoryAndNextChange(agreementDate, false)
    expect(result).toEqual({ category: 'A', nextChangeInMonths: 2 })
  })

  test('returns category B if differenceInMonths > 6 and differenceInMonths <= 12', () => {
    agreementDate = new Date()
    agreementDate.setMonth(agreementDate.getMonth() - 7) // Seven months ago
    const result = CreditTransferSigningHistory.calculateTransferCategoryAndNextChange(agreementDate, false)
    expect(result).toEqual({ category: 'B', nextChangeInMonths: 6 })
  })

  test('returns category C if differenceInMonths > 12', () => {
    agreementDate = new Date()
    agreementDate.setFullYear(agreementDate.getFullYear() - 2) // Two years ago
    const result = CreditTransferSigningHistory.calculateTransferCategoryAndNextChange(agreementDate, false)
    expect(result).toEqual({ category: 'C', nextChangeInMonths: null })
  })

  test('returns category D if categoryDSelected is true', () => {
    const result = CreditTransferSigningHistory.calculateTransferCategoryAndNextChange(agreementDate, true)
    expect(result).toEqual({ category: 'D', nextChangeInMonths: null })
  })
})
