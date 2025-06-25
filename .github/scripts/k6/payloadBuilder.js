export function buildDebitPayload() {
  const referenceNumber = Date.now();
  const recipientTransactionId = referenceNumber + 1;
  const merchantCustRef = referenceNumber + 2;
  return JSON.stringify({
    referenceNumber,
    recipientTransactionId,
    authorizationDate: "2025-06-11T11:12:45Z",
    paymentMethod: "CEMBRAPAY",
    requestedAmount: 1000,
    currency: "CHF",
    autoConfirm: false,
    customer: {
      id: merchantCustRef,
      firstName: "Max",
      lastName: "Mustermann",
      type: "P",
      language: "de",
      birthDate: "1950-01-01",
      email: "BI1-sampleemail@mustermann.sample.ch",
      mobile: "+41777717777",
      street: "Bahnstrasse 1",
      country: "CH",
      zipCode: "8603",
      city: "Schwerzenbach",
    },
    order: {
      articles: new Array(5).fill({ type: "505771", price: "1000" }),
    },
    cembraPay: {
      custDetails: {
        loggedIn: false,
        salutation: "N",
      },
      deliveryDetails: {
        deliveryDetailsDifferent: false,
        deliveryMethod: "PICK-UP",
      },
      cembraPayDetails: {
        cembraPayPaymentMethod: "SINGLE-INVOICE",
      },
      merchantDetails: {
        integrationModule: "MERCHANT Shopware 6 Plugin v. 1.1.2",
        transactionChannel: "WEB",
      },
    },
  });
}

export function buildConfirmPayload() {
  const referenceNumber = Date.now();
  return JSON.stringify({
    referenceNumber,
    confirmationAmount: "1000",
    paymentMethod: "CEMBRAPAY",
    currency: "CHF",
    cembraPay: {
      msgExtensions: [
        {
          key: "testKey",
          value: "dGVzdFZhbHVl",
        },
      ],
    },
  });
}
