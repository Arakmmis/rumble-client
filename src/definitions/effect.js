//Define

let effectView = {
  name: '', //Inherit from Skill
  description: '',
  display: '' //Internal nickname
}

let effectMeta = {
  id: '', //Inherit from Skill
  caster: '', //Caster's id
  turnid: '' //Turn Id
}

let effectBasic = {
  type: '',
  val: [{ type: 'default', value: 0, schema: 'int' }],
  action: '', //tied per types
  target: [{ type: 'default', value: 'target', schema: 'string' }], //Caster or target
  duration: [{ type: 'default', value: 1, schema: 'int' }], //How long it's active. Minimum of 1
  during: 'odd', //When will it trigger, odd turn or even turn
  after: [], //Callback after mechanic trigger
  condition: [], //This mechanic will trigger if certain condition is fulfilled
  persistence: '', //Persistence of effect
  class: '', //Class of effect
  scope: {
    type: 'all',
    options: [],
    detail: ''
  } // For Classes ["classes", ["items"], "extent (inclusive/exclusive)", ["effect type"]], //For Skills ['skills', ['skill name']]
}

let effectMutable = {
  current: 0,
  usage: 0,
  stack: 0,
  charge: 0,
  multi: 0,
  active: true //Use this for target state persistence
}

let effectState = {
  isStack: [{ type: 'default', value: false, schema: 'bool' }],
  isInvisible: [{ type: 'default', value: false, schema: 'bool' }],
  isMulti: [{ type: 'default', value: false, schema: 'bool' }],
  isUnremovable: [{ type: 'default', value: false, schema: 'bool' }],
  isHarmful: [{ type: 'default', value: false, schema: 'bool' }],
  isPiercing: [{ type: 'default', value: false, schema: 'bool' }],
  isActive: [{ type: 'default', value: false, schema: 'bool' }],
  isLastTurn: [{ type: 'default', value: false, schema: 'bool' }]
}

let effect = {
  ...effectView,
  ...effectBasic,
  ...effectMeta,
  ...effectMutable,
  ...effectState
}

export default effect

//Effects

export const types = [
  'damage',
  'stun',
  'dd',
  'invul',
  'seclude',
  'counter',
  'reflect',
  'replace',
  'boost',
  'dr',
  'buff',
  'nerf',
  'remove',
  'ignore',
  'disable',
  'cooldown',
  'duration',
  'heal',
  'charge',
  'stack',
  'mark',
  'cost',
  'instakill',
  'allow',
  'onAttack',
  'onReceive',
  'onSkill'
].map(x => {
  return {
    label: x,
    value: x
  }
})

export const schema = [
  {
    type: 'energy',
    action: ['drain', 'remove', 'gain', 'steal']
  },
  {
    type: 'remove',
    action: [
      'harmful',
      'non-harmful',
      'class',
      'persistence',
      'specific',
      'all'
    ]
  },
  {
    type: 'cooldown',
    action: ['increase', 'decrease']
  },
  {
    type: 'duration',
    action: ['increase', 'decrease']
  },
  {
    type: 'stack',
    action: ['increase', 'decrease', 'remove']
  },
  {
    type: 'cost',
    action: ['green', 'blue', 'red', 'white', 'random']
  }
]
