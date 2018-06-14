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

export const redeem = state => {
  state.redeem = {
    g: 0,
    b: 0,
    r: 0,
    w: 0
  }
}

export const queue = (state, payload) => {
  let { type, pkg } = payload
  if (type === 'QUEUE_SKILL') {
    let buffer = {
      caster: {
        id: pkg.char,
        team: pkg.team
      },
      skill: pkg.skill,
      target: {},
      turnid: state.state.turnid
    }
    state.buffer = buffer
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
    state.action = [buffer].concat(state.action)
  }
}
