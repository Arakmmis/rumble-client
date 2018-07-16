//Skill
let skillView = {
  name: '',
  description: '',
  picture: ''
}

let skillMeta = {
  id: '',
  index: 0,
  caster: '' //Caster ID
}

let skillBasic = {
  persistence: '',
  class: '',
  effects: [],
  target: '',
  cooldown: 0,
  cost: {
    g: 0,
    r: 0,
    b: 0,
    w: 0,
    rd: 0
  }
}

let skillMutable = {
  counter: 0,
  active: true,
  store: []
}

let skillState = {
  isHarmful: [{ type: 'default', value: true }],
  isAllowed: [{ type: 'default', value: true }], //Condition
  isCooldown: false,
  isStore: [{ type: 'default', value: false }],
  isIgnoreCounter: [{ type: 'default', value: false }],
  isIgnoreStun: [{ type: 'default', value: false }],
  isIgnoreInvul: [{ type: 'default', value: false }]
}

let skill = {
  ...skillView,
  ...skillMeta,
  ...skillBasic,
  ...skillMutable,
  ...skillState
}

export default skill
