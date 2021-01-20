import type {SklepTypes} from '@sklep/types';
import {useRouter} from 'next/router';
import React from 'react';
import * as Yup from 'yup';

import {FinalFormWrapper} from '../../utils/formUtils';

import {AddressForm} from './components/addressForm/AddressForm';
import {CheckoutSummary} from './components/summary/CheckoutSummary';
import {useStripePayment} from './utils/useStripePayment';

type CheckoutProps = {
    readonly cart: SklepTypes['postCart200Response']['data'];
};

export type AddressDetails = {
    readonly firstName: String,
    readonly lastName: String,
    readonly streetName: String,
    readonly houseNumber: String,
    readonly apartmentNumber: String,
    readonly city: String,
    readonly zipCode: String,
    readonly phone: String,
    readonly email: String,
}

const checkoutSchema = Yup.object({
    firstName: Yup.string().required('Pole jest wymagane'),
    lastName: Yup.string().required('Pole jest wymagane'),
    streetName: Yup.string().required('Pole jest wymagane'),
    houseNumber: Yup.string().required('Pole jest wymagane'),
    city: Yup.string().required('Pole jest wymagane'),
    zipCode: Yup.string().required('Pole jest wymagane'),
    shippment: Yup.string().required('Pole jest wymagane'),
}).required();

const getAddressDetails = (orderDetails: AddressDetails): AddressDetails => {
    const {
        firstName,
        lastName,
        streetName,
        houseNumber,
        apartmentNumber,
        zipCode,
        city,
        phone,
        email
    } = orderDetails
    return {
        firstName,
        lastName,
        streetName,
        houseNumber,
        apartmentNumber,
        zipCode,
        city,
        phone,
        email
    }
}

export type CheckoutType = Yup.InferType<typeof checkoutSchema>;

export const Checkout = React.memo<CheckoutProps>(({cart}) => {
    const router = useRouter();
    const [processPayment, {isLoading}] = useStripePayment();

    const handleSubmit = React.useCallback(async values => {
        const address = getAddressDetails(values);
        const response = await processPayment(address);
        if (response?.orderId) {
            await router.replace(`/zamowienie/${response.orderId}`);
        }
    }, [processPayment, router]);

    return (
        <>
            <FinalFormWrapper
                schema={checkoutSchema}
                onSubmit={handleSubmit}
                initialValues={{
                    shippment: 'poczta',
                }}
                className="container mx-auto flex flex-col md:flex-row px-2 pb-12 worksans py-8"
            >
                <AddressForm/>
                <CheckoutSummary cart={cart} processing={isLoading}/>
            </FinalFormWrapper>
            {/* @todo błędy płatności */}
        </>
    );
});

Checkout.displayName = 'Checkout';
