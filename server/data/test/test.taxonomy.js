export let taxonomy = {
		text: [
      {
        txt: 'signal problems',
        expect: {
          text: ['signal_problems'],
          regex: ['signal_problems'],
          mixed: ['signal_problems'],
        },
      },
      {
        txt: 'route change',
        expect: {
          text: ['route_change'],
          regex: ['route_change'],
          mixed: ['route_change'],
        },
      },
      {
        txt: 'routechange',
        expect: {
          text: [],
          regex: ['route_change'],
          mixed: ['route_change'],
        },
      },
      {
        txt: 'some [A] running over the [F] from ... to ...',
        expect: {
          text: [],
          regex: ['route_change'],
          mixed: ['route_change'],
        },
      },
    ],
  library: {
    text: {
      wrapper: {
        'signal_problems': ['signal problems'],
        'route_change': ['route change']
      }
    },
    regex: {
      wrapper: {
        'signal_problems': [/signal\s*problems/i],
        'route_change': [
          /route\s*change/i,
          /running\s*over\s*the\s*\[[A-Z0-9]\]/i,
        ]
      }
    },
    mixed: {
      'wrapper': {
        'signal_problems': ['signal problems', /signal\s*problems/i],
        'route_change': [
          'route change',
          /route\s*change/i,
          /running\s*over\s*the\s*\[[A-Z0-9]\]/i,
        ]
      }
    },
  },
};
