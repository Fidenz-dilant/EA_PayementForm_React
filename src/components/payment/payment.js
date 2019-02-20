import React, {Component} from 'react';
import NumberFormat from 'react-number-format';
import Datetime from 'react-datetime';
import Form from '../../styles/Form';
import PaymentContainer from './payement-styles';
import '../../assets/date-picker.css';

class Payment extends Component {
    render() {
        return (
            <PaymentContainer>
                <Form>
                    <h2>Billing Info</h2>
                    <fieldset>
                        <div className="inner-container">
                            <label htmlFor="Cardnumber">
                                <NumberFormat
                                    id="cardnumber"
                                    name="cardnumber"
                                    placeholder="Card Number"
                                    format="#### #### #### #### ####"
                                    isNumericString={true}
                                />
                            </label>
                            <label htmlFor="Cardname">
                                <input
                                    type="text"
                                    id="cardname"
                                    name="cardname"
                                    placeholder="Name on Card"
                                />
                            </label>
                            <div className="two-half">
                                <label htmlFor="Expdate">
                                    <Datetime
                                        inputProps={{
                                            className: 'expDateInput',
                                            placeholder: 'Expiration Date',
                                            readOnly: true
                                        }}
                                        timeFormat={false}
                                        locale='en-US'
                                        viewMode='years'
                                        dateFormat='MM/YY'
                                        closeOnSelect
                                    />
                                </label>
                                <label htmlFor="CVV">
                                    <input
                                        type="number"
                                        id="cvv"
                                        name="cvv"
                                        placeholder="CVV"
                                    />
                                </label>
                            </div>
                            <button type="submit">Pay</button>
                        </div>
                    </fieldset>
                </Form>
            </PaymentContainer>
        );
    }
}

export default Payment;