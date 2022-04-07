module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'b7ea4562b2418d09836ec7a6fe4e66b7'),
  },
});
