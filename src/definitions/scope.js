let scope = [
  ['none', 'classes', 'types', 'skills'],
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
  type: scope[0].map(x => {
    return { label: x, value: x }
  }),
  options: scope[1],
  detail: scope[2]
}
