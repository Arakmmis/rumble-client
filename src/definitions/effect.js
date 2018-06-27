//Define

let effectView = {
  name: '', //Inherit from Skill
  description: ''
}

let effectMeta = {
  id: '', //Inherit from Skill
  caster: '', //Caster's id
  turnid: '' //Turn Id
}

let effectBasic = {
  val: 0,
  action: '', //tied per types
  target: 'target', //Caster or target
  duration: 1, //How long it's active. Minimum of 1
  during: 'odd', //When will it trigger, odd turn or even turn
  after: [], //Callback after mechanic trigger
  condition: [], //This mechanic will trigger if certain condition is fulfilled
  persistence: '', //Persistence of effect
  class: '', //Class of effect
  scope: ['none', [], ''], // For Classes ["classes", ["items"], "extent (inclusive/exclusive)", ["effect type"]], //For Skills ['skills', ['skill name']]
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
  isStack: false,
  isInvisible: false,
  isMulti: false,
  isUnremovable: false,
  isMarking: false,
  isHarmful: false,
  isPiercing: false,
  isActive: false,
  isLastTurn: false,
  isAllowed: true,
  isNoCounter: false
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
    action: ['harmful', 'non-harmful', 'class', 'persistence', 'specific', 'all']
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
