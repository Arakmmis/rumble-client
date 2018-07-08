let type = ['all', 'classes', 'effects', 'skills']
let options = [
  ['physical', 'mental', 'energy', 'affliction', 'strategic'],
  [
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
  ]
]
let detail = [['inclusive', 'exclusive'], ['is', 'is not']]

let scope = [
  ['none', 'classes', 'effects', 'skills'],
  [
    ['physical', 'mental', 'energy', 'affliction', 'strategic'],
    [
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
    ]
  ],
  [['inclusive', 'exclusive'], ['is', 'is not']]
]

export default {
  type: type.map(x => {
    return { label: x, value: x }
  }),
  options: options,
  detail: detail
}
