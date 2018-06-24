let target = [
  'self',
  'ally',
  'all allies',
  'other allies',
  'random ally',
  'enemy',
  'all enemies',
  'random enemy'
].map(x => {
  return {
    label: x,
    value: x
  }
})

export const condition = {
  subject: '',
  evaluator: '',
  comparison: '',
  value: true
}

export const subject = [
  'effect',
  'cooldown',
  'duration',
  'usage',
  'stack',
  'charge',
  'value',
  'hp',
  'active',
  'caster',
  'target',
  'damage',
  'invul',
  'allow',
  'mark'
]

let owner = ['caster', 'target', 'skill', 'effect']

export const evaluator = [
  'exist',
  'not exist',
  'equal',
  'greater',
  'lesser',
  'greater equal',
  'lesser equal',
  'not equal'
]
