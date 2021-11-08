module.exports = ({ env }) => ({
    email: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('SENDER_MAIL'),
        defaultReplyTo: env('SENDER_MAIL'),
        testAddress: env('SENDER_MAIL'),
      },
    },
  });