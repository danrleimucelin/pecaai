export default {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        'https://maps.googleapis.com',
        'https://www.google.com',
        'https://www.gstatic.com'
      ],
      connectSrc: [
        "'self'",
        'https://some-domain.com',
        'https://some.other.domain.com'
      ],
      styleSrc: ["'self'", 'fonts.googleapis.com', "'unsafe-inline'"],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: [
        "'self'",
        'https://maps.gstatic.com',
        'https://maps.googleapis.com',
        'data:',
        'https://another-domain.com'
      ],
      frameSrc: ["'self'", 'https://www.google.com']
    }
  }
}
