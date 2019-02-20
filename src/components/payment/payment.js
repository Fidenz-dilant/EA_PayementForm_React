import React, {Component} from 'react';
import NumberFormat from 'react-number-format';
import Datetime from 'react-datetime';
import creditCardType from 'credit-card-type';
import Form from '../../styles/Form';
import PaymentContainer from './payement-styles';
import '../../assets/date-picker.css';
import { stripePublicKey } from "../../config";
import {DisplayError,DisplaySuccess} from '../../styles/DisplayNotification';

class Payment extends Component {

    constructor(){
        super();

        this.state = {
            expdate: '',
            cardname: '',
            cardnumber: '',
            cvv: '',
            cardType: '',
            displayErrors: '',
            displaySuccess: '',
            isCardValid: true,
            isDateValid: true,
            isCVVValid: true,
            loading: false,
        };

        this.handleDatePicker = this.handleDatePicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDatePicker = (date) => {
        this.setState({ expdate: date.format("MM/YY")});
    };

    handleCreditCardChange = e => {
        const cardType = this.checkCardType(e.value);
       this.setState({
           cardnumber: e.value,
           cardType: cardType
       });
    };

    checkCardType = cardnumber => {
        const cardType = creditCardType(cardnumber);
        if ( cardnumber !== '' && cardType.length > 0  ) {
            return cardType[0].niceType;
        } else {
            return false;
        }
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { cardnumber, cardname, cvv, expdate } = this.state;

        this.setState({
            loading: true,
            displayErrors: '',
            displaySuccess: '',
        });

        window.Stripe.setPublishableKey(stripePublicKey);

        const dateParts = expdate.split("/");
        const month = dateParts[0];
        const year = dateParts[1];

        const isValid = this.checkValidation(cardnumber, cvv, month, year);

        const that = this;

        if (isValid) {
            window.Stripe.card.createToken({
                number: cardnumber,
                name: cardname,
                cvc: cvv,
                exp_month: month,
                exp_year: year
            }, function (status, response) {
                if(response.error) {
                    that.setState({
                        loading: false,
                        displayErrors: response.error.message
                    });
                } else {
                    that.setState({
                        loading: false,
                        displaySuccess: "payment success"
                    });
                }
            });
        }
    };


    checkValidation(cardnumber, cvv, month, year) {

        const isCardValid = window.Stripe.card.validateCardNumber(cardnumber);
        const isDateValid = window.Stripe.card.validateExpiry(month, year);
        const isCVVValid = window.Stripe.card.validateCVC(cvv);

        if ( !isCVVValid || !isDateValid || !isCardValid ) {
            this.setState({
                loading: false,
                displayErrors: true,
                isCardValid: isCardValid,
                isDateValid: isDateValid,
                isCVVValid: isCVVValid
            });
            return false;
        } else {
            return true;
        }
    }

    render() {

        // hide old dates
        const date = Datetime.moment().subtract(1, 'date');
        const valid = function( current ){
            return current.isAfter( date );
        };

        return (
            <PaymentContainer>
                <Form onSubmit={this.handleSubmit}>
                    <h2>Billing Info</h2>
                    <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>
                        { this.state.displayErrors && <DisplayError>
                            <div className="inner">
                                {!this.state.isCardValid && <h3>Please enter valid cardname</h3>}
                                {!this.state.isDateValid && <h3>Please enter vaild experation date</h3>}
                                {!this.state.isCVVValid && <h3>Please enter valid CVV</h3>}
                            </div>
                        </DisplayError>}
                        { this.state.displaySuccess && <DisplaySuccess>
                            <div className="inner">
                                {this.state.displaySuccess}
                            </div>
                        </DisplaySuccess>}
                        <div className="inner-container">
                            <label htmlFor="Cardnumber">
                                <NumberFormat
                                    id="cardnumber"
                                    name="cardnumber"
                                    placeholder="Card Number"
                                    format="#### #### #### #### ####"
                                    value={this.state.cardnumber}
                                    isNumericString={true}
                                    onValueChange={this.handleCreditCardChange}
                                />
                                { this.state.cardType && <span className="card-type">{this.state.cardType}</span> }
                            </label>
                            <label htmlFor="Cardname">
                                <input
                                    type="text"
                                    id="cardname"
                                    name="cardname"
                                    placeholder="Name on Card"
                                    value={this.state.cardname}
                                    onChange={this.handleChange}
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
                                        value={this.state.expdate}
                                        onChange={this.handleDatePicker}
                                        isValidDate={ valid }
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
                                        value={this.state.cvv}
                                        onChange={this.handleChange}
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