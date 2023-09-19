import { Schema, ZodObject, ZodObjectDef, z } from 'zod'

const schema1 = z.object({
  foo: z.string(),
})

function mergeSchemas(
  ...schemas: ZodObject<{}, 'strip', z.ZodTypeAny, {}, {}>[]
) {
  const [first, ...rest] = schemas

  const merged = rest.reduce(
    (mergedSchemas, schema) => mergedSchemas.concat(schema),
    first
  )

  return merged
}
