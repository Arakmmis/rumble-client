let skill = [
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

let effect = [
  'caster',
  'target',
  'target allies',
  'target ally',
  'caster allies',
  'caster ally'
].map(x => {
  return {
    label: x,
    value: x
  }
})

export default {
  skill,
  effect
}
