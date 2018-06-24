/*
export const someMutation = (state) => {
}
*/

export const char = (state, payload) => {
  let { type, pkg } = payload
  if (type === 'CHAR_CREATE') {
    state.char = pkg
  }
  if (type === 'CHAR_SAVE') {
    state.char = {
      ...pkg,
      skills: state.char.skills
    }
  }
}

export const skill = (state, payload) => {
  let { type, pkg } = payload
  if (type === 'SKILL_ADD') {
    let char = state.char
    char.skills = char.skills.concat(pkg)
    state.char = char
  }
}

export const effect = (state, payload) => {
  let { type, pkg, skill } = payload
  if (type === 'EFFECT_ADD') {
    let char = state.char
    let skills = char.skills[skill]
    skills.effects = skills.effects.concat(pkg)
    state.char = char
  }
}

export const after = (state, payload) => {
  let { type, pkg, skill, effect } = payload
  if (type === 'AFTER_ADD') {
    let char = state.char
    let skills = char.skills[skill]
    let effects = char.skills[skill].effects[effect]
    effects.after = effects.after.concat(pkg)
    state.char = char
  }
}
