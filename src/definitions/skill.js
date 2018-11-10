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
  persistence: [{ type: 'default', value: 'instant', schema: 'string' }],
  class: [{ type: 'default', value: 'physical', schema: 'string' }],
  effects: [],
  target: [{ type: 'default', value: 'enemy', schema: 'string' }],
  cooldown: [{ type: 'default', value: 0, schema: 'int' }],
  cost: {
    g: [{ type: 'default', value: 0, schema: 'int' }],
    r: [{ type: 'default', value: 0, schema: 'int' }],
    b: [{ type: 'default', value: 0, schema: 'int' }],
    w: [{ type: 'default', value: 0, schema: 'int' }],
    rd: [{ type: 'default', value: 0, schema: 'int' }]
  }
}

let skillMutable = {
  counter: 0,
  active: true,
  store: []
}

let skillState = {
  isHarmful: [{ type: 'default', value: true, schema: 'bool' }],
  isAllowed: [{ type: 'default', value: true, schema: 'bool' }], //Condition
  isCooldown: false,
  isStore: [{ type: 'default', value: false, schema: 'bool' }],
  isIgnoreCounter: [{ type: 'default', value: false, schema: 'bool' }],
  isIgnoreStun: [{ type: 'default', value: false, schema: 'bool' }],
  isIgnoreInvul: [{ type: 'default', value: false, schema: 'bool' }]
}

let skill = {
  ...skillView,
  ...skillMeta,
  ...skillBasic,
  ...skillMutable,
  ...skillState
}

export default skill
