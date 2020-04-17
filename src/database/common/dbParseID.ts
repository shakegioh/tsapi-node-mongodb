type Raw<T> = T & { _id: string };
type Parsed<T> = Omit<T, '_id'> & { id: string };

export default function dbParseID<T>(obj: Raw<T>): Parsed<T> {
  if (!obj || !obj._id) throw new Error('Objeto inválido passado para a função dbParseID');

  const { _id: id, ...rest } = obj as Raw<T>;

  return {
    id,
    ...rest,
  };
}
