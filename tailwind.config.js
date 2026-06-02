module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Page / canvas
        bg:               '#0A0A0A',
        background:       '#131313',
        surface:          '#131313',
        'surface-dim':    '#131313',
        'surface-bright': '#3a3939',

        // Card layers
        panel:                      '#121212',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-low':    '#1c1b1b',
        'surface-container':        '#201f1f',
        'surface-container-high':   '#2a2a2a',
        'surface-container-highest':'#353534',
        'surface-variant':          '#353534',

        // Primary — mint green
        primary:                   '#4edea3',
        'primary-fixed':           '#6ffbbe',
        'primary-fixed-dim':       '#4edea3',
        'primary-container':       '#10b981',
        'on-primary':              '#003824',
        'on-primary-container':    '#00422b',
        'on-primary-fixed':        '#002113',
        'on-primary-fixed-variant':'#005236',
        'inverse-primary':         '#006c49',

        // Secondary
        secondary:                   '#c6c6c7',
        'secondary-container':        '#454747',
        'secondary-fixed':            '#e2e2e2',
        'secondary-fixed-dim':        '#c6c6c7',
        'on-secondary':               '#2f3131',
        'on-secondary-container':     '#b4b5b5',
        'on-secondary-fixed':         '#1a1c1c',
        'on-secondary-fixed-variant': '#454747',

        // Tertiary
        tertiary:                   '#c8c6c5',
        'tertiary-container':        '#a4a2a2',
        'tertiary-fixed':            '#e5e2e1',
        'tertiary-fixed-dim':        '#c8c6c5',
        'on-tertiary':               '#313030',
        'on-tertiary-container':     '#393939',
        'on-tertiary-fixed':         '#1b1b1b',
        'on-tertiary-fixed-variant': '#474746',

        // On-surfaces
        'on-surface':         '#e5e2e1',
        'on-surface-variant': '#bbcabf',
        'on-background':      '#e5e2e1',
        'inverse-on-surface': '#313030',
        'inverse-surface':    '#e5e2e1',

        // Borders
        outline:         '#86948a',
        'outline-variant':'#3c4a42',

        // Error
        error:               '#ffb4ab',
        'error-container':   '#93000a',
        'on-error':          '#690005',
        'on-error-container':'#ffdad6',

        // Misc
        'surface-tint': '#4edea3',

        // Legacy aliases (keeps old refs alive)
        accent:  '#4edea3',
        success: '#10b981',
        muted:   '#64748b',
      },

      fontFamily: {
        sans:               ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:               ['JetBrains Mono', 'ui-monospace', 'monospace'],
        'headline-lg':      ['Inter'],
        'headline-lg-mobile':['Inter'],
        'display-lg':       ['Inter'],
        'metric-md':        ['Inter'],
        'body-md':          ['Inter'],
        'label-sm':         ['JetBrains Mono'],
      },

      fontSize: {
        'display-lg':        ['48px', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '700' }],
        'headline-lg':       ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-lg-mobile':['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'metric-md':         ['24px', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-md':           ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-sm':          ['12px', { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '500' }],
      },

      spacing: {
        xs:     '4px',
        sm:     '12px',
        md:     '24px',
        lg:     '40px',
        xl:     '64px',
        base:   '8px',
        gutter: '24px',
        margin: '32px',
      },

      borderRadius: {
        DEFAULT: '0.125rem',
        lg:      '0.25rem',
        xl:      '0.5rem',
        full:    '0.75rem',
      },
    }
  },
  plugins: []
}
