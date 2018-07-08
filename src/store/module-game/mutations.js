/*
export const someMutation = (state) => {
}
*/

export const load = (state, payload) => {
  state.loaded = payload
}

export const action = (state, payload) => {
  state.action = payload
}

export const state = (state, payload) => {
  state.state = payload
}

export const meta = (state, payload) => {
  state.meta = payload
}

export const exchange = (state, payload) => {
  let { type, pkg } = payload
  if (type === 'RESET') {
    state.exchange.receive = ''
    state.exchange.offer = {
      g: 0,
      r: 0,
      b: 0,
      w: 0
    }
  }
  if (type === 'EXCHANGE') {
    state.exchange.receive = pkg.receive
    state.exchange.offer = pkg.offer
  }
}

export const redeem = (state, payload) => {
  let { type, pkg } = payload
  if (type === 'RESET') {
    state.redeem = {
      g: 0,
      r: 0,
      b: 0,
      w: 0
    }
  }
  if (type === 'MUTATE') {
    state.redeem = pkg
  }
}

export const queue = (state, payload) => {
  let { type, pkg } = payload
  if (type === 'QUEUE_SKILL') {
    let buffer = {
      active: true,
      caster: {
        char: pkg.char,
        team: pkg.team
      },
      skill: pkg.skill,
      target: {},
      turnid: state.state.turnid
    }
    state.buffer = buffer
  }
  if (type === 'QUEUE_REMOVE') {
    state.action = state.action.filter(
      x =>
        !(
          x.caster.char === pkg.char &&
          x.caster.team === pkg.team &&
          x.skill === pkg.skill &&
          x.turnid === pkg.turnid
        )
    )
  }
}

export const target = (state, payload) => {
  let { type, pkg } = payload
  if (type === 'TARGET_REGISTER') {
    let buffer = {
      ...state.buffer,
      target: {
        id: pkg.char,
        team: pkg.team
      }
    }
    delete buffer.active
    state.action = [buffer].concat(state.action)
  }
}

export const buffer = (state, payload) => {
  let { type, pkg } = payload
  if (type === 'RESET') {
    state.buffer = {
      active: false,
      caster: {},
      skill: null,
      target: {},
      turnid: ''
    }
  }
}

export const desc = (state, payload) => {
  let { type, pkg } = payload
  if (type === 'PROFILE') {
    state.desc.mode = 'profile'
    state.desc.team = pkg.team
  }
  if (type === 'CHAR') {
    state.desc.mode = 'char'
    state.desc.team = pkg.team
    state.desc.char = pkg.char
  }
  if (type === 'SKILL') {
    state.desc.mode = 'skill'
    state.desc.team = pkg.team
    state.desc.char = pkg.char
    state.desc.skill = pkg.skill
  }
}

export const settings = (state, payload) => {
  let { type } = payload
  if (type === 'SKILLS') {
    state.settings.skills = !state.settings.skills
  }
}
