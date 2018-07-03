export default {
  loaded: false,
  buffer: {
    active: false,
    caster: {},
    skill: null,
    target: {},
    turnid: ''
  },
  state: {},
  action: [],
  redeem: {
    g: 0,
    r: 0,
    b: 0,
    w: 0
  },
  exchange: {
    receive: '',
    offer: {
      g: 0,
      r: 0,
      b: 0,
      w: 0
    }
  },
  meta: {
    mode: 'playing', //playing, spectate, replay
    channel: 'private', //private, ladder,
    ally: 'odd',
    enemy: 'even'
  }
}
