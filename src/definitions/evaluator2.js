export const condition = [
  { type: 'hp', owner: 'char', eval: 'int' },
  { type: 'invul', owner: 'char', eval: 'bool' },
  { type: 'cooldown', owner: 'skill', eval: 'int' },
  { type: 'usage', owner: 'skill', eval: 'int' },
  { type: 'active', owner: 'effect', eval: 'bool' },
  { type: 'charge', owner: 'effect', eval: 'int' }
]

export const evaluator = [
  { type: '>', eval: 'int' },
  { type: '<', eval: 'int' },
  { type: '>=', eval: 'int' },
  { type: '<=', eval: 'int' },
  { type: '===', eval: 'int' },
  { type: '!==', eval: 'int' },
  { type: 'exist', eval: 'bool' },
  { type: 'nonexist', eval: 'bool' }
]

//Future
export const conditionFuture = [
  { type: 'hp', owner: 'char', eval: 'int' },
  { type: 'invul', owner: 'char', eval: 'bool' },
  { type: 'cooldown', owner: 'skill', eval: 'int' },
  { type: 'usage', owner: 'skill', eval: 'int' },
  { type: 'duration', owner: 'effect', eval: 'int' },
  { type: 'stack', owner: 'effect', eval: 'int' },
  { type: 'active', owner: 'effect', eval: 'bool' },
  { type: 'charge', owner: 'effect', eval: 'int' }
]
