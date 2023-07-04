module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: 'npx next start',
      url: ['http://localhost:3000/'],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
